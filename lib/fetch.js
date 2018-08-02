const axios = require('axios');
const perfy = require('perfy');

let counter = 1;

/**
 * Fetch with timer
 */
module.exports = function fetch(uri) {
  const fetchId = 'fetch_ ' + counter++;

  perfy.start(fetchId);

  return axios({
    type: 'get',
    url: uri,
    responseType: 'text',
    withCredentials: true,
    maxContentLength: 2000000,
    headers: {
      'upgrade-insecure-requests': 1,
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'accept-language': 'en-US,en;q=0.9,es;q=0.8,pt;q=0.7,id;q=0.6,fr;q=0.5,mt;q=0.4',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36'
    }
  })
  .then(response => {
    return {
      data: response.data,
      time: perfy.end(fetchId).milliseconds
    };
  }, error => {
    return {
      error: error.message,
      time: perfy.end(fetchId).milliseconds
    };
  });
}
