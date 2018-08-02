const _ = require('lodash');

/**
 * Convert a path to an URI
 *
 * @param      {string}  path    The path
 * @param      {string}  uri     The uri
 */
exports.pathToURI = function(path, uri) {
	if (path.indexOf('http') === 0) {
		return path;
	}
  if (path.indexOf('https') === 0) {
    return path;
  }
	if (path.indexOf('//') === 0) {
		return uri.match(/^https*:/i)[0] + path;
	}

	return uri.replace(/\/+$/, '')
		+ ((path[0] === '/') ? '' : '/')
		+ path;
};

/**
 * Process Style Scripts
 *
 * @param      {<type>}  styles  The styles
 * @return     {<type>}  { description_of_the_return_value }
 */
exports.toStyles = function(styles) {
	return styles.map(style => {
		return style.src;
	});
};

/**
 * Process Media Query Sizes
 *
 * @param      {string[]}  media   The media
 * @return     {<type>}    { description_of_the_return_value }
 */
exports.toSizes = function(media) {
	const sizes = media.join(' ')
		.match(/(max|min)\-width\:\s*\d+\w+/gim);

	if (!sizes) {
		return [];
	}
	const out = sizes.reduce((memo, value) => {
			memo[value.match(/\d+/)[0]] = true;
			return memo;
		}, {});

	return _.map(out, (val, key) => {
			return parseInt(key, 10);
		})
		.sort((a, b) => {
			if (a < b) return -1;
			if (a > b) return 1;
			return 0;
		});
};

/**
 * Process Fonts
 *
 * @param      {string}  font    The font
 * @return     {Array}   { description_of_the_return_value }
 */
exports.toFonts = function(props) {
	const list = props['font-family'];
	let fonts = {};

	if (!list) {
		return [];
	}
	_.keys(list.values).forEach(font => {
		const name = font
			.replace(/("|'|\!important)/gm, '')
			.split(',')[0]
			.toLowerCase();

		if (name !== 'inherit') {
		 	fonts[name] = true;
		}
	});

	return _.keys(fonts).sort();
};
