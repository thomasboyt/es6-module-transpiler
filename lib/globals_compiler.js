(function() {
  "use strict";
  var AbstractCompiler, GlobalsCompiler, isEmpty, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AbstractCompiler = require("./abstract_compiler");

  isEmpty = require("./utils").isEmpty;

  GlobalsCompiler = (function(_super) {
    __extends(GlobalsCompiler, _super);

    function GlobalsCompiler() {
      _ref = GlobalsCompiler.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    GlobalsCompiler.prototype.stringify = function() {
      var _this = this;
      return this.build(function(s) {
        var args, globalImport, import_, into, locals, name, passedArgs, receivedArgs, wrapper, _i, _j, _len, _len1, _ref1, _ref2;
        passedArgs = [];
        receivedArgs = [];
        locals = {};
        into = _this.options.into || _this.exportDefault;
        if (!isEmpty(_this.exports) || _this.exportDefault) {
          passedArgs.push(_this.exportDefault ? s.global : into ? "" + s.global + "." + into + " = {}" : s.global);
          receivedArgs.push('exports');
        }
        _ref1 = _this.dependencyNames;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          name = _ref1[_i];
          globalImport = _this.options.imports[name];
          passedArgs.push("" + s.global + "." + globalImport);
          if (name in _this.importDefault) {
            receivedArgs.push(_this.importDefault[name]);
          } else {
            receivedArgs.push(globalImport);
            _ref2 = _this.imports[name];
            for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
              import_ = _ref2[_j];
              locals[import_] = "" + globalImport + "." + import_;
            }
          }
        }
        wrapper = function() {
          return s["function"](receivedArgs, function() {
            var exportName, exportValue, lhs, rhs, _ref3, _results;
            s.useStrict();
            for (lhs in locals) {
              if (!__hasProp.call(locals, lhs)) continue;
              rhs = locals[lhs];
              s["var"](lhs, rhs);
            }
            s.append.apply(s, _this.lines);
            if (_this.exportDefault) {
              return s.set("exports." + into, _this.exportDefault);
            } else {
              _ref3 = _this.exports;
              _results = [];
              for (exportName in _ref3) {
                exportValue = _ref3[exportName];
                _results.push(s.set("exports." + exportName, exportValue));
              }
              return _results;
            }
          });
        };
        args = function(arg) {
          var passedArg, _k, _len2, _results;
          _results = [];
          for (_k = 0, _len2 = passedArgs.length; _k < _len2; _k++) {
            passedArg = passedArgs[_k];
            _results.push(arg(passedArg));
          }
          return _results;
        };
        return s.line(function() {
          return s.call(wrapper, args);
        });
      });
    };

    return GlobalsCompiler;

  })(AbstractCompiler);

  module.exports = GlobalsCompiler;

}).call(this);
