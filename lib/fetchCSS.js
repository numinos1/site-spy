const css = require('css');
const axios = require('axios');
const Promise = require('bluebird');
const _ = require('lodash');

const THREADS = { concurrency: 5 };

module.exports = fetchStyles;

/**
 * Fetch All CSS Style Files
 *
 * @param      {<type>}  page    The page
 * @return     {<type>}  { description_of_the_return_value }
 */
async function fetchStyles(styles) {
	const sheets = await Promise.map(styles, fetchStyle, THREADS);

	return parseCSS(sheets.join('\n'));
};

/**
 * Fetch One CSS Style File
 *
 * @param      {<type>}  style   The style
 * @return     {<type>}  { description_of_the_return_value }
 */
function fetchStyle(style) {
	if (style.src === 'inline') {
		return style.text;
	}
	return axios.get(style.src)
		.then(response => {
			style.text = response.data;
			return style.text;
		})
		.catch(err => {
			style.error = err;
			return '';
		});
}

/**
 * Parse a CSS Style File
 *
 * @param      {<type>}  css     The css
 * @return     {Object}  { description_of_the_return_value }
 */
function parseCSS(text) {
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
		classes: _.keys(classes).sort()
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
}
