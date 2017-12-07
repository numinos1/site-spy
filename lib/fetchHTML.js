const axios = require('axios');
const htmlparser = require('htmlparser2');
const util = require('./utils');

module.exports = fetchHTML;

/**
 * Fetch HTML Page
 *
 * @param      {<type>}   uri     The uri
 * @return     {Promise}  { description_of_the_return_value }
 */
async function fetchHTML(uri) {
  let styles = [];
  let scripts = [];
  let capture = null;

  let response = await axios.get(uri);

  let parser = new htmlparser.Parser({

    onopentag: (name, attrs) => {
      if (name === 'link' && attrs.rel === 'stylesheet') {
        if (attrs.href) {
          styles.push({
            src: util.pathToURI(attrs.href, uri),
            text: ''
          });
        }
      }
      else if (name === 'script' && attrs.type === 'text/javascript') {
        if (attrs.src) {
          scripts.push({
            src: util.pathToURI(attrs.src, uri),
            text: ''
          });
        }
        else {
          capture = 'script';
        }
      }
      else if (name === 'style') {
        capture = 'style';
      }
    },

    ontext: (text) => {
      if (capture === 'style') {
        styles.push({
          src: 'inline',
          text: text
        });
      }
      else if (capture === 'script') {
        scripts.push({
          src: 'inline',
          text: text
        });
      }
    },

    onclosetag: () => {
      capture = null;
    }
  });

  parser.write(response.data);
  parser.end();

  return {
    styles,
    scripts
  };
}
