const assert = require('assert');

module.exports = (webpackageName) => {
  assert.ok(webpackageName, 'Expected "webpackageName" to be defined.');
  return {
    description: 'WebApp Launcher',
    resources: [
      'launcher.bundle.js',
      'MaterialIcons-Regular.eot',
      'MaterialIcons-Regular.svg',
      'MaterialIcons-Regular.ttf',
      'MaterialIcons-Regular.woff',
      'MaterialIcons-Regular.woff2'
    ]
  };
};
