// This package builds using the last stable version of itself through the
// grunt-es6-module-transpiler plugin. However, NPM won't install the stable
// version as a dependency of the plugin, presumedly because it's trying to
// avoid circular dependencies. This hacky script is run post-install to install
// the package if the grunt plugin was installed (i.e. only when devDependencies
// are included).

var fs = require("fs");
var spawn = require("child_process").spawn;

var gruntPath = process.cwd() + "/node_modules/grunt-es6-module-transpiler";
if (fs.existsSync(gruntPath)) {
  spawn("npm", ["install", "es6-module-transpiler"], {
    cwd: gruntPath,
    env: process.env
  });
}