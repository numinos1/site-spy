const PQueue = require('p-queue');
const htmlparser = require('htmlparser2');
const url = require('url');
const toMeta = require('./meta');
const fetch = require('./fetch');

/**
 * Fetch Content
 */
module.exports = function(uri) {
  const queue = new PQueue({ concurrency: 5 });
  const files = [];
  const inline = [];
  const meta = [];

  queue.add(() => fetchHTML(uri));

  return queue.onIdle().then(() => {
    return { files, inline, meta: toMeta(meta) };
  });

  /**
   * FETCH HTML
   */
  async function fetchHTML(uri) {
    const tagstack = [];
    const response = await fetch(uri);

    if (response.error) {
      files.push({
        type: 'html',
        url: uri,
        size: 0,
        time: response.time,
        body: '',
        error: response.error
      });
    }
    else {
      const parser = new htmlparser.Parser({ onopentag, ontext, onclosetag });

      files.push({
        type: 'html',
        url: uri,
        size: response.data.length,
        time: response.time,
        body: response.data
      });

      parser.write(response.data);
      parser.end();
    }

    // open tag
    function onopentag(name, attrs) {
      const path = tagstack.map(t => t.name).join('/');

      tagstack.push({ name, attrs });

      if (name === 'link' && attrs.rel === 'stylesheet') {
        if (attrs.href && !attrs.href.match(/^data:/i)) {
          queue.add(() => fetchStyle(url.resolve(uri, attrs.href)));
        }
      }
      else if (name === 'script') {
        if (attrs.src && !attrs.src.match(/^data:/i)) {
          queue.add(() => fetchScript(url.resolve(uri, attrs.src)));
        }
      }
      else if (name === 'style') {
      }
      else if (path === 'html/head' || path === 'html/head/esi:include') {
        meta.push({ name, attrs });
      }
    }

    // tag text
    function ontext(text) {
      const tag = tagstack[tagstack.length - 1] || {};

      if (tag.name === 'style' && text) {
        inline.push({ type: 'style', body: text });
      }
      else if (tag.name === 'script' && text) {
        inline.push({ type: 'script', body: text });
      }
    }

    // close tag
    function onclosetag(tag) {
      tagstack.pop();
    }
  }

  /**
   * FETCH SCRIPT
   */
  async function fetchScript(uri) {
    const response = await fetch(uri);

    if (response.error) {
      files.push({
        type: 'script',
        url: uri,
        size: 0,
        time: response.time,
        body: '',
        error: response.error
      });
    }
    else {
      files.push({
        type: 'script',
        url: uri,
        size: response.data.length,
        time: response.time,
        body: response.data
      });
    }
  }

  /**
   * FETCH STYLE
   */
  async function fetchStyle(uri) {
    const response = await fetch(uri);

    if (response.error) {
      files.push({
        type: 'style',
        url: uri,
        size: 0,
        time: response.time,
        body: '',
        error: response.error
      });
    }
    else {
      const parts = response.data.match(/url\([^"'].*?\)/gmi);

      files.push({
        type: 'style',
        url: uri,
        size: response.data.length,
        time: response.time,
        body: response.data
      });

      if (parts) {
        for (let i = 0; i < parts.length; i++) {
          const newUrl = parts[i].match(/url\((.*?)\)/)[1];

          if (!newUrl.match(/^data:/i)) {
            queue.add(() => fetchStyle(url.resolve(uri, newUrl)));
          }
        }
      }
    }
  }

}

