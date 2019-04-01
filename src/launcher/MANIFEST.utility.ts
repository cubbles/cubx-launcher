const assert = require('assert');

module.exports = (webpackageName: string) => {
  assert.ok(webpackageName, 'Expected "webpackageName" to be defined.')
  return {
    description: "Demo utility",
    resources: [
      "launcher.bundle.js"
    ]
  };
};
