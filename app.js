const css = require('css');
const axios = require('axios');
const fs = require('fs');
const chalk = require('chalk');
const _ = require('lodash');
const fetchHTML = require('./lib/fetchHTML');
const fetchCSS = require('./lib/fetchCSS');
const utils = require('./lib/utils');

const embedable = require('embedable')();
const Promise = require('bluebird');

const PROMISE_OPTS = { concurrency: 5 };

fetchSite('https://www.smashingmagazine.com')
//fetchSite('https://davidwalsh.name/write-media-queries-sass')
//fetchSite('https://www.ksl.com')
//fetchSite('https://www.deseretnews.com')
//fetchSite('https://digiday.com')
//fetchSite('https://littlethings.com')
//fetchSite('https://buzzfeed.com')
//fetchSite('https://www.bloomberg.com/news/features/2017-12-06/millions-are-hounded-for-debt-they-don-t-owe-one-victim-fought-back-with-a-vengeance')
//fetchSite('https://redtri.com')
//fetchSite('https://familyshare.com/')
//fetchSite('https://www.searchenginejournal.com/seo-friendly-url-structure-2/202790/')
//fetchSite('https://businessinsider.com')
//fetchSite('https://www.huffingtonpost.com/')
//fetchSite('https://cnn.com')
//fetchSite('https://www.orbitmedia.com/blog/web-design-standards/')
//fetchSite('https://freshysites.com/')
//fetchSite('http://www.creativebloq.com/')
//fetchSite('https://www.kaocollins.com/inktank/')
//fetchSite('https://razorfish.com')
fetchSite('http://www.22squared.com/')
	.catch(err => {
		console.log("CAUGHT ERROR", err);
		process.exit();
	});

/**
 * Fetch the site by URI
 *
 * @param      {<type>}  uri     The uri
 * @return     {<type>}  { description_of_the_return_value }
 */
async function fetchSite(uri) {
	const html = await fetchHTML(uri);
	const styles = await fetchCSS(html.styles);

	const page = {
		styles: utils.toStyles(html.styles),
		scripts: html.scripts,
		props: styles.props,
		media: styles.media,
		comments: styles.comments,
		classes: styles.classes,
		fonts: utils.toFonts(styles.props),
		sizes: utils.toSizes(styles.media)
	};

	// page: styles, scripts, props, media

	//console.log(JSON.stringify(page.styles, null, ' '));
	//console.log(JSON.stringify(styles.media, null, ' '));

	console.log('\nStyleSheets');
	console.log('-------------------------------------------------');

	page.styles.forEach((item, i) => {
		console.log(chalk.white(i) + '. ' + chalk.blue(item));
	});

	console.log('\nFonts');
	console.log('-------------------------------------------------');

	page.fonts.forEach((item, i) => {
		console.log(chalk.white(i) + '. ' + chalk.blue(item));
	});

	console.log('\nSizes');
	console.log('-------------------------------------------------');

	page.sizes.forEach((item, i) => {
		console.log(chalk.white(i) + '. ' + chalk.blue(item));
	});

	console.log('\nProperties');
	console.log('-------------------------------------------------');

	var values = _.values(page.props).sort((a, b) => {
		return (a.name < b.name) ? -1 : 1;
	});

	values.forEach(value => {
		console.log(chalk.blue(value.name), '=', value.count); //, value.values);
	});

	console.log('\nClasses');
	console.log('-------------------------------------------------');

	page.classes.forEach((item, i) => {
		console.log(item);
	});

	console.log('\nComments');
	console.log('-------------------------------------------------');

	page.comments.forEach((item, i) => {
		console.log(item);
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

