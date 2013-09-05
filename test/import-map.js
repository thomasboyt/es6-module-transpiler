var Compiler = require('../dist/es6-module-transpiler').Compiler;

var compiler = new Compiler("import p from './dep';", 'my-module', {
  imports: {
    './dep': 'normalized-dep'
  }
});

// very basic tests!
console.log(compiler.toAMD() == "define(\"my-module\", \n  [\"normalized-dep\"],\n  function(__dependency1__) {\n    \"use strict\";\n    var p = __dependency1__.__default__;\n  });");

console.log(compiler.toCJS() == "\"use strict\";\nvar p = require(\"normalized-dep\").__default__;");