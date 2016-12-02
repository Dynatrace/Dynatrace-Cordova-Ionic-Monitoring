const load = require('load-grunt-config');
const path = require('path');

module.exports = grunt => {
  load(grunt, {
    data: {
      bin: path.join('node_modules', '.bin') + path.sep,
      build: "www",
      appSrc: "src_electron",
      webSrc: "src_browser",
      dist: "platforms",
      appDist: "platforms/electron",
      webDist: "platforms/browser/www"
    }
  });
};
