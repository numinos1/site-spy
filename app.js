const css = require('css');
const axios = require('axios');
const fs = require('fs');
const chalk = require('chalk');
const _ = require('lodash');
const htmlparser = require('htmlparser2');
const embedable = require('embedable')();
const Promise = require('bluebird');

const PROMISE_OPTS = { concurrency: 5 };

fetchSite('https://lds.org/');

/**
 * Fetch the site by URI
 *
 * @param      {<type>}  uri     The uri
 * @return     {<type>}  { description_of_the_return_value }
 */
function fetchSite(uri) {
	return fetchPage(uri).then(function(data) {
		return Promise.map(data.stylesheets, function(stylesheet) {
			return fetchStylesheet(stylesheet, uri);
		}, PROMISE_OPTS);
	})
	.then(function(out) {
		const css = out.reduce((memo, part) => {
			return memo + part.css;
		}, '');
		const styleSheets = out.reduce((memo, part) => {
			memo.push(part.uri);
			return memo;
		}, []);
		const vals = parseCSS(css);

		// fonts
		const fonts = vals.props['font-family'].values;
		let fontList = {};
		_.keys(fonts).forEach(font => {
			const name = font.replace(/("|'|\!important)/gm, '').split(',')[0];
			if (name !== 'inherit') {
			 	fontList[name] = true;
			}
		});
		fontList = _.keys(fontList).sort();

		vals.styleSheets = styleSheets;
		vals.fonts = fontList;

		return vals;
	})
	.then(report);
}

/**
 * Output the Report
 *
 * @param      {<type>}  report  The report
 */
function report(report) {
	console.log('\nStyleSheets');
	console.log('-------------------------------------------------');

	report.styleSheets.forEach((item, i) => {
		console.log(chalk.white(i) + '. ' + chalk.blue(item));
	});

	console.log('\nFonts');
	console.log('-------------------------------------------------');

	report.fonts.forEach((item, i) => {
		console.log(chalk.white(i) + '. ' + chalk.blue(item));
	});

	console.log('\nSizes');
	console.log('-------------------------------------------------');

	var sizes = report.media.join(' ')
		.match(/(max|min)\-width\:\s*\d+\w+/gim)
		.reduce((memo, value) => {
			const val = value.match(/\d+/);
			memo[val[0]] = true;
			return memo;
		}, {});

	_.keys(sizes).forEach((item, i) => {
		console.log(chalk.white(i) + '. ' + chalk.blue(item));
	});

	console.log('\nProperties');
	console.log('-------------------------------------------------');

	var values = _.values(report.props).sort((a, b) => {
		return (a.name < b.name) ? -1 : 1;
	});

	values.forEach(value => {
		console.log(chalk.blue(value.name), '=', value.count); //, value.values);
	});
}

//

// console.log(sizes);

// CSS Beautified
// var out = css.stringify(cssVals.ast, {
// 	indent: '  ',
// 	compress: false,
// });

// console.log(out);

// ----------------------------------------------------------------------------------
// 				CSS Parsing
// ----------------------------------------------------------------------------------

function fetchStylesheet(path, uri) {
	if (!path.match(/^http/)) {
		if (path.indexOf('//') === 0) {
			path = uri.match(/^https*:/i)[0] + path;
		}
		else if (path.indexOf('/') === 0) {
			path = uri.replace(/\/+$/, '') + path;
		}
		else {
			path = uri = uri.replace(/\/+$/, '') + '/' + path;
		}
	}
	return axios.get(path)
		.then(response => {
			return {
				uri: path,
				css: response.data
			};
		})
		.catch(error => {
			console.error(error);
		});
}

function parseCSS(cssText) {
	let props = {};
	let medias = [];
	let ast = null;

	try {
		ast = css.parse(cssText, { silent: false });
		toRules(ast.stylesheet.rules);
	}
	catch(err) {
		console.log("ERROR", err.message);
	}

	function toRules(rules) {
		rules.forEach(rule => {
			if (rule.type === 'media') {
				medias.push(rule.media);
				toRules(rule.rules);
			}
			else if (rule.type === 'rule') {
				const selectors = rule.selectors;

				//console.log();

				selectors.forEach(selector => {
					//console.log(chalk.green(selector));
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
	return {
		ast: ast,
		props: props,
		media: medias
	}
}

// ----------------------------------------------------------------------------------
// 				HTML Parsing
// ----------------------------------------------------------------------------------

function fetchPage(uri) {
	return axios.get(uri)
		.then(response => {
			return parseHTML(response.data);
		})
		.catch(error => {
			console.error(error);
		});
}

function parseHTML(html) {
	stylesheets = [];

	function onOpenTag(name, attrs) {
	 	if (name === 'link' && attrs.rel === 'stylesheet') {
	 		stylesheets.push(attrs.href);
	 	}
	 	else if (name === 'script') {
	 		if (attrs.type && attrs.type.match(/text\/javascript/i)) {
	 			console.log('SCRIPT', name, attrs);
	 		}
	 	}
  }

  function onText(text) {
  }

  function onCloseTag() {
  }

	const parser = new htmlparser.Parser({
    onopentag: onOpenTag,
    ontext: onText,
    onclosetag: onCloseTag
  });

  parser.write(html);
  parser.end();

  return {
  	stylesheets: stylesheets
  };
}
