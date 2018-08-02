const META_TAGS = {
  // https://moz.com/blog/seo-meta-tags


  // basic
  // https://gist.github.com/kevinSuttle/1997924
  'title': { name: 'basic', value: 'high' },
  'noscript': { name: 'basic', value: 'high' },
  'meta keywords': { name: 'basic', value: 'high' },
  'meta news_keywords': { name: 'basic', value: 'high' },
  'meta description': { name: 'basic', value: 'high' },
  'meta charset': { name: 'page', value: 'high' },
  'meta theme-color': { name: 'page', value: 'high' },
  'meta referrer': { name: 'page', value: 'high' },

  'meta title': { name: 'page', value: 'high' },
  'meta content-type': { name: 'page', value: 'high' },

  'meta article:published_time': { name: 'page', value: 'high' },
  'meta article:modified_time': { name: 'page', value: 'high' },
  'meta article:tag': { name: 'page', value: 'high' },
  'meta article:section': { name: 'page', value: 'high' },
  'meta article:publisher': { name: 'page', value: 'high' },
  'meta article:author': { name: 'page', value: 'high' },

  'meta csrf-token': { name: 'page' },
  'meta csrf-param': { name: 'page' },

  'meta author': { name: 'basic' },
  'meta subject': { name: 'basic' },
  'meta copyright': { name: 'basic', value: 'negative' },
  'meta language': { name: 'basic' },
  'meta robots': { name: 'basic' },
  'meta revised': { name: 'basic' },
  'meta abstract': { name: 'basic', value: 'negative' },
  'meta topic': { name: 'basic' },
  'meta summary': { name: 'basic' },
  'meta classification': { name: 'basic' },
  'meta designer': { name: 'basic' },
  'meta reply-to': { name: 'basic' },
  'meta owner': { name: 'basic' },
  'meta url': { name: 'basic' },
  'meta identifier-url': { name: 'basic' },
  'meta directory': { name: 'basic' },
  'meta pagename': { name: 'basic' },
  'meta category': { name: 'basic' },
  'meta coverage': { name: 'basic' },
  'meta distribution': { name: 'basic', value: 'negative' },
  'meta rating': { name: 'basic', value: 'negative' },
  'meta revisit-after': { name: 'basic', value: 'negative' },
  'meta subtitle': { name: 'basic' },
  'meta target': { name: 'basic' },
  'meta handheldfriendly': { name: 'basic' },
  'meta mobileoptimized': { name: 'basic' },
  'meta date': { name: 'basic' },
  'meta search_date': { name: 'basic' },
  'meta dc.title': { name: 'basic' },
  'meta resourceloaderdynamicstyles': { name: 'basic' },
  'meta medium': { name: 'basic' },
  'meta syndication-source': { name: 'basic' },
  'meta original-source': { name: 'basic' },
  'meta verify-v1': { name: 'basic' },
  'meta y_key': { name: 'basic' },
  'meta pageKey': { name: 'basic' },
  'meta expires': { name: 'basic', value: 'negative' },
  'meta pragma': { name: 'basic' },
  'meta cache-control': { name: 'basic', value: 'negative' },
  'meta imagetoolbar': { name: 'basic' },
  'meta x-dns-prefetch-control': { name: 'basic' },
  'meta generator': { name: 'basic', value: 'negative' },

  'link author': { name: 'basic', value: 'high' },
  'link canonical': { name: 'basic', value: 'high' },
  'link preconnect': { name: 'basic', value: 'high' },
  'link icon': { name: 'basic', value: 'high' },
  'link manifest': { name: 'basic', value: 'high' },
  'link dns-prefetch': { name: 'basic', value: 'high' },
  'link preload': { name: 'basic', value: 'high' },
  'link prefetch': { name: 'basic', value: 'high' },
  'link preconnect dns-prefetch': { name: 'basic' },

  'link alternate': { name: 'basic' },
  'link alternate': { name: 'basic' },
  'link shortcut icon': { name: 'basic' },
  'link fluid-icon': { name: 'basic' },
  'link me': { name: 'basic' },
  'link shortlink': { name: 'basic' },
  'link archives': { name: 'basic' },
  'link index': { name: 'basic' },
  'link start': { name: 'basic' },
  'link bookmark': { name: 'basic' },
  'link search': { name: 'basic' },

  'link self': { name: 'basic' },
  'link first': { name: 'basic' },
  'link next': { name: 'basic' },
  'link previous': { name: 'basic' },
  'link last': { name: 'basic' },

  'link edituri': { name: 'basic' },
  'link pingback': { name: 'basic' },
  'link stylesheet': { name: 'basic' },
  'link wlwmanifest': { name: 'basic' },

  'link help': { name: 'basic' },
  'link logo': { name: 'basic' },
  'link p3pv1': { name: 'basic' },
  'link publisher': { name: 'basic' },
  'link image_src': { name: 'basic' },

  'link original-source': { name: 'basic' },
  'link profile': { name: 'basic' },

  // microsoft / bing
  // https://moz.com/blog/seo-meta-tags
  'meta application-name': { name: 'microsoft' },
  'meta msapplication-tilecolor': { name: 'microsoft' },
  'meta msapplication-tileimage': { name: 'microsoft' },
  'meta msapplication-config': { name: 'microsoft' },
  'meta msapplication-square70x70logo': { name: 'microsoft' },
  'meta msapplication-square150x150logo': { name: 'microsoft' },
  'meta msapplication-wide310x150logo': { name: 'microsoft' },
  'meta msapplication-square310x310logo': { name: 'microsoft' },
  'meta msapplication-notification': { name: 'microsoft' },
  'meta geo.position': { name: 'microsoft' },
  'meta geo.placename': { name: 'microsoft' },
  'meta geo.region': { name: 'microsoft' },

  // ie
  // https://gist.github.com/kevinSuttle/1997924
  'meta page-enter': { name: 'ie' },
  'meta page-exit': { name: 'ie' },
  'meta mssmarttagspreventparsing': { name: 'ie' },
  'meta x-ua-compatible': { name: 'ie' },
  'meta msapplication-starturl': { name: 'ie' },
  'meta msapplication-window': { name: 'ie' },
  'meta msapplication-navbutton-color': { name: 'ie' },
  'meta application-name': { name: 'ie' },
  'meta msapplication-tooltip': { name: 'ie' },
  'meta msapplication-task': { name: 'ie' },
  'meta msapplication-task': { name: 'ie' },
  'meta msapplication-task': { name: 'ie' },
  'meta msapplication-task': { name: 'ie' },
  'meta msvalidate.01': { name: 'ie' },
  'meta cleartype': { name: 'ie' },

  // safari
  // https://gist.github.com/kevinSuttle/1997924
  'link mask-icon': { name: 'safari' },

  // apple
  // https://gist.github.com/kevinSuttle/1997924
  'meta apple-mobile-web-app-title': { name: 'apple' },
  'meta apple-mobile-web-app-capable': { name: 'apple' },
  'meta apple-touch-fullscreen': { name: 'apple' },
  'meta apple-mobile-web-app-status-bar-style': { name: 'apple' },
  'meta format-detection': { name: 'apple' },
  'meta viewport': { name: 'apple', value: 'high' },
  'meta apple-itunes-app': { name: 'apple' },
  'link apple-touch-icon': { name: 'apple' },
  'link apple-touch-startup-image': { name: 'apple' },
  'link apple-touch-icon-precomposed': { name: 'apple' },

  // google
  // https://support.google.com/webmasters/answer/79812?hl=en
  'meta google': { name: 'google' },
  'meta googlebot': { name: 'google', value: 'high' },
  'meta googlebot-news': { name: 'google', value: 'deprecated' },
  'meta google-site-verification': { name: 'google', value: 'high' },
  'meta google-signin-client_id': { name: 'google' },
  'link amphtml': { name: 'google', value: 'high' },

  // twitter
  // https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup.html
  'meta twitter:url': { name: 'twitter', value: 'high' },
  'meta twitter:card': { name: 'twitter', value: 'high' },
  'meta twitter:site': { name: 'twitter', value: 'high' },
  'meta twitter:site:id': { name: 'twitter', value: 'high' },
  'meta twitter:description': { name: 'twitter', value: 'high' },
  'meta twitter:title': { name: 'twitter', value: 'high' },
  'meta twitter:image': { name: 'twitter', value: 'high' },
  'meta twitter:image:src': { name: 'twitter', value: 'high' },
  'meta twitter:image:alt': { name: 'twitter', value: 'high' },
  'meta twitter:image:width': { name: 'twitter', value: 'high' },
  'meta twitter:image:height': { name: 'twitter', value: 'high' },
  'meta twitter:creator': { name: 'twitter', value: 'high' },
  'meta twitter:text:title': { name: 'twitter', value: 'deprecated' },

  'meta twitter:player': { name: 'twitter' },
  'meta twitter:player:width': { name: 'twitter' },
  'meta twitter:player:height': { name: 'twitter' },
  'meta twitter:player:stream': { name: 'twitter' },

  'meta twitter:app:name:iphone': { name: 'twitter' },
  'meta twitter:app:id:iphone': { name: 'twitter' },
  'meta twitter:app:url:iphone': { name: 'twitter' },
  'meta twitter:app:name:ipad': { name: 'twitter' },
  'meta twitter:app:id:ipad': { name: 'twitter' },
  'meta twitter:app:url:ipad': { name: 'twitter' },
  'meta twitter:app:name:googleplay': { name: 'twitter' },
  'meta twitter:app:id:googleplay': { name: 'twitter' },
  'meta twitter:app:url:googleplay': { name: 'twitter' },

  // pinterest
  'meta pinterest:url': { name: 'pinterest', value: 'high' },
  'meta pinterest:media': { name: 'pinterest', value: 'high' },
  'meta pinterest:description': { name: 'pinterest', value: 'high' },
  'meta p:domain_verify': { name: 'pinterest', value: 'high' },

  // facebook / open graph
  // https://developers.facebook.com/docs/sharing/webmasters/
  'meta fb:admins': { name: 'facebook' },
  'meta fb:pages': { name: 'facebook' },
  'meta fb:profile_id': { name: 'facebook' },
  'meta fb:app_id': { name: 'facebook' },
  'meta fb:page_id': { name: 'facebook', value: 'deprecated' },

  'meta ia:rules_url': { name: 'facebook' },
  'meta ia:rules_url_dev': { name: 'facebook' },
  'meta ia:markup_url': { name: 'facebook' },

  'meta al:web_url': { name: 'facebook' },
  'meta al:iphone:url': { name: 'facebook' },
  'meta al:iphone:app_store_id': { name: 'facebook' },
  'meta al:iphone:app_name': { name: 'facebook' },
  'meta al:ipad:url': { name: 'facebook' },
  'meta al:ipad:app_store_id': { name: 'facebook' },
  'meta al:ipad:app_name': { name: 'facebook' },
  'meta al:android:url': { name: 'facebook' },
  'meta al:android:package': { name: 'facebook' },
  'meta al:android:app_name': { name: 'facebook' },

  // Open Graph
  'meta og:site_name': { name: 'og', value: 'high' },
  'meta og:url': { name: 'og', value: 'high' },
  'meta og:title': { name: 'og', value: 'high' },
  'meta og:description': { name: 'og', value: 'high' },
  'meta og:app_id': { name: 'og', value: 'high' },
  'meta og:type': { name: 'og', value: 'high' },
  'meta og:locale': { name: 'og', value: 'high' },
  'meta og:locale:alternate': { name: 'og' },
  'meta og:see_also': { name: 'og' },

  'meta article:published_time': { name: 'og' },
  'meta article:modified_time': { name: 'og' },
  'meta article:expiration_time': { name: 'og' },
  'meta article:author': { name: 'og' },
  'meta article:section': { name: 'og' },
  'meta article:tag': { name: 'og' },

  'meta og:image': { name: 'og', value: 'high' },
  'meta og:image:url': { name: 'og', value: 'high' },
  'meta og:image:secure_url': { name: 'og', value: 'high' },
  'meta og:image:type': { name: 'og', value: 'high' },
  'meta og:image:width': { name: 'og', value: 'high' },
  'meta og:image:height': { name: 'og', value: 'high' },
  'meta og:image:alt': { name: 'og' },

  'meta og:video': { name: 'og' },
  'meta og:video:url': { name: 'og' },
  'meta og:video:secure_url': { name: 'og' },
  'meta og:video:type': { name: 'og' },
  'meta og:video:width': { name: 'og' },
  'meta og:video:height': { name: 'og' },

  'meta og:audio': { name: 'og' },
  'meta og:audio:secure_url': { name: 'og' },
  'meta og:audio:type': { name: 'og' },

  'meta og:determiner': { name: 'og' },
  'meta og:updated_time': { name: 'og' },
  'meta og:rich_attachment': { name: 'og' },
  'meta og:ttl': { name: 'og' },
  'meta og:restrictions:age': { name: 'og' },
  'meta og:restrictions:country': { name: 'og' },
  'meta og:restrictions:content': { name: 'og' },

  'meta og:street_address': { name: 'og' },
  'meta og:locality': { name: 'og' },
  'meta og:postal_code': { name: 'og' },
  'meta og:region': { name: 'og' },
  'meta og:country_name': { name: 'og' },
  'meta og:email': { name: 'og' },
  'meta og:phone_number': { name: 'og' },
  'meta og:fax_number': { name: 'og' },
  'meta og:website': { name: 'og' },

  'meta og:latitude': { name: 'og' },
  'meta og:longitude': { name: 'og' },
  'meta og:altitude': { name: 'og' },

  'meta og:value': { name: 'og' },
  'meta og:units': { name: 'og' },

};

/**
 * Process the metadata
 */
module.exports = function(meta) {
  return meta.map(tag => {
    const value = toValue(tag);
    const label = tag.name + (value ? (' ' + value) : '');
    const type = META_TAGS[label] || {};

    return { ...tag, value, label, type };
  })
  .sort((a, b) => b.label.localeCompare(a.label));
}

/**
 * Create sortable label for a tag
 */
function toValue(tag) {
  if (tag.attrs.charset) {
    return 'charset';
  }
  return (tag.attrs.rel
    || tag.attrs.name
    || tag.attrs.property
    || tag.attrs.itemprop
    || tag.attrs['http-equiv']
    || ''
  ).toLowerCase();
}
