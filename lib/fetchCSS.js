const css = require('css');

/**
 * Parse CSS Text
 */
module.exports = function(text) {
	let classes = {};
	let props = {};
	let media = [];
	let comments = text.match(/\/\*[^*]*\*+([^/*][^*]*\*+)*\//gm) || [];
	let ast = null;

	try {
		ast = css.parse(text, { silent: false });
		walkTree(ast.stylesheet.rules);
	}
	catch(err) {
		console.log("ERROR", err.message);
	}

	return {
		props,
		media,
		comments,
		classes: Object.keys(classes).sort()
	};

	function walkTree(rules) {
		rules.forEach(rule => {
			if (rule.type === 'media') {
				media.push(rule.media);
				walkTree(rule.rules);
			}
			else if (rule.type === 'rule') {
				const selectors = rule.selectors;

				//console.log();

				selectors.forEach(selector => {
					const sel = selector.match(/\.[a-zA-Z0-9_-]+/gm) || [];
					sel.forEach(s => {
						classes[s] = true;
					});
					//console.log(selector);
				});

				rule.declarations.forEach(function(declaration) {
					const name = declaration.property;
					const value = declaration.value;
					let prop;

					//console.log(chalk.blue(declaration.property) + ':', declaration.value);

					if (!(prop = props[name])) {
						prop = props[name] = { name, count: 0, values: {}};
					}
					prop.count++;
					prop.values[value] = (prop.values[value] || 0) + 1;
				});
			}
		});
	}
};
