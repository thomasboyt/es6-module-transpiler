(function() {
  "use strict";
  var AbstractCompiler, CJSCompiler, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AbstractCompiler = require("./abstract_compiler");

  CJSCompiler = (function(_super) {
    __extends(CJSCompiler, _super);

    function CJSCompiler() {
      _ref = CJSCompiler.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    CJSCompiler.prototype.stringify = function() {
      var _this = this;
      return this.build(function(s) {
        var dependency, deps, doImport, exportName, exportValue, import_, name, variables, _i, _len, _ref1, _ref2, _ref3, _results;
        doImport = function(name, import_, prop) {
          var req, rhs;
          if (prop == null) {
            prop = null;
          }
          req = function() {
            return s.call('require', [s.print(import_)]);
          };
          rhs = prop ? (function() {
            return s.prop(req, prop);
          }) : req;
          return s["var"](name, rhs);
        };
        s.useStrict();
        deps = s.unique('dependency');
        _ref1 = _this.importAs;
        for (import_ in _ref1) {
          if (!__hasProp.call(_ref1, import_)) continue;
          name = _ref1[import_];
          doImport(name, import_);
        }
        _ref2 = _this.imports;
        for (import_ in _ref2) {
          if (!__hasProp.call(_ref2, import_)) continue;
          variables = _ref2[import_];
          if (variables.length === 1) {
            name = variables[0];
            doImport(name, import_, name);
          } else {
            dependency = deps.next();
            doImport(dependency, import_);
            for (_i = 0, _len = variables.length; _i < _len; _i++) {
              name = variables[_i];
              s["var"](name, "" + dependency + "." + name);
            }
          }
        }
        s.append.apply(s, _this.lines);
        if (_this.exportAs) {
          s.line("module.exports = " + _this.exportAs);
        }
        _ref3 = _this.exports;
        _results = [];
        for (exportName in _ref3) {
          exportValue = _ref3[exportName];
          _results.push(s.line("exports." + exportName + " = " + exportValue));
        }
        return _results;
      });
    };

    return CJSCompiler;

  })(AbstractCompiler);

  module.exports = CJSCompiler;

}).call(this);
