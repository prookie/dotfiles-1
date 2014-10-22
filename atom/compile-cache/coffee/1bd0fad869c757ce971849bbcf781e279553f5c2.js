(function() {
  var $, $$, LessAutocompileView, View, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), View = _ref.View, $ = _ref.$, $$ = _ref.$$;

  module.exports = LessAutocompileView = (function(_super) {
    __extends(LessAutocompileView, _super);

    function LessAutocompileView() {
      return LessAutocompileView.__super__.constructor.apply(this, arguments);
    }

    LessAutocompileView.content = function() {
      return this.div({
        "class": 'less-autocompile tool-panel panel-bottom hide'
      }, (function(_this) {
        return function() {
          return _this.div({
            "class": "inset-panel"
          }, function() {
            _this.div({
              "class": "panel-heading no-border"
            }, function() {
              _this.span({
                "class": 'inline-block pull-right loading loading-spinner-tiny hide'
              });
              return _this.span('LESS AutoCompile');
            });
            return _this.div({
              "class": "panel-body padded hide"
            });
          });
        };
      })(this));
    };

    LessAutocompileView.prototype.initialize = function(serializeState) {
      this.inProgress = false;
      this.timeout = null;
      this.panelHeading = this.find('.panel-heading');
      this.panelBody = this.find('.panel-body');
      this.panelLoading = this.find('.loading');
      return atom.workspaceView.on('core:save', (function(_this) {
        return function(e) {
          if (!_this.inProgress) {
            return _this.compile(atom.workspace.activePaneItem);
          }
        };
      })(this));
    };

    LessAutocompileView.prototype.serialize = function() {};

    LessAutocompileView.prototype.destroy = function() {
      return this.detach();
    };

    LessAutocompileView.prototype.compile = function(editor) {
      var fileExt, filePath, path;
      path = require('path');
      filePath = editor.getUri();
      fileExt = path.extname(filePath);
      if (fileExt === '.less') {
        return this.compileLess(filePath);
      }
    };

    LessAutocompileView.prototype.getParams = function(filePath, callback) {
      var firstLine, fs, params, parse, path, readline, rl;
      fs = require('fs');
      path = require('path');
      readline = require('readline');
      params = {
        file: filePath,
        compress: false,
        main: false,
        out: false
      };
      parse = (function(_this) {
        return function(firstLine) {
          firstLine.split(',').forEach(function(item) {
            var i, key, match, value;
            i = item.indexOf(':');
            if (i < 0) {
              return;
            }
            key = item.substr(0, i).trim();
            match = /^\s*\/\/\s*(.+)/.exec(key);
            if (match) {
              key = match[1];
            }
            value = item.substr(i + 1).trim();
            return params[key] = value;
          });
          if (params.main !== false) {
            return _this.getParams(path.resolve(path.dirname(filePath), params.main), callback);
          } else {
            return callback(params);
          }
        };
      })(this);
      if (!fs.existsSync(filePath)) {
        this.showPanel();
        this.addMessagePanel('', 'error', "main: " + filePath + " not exist");
        this.hidePanel();
        this.inProgress = false;
        return null;
      }
      rl = readline.createInterface({
        input: fs.createReadStream(filePath),
        output: process.stdout,
        terminal: false
      });
      firstLine = null;
      return rl.on('line', function(line) {
        if (firstLine === null) {
          firstLine = line;
          return parse(firstLine);
        }
      });
    };

    LessAutocompileView.prototype.writeFile = function(contents, newFile, newPath, callback) {
      var fs, mkdirp;
      fs = require('fs');
      mkdirp = require('mkdirp');
      return mkdirp(newPath, function(error) {
        return fs.writeFile(newFile, contents, callback);
      });
    };

    LessAutocompileView.prototype.addMessagePanel = function(icon, typeMessage, message) {
      this.panelHeading.removeClass('no-border');
      return this.panelBody.removeClass('hide').append($$(function() {
        return this.p((function(_this) {
          return function() {
            return _this.span({
              "class": "icon " + icon + " text-" + typeMessage
            }, message);
          };
        })(this));
      }));
    };

    LessAutocompileView.prototype.showPanel = function() {
      this.inProgress = true;
      clearTimeout(this.timeout);
      this.panelHeading.addClass('no-border');
      this.panelBody.addClass('hide').empty();
      this.panelLoading.removeClass('hide');
      atom.workspaceView.prependToBottom(this);
      return this.removeClass('hide');
    };

    LessAutocompileView.prototype.hidePanel = function() {
      this.panelLoading.addClass('hide');
      return this.timeout = setTimeout((function(_this) {
        return function() {
          return _this.addClass('hide');
        };
      })(this), 3000);
    };

    LessAutocompileView.prototype.compileLess = function(filePath) {
      var compile, fs, less, path;
      fs = require('fs');
      less = require('less');
      path = require('path');
      compile = (function(_this) {
        return function(params) {
          var parser;
          if (params.out === false) {
            return;
          }
          _this.showPanel();
          parser = new less.Parser({
            paths: [path.dirname(path.resolve(params.file))],
            filename: path.basename(params.file)
          });
          return fs.readFile(params.file, function(error, data) {
            return parser.parse(data.toString(), function(error, tree) {
              var css, e, newFile, newPath;
              _this.addMessagePanel('icon-file-text', 'info', filePath);
              try {
                if (error) {
                  _this.inProgress = false;
                  _this.addMessagePanel('', 'error', "" + error.message + " - index: " + error.index + ", line: " + error.line + ", file: " + error.filename);
                } else {
                  css = tree.toCSS({
                    compress: params.compress
                  });
                  newFile = path.resolve(path.dirname(params.file), params.out);
                  newPath = path.dirname(newFile);
                  _this.writeFile(css, newFile, newPath, function() {
                    _this.inProgress = false;
                    return _this.addMessagePanel('icon-file-symlink-file', 'success', newFile);
                  });
                }
              } catch (_error) {
                e = _error;
                _this.inProgress = false;
                _this.addMessagePanel('', 'error', "" + e.message + " - index: " + e.index + ", line: " + e.line + ", file: " + e.filename);
              }
              return _this.hidePanel();
            });
          });
        };
      })(this);
      return this.getParams(filePath, function(params) {
        if (params !== null) {
          return compile(params);
        }
      });
    };

    return LessAutocompileView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHNDQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxPQUFnQixPQUFBLENBQVEsTUFBUixDQUFoQixFQUFDLFlBQUEsSUFBRCxFQUFPLFNBQUEsQ0FBUCxFQUFVLFVBQUEsRUFBVixDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLDBDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLG1CQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLE9BQUEsRUFBTywrQ0FBUDtPQUFMLEVBQTZELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQzNELEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLE9BQUEsRUFBTyxhQUFQO1dBQUwsRUFBMkIsU0FBQSxHQUFBO0FBQ3pCLFlBQUEsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLGNBQUEsT0FBQSxFQUFPLHlCQUFQO2FBQUwsRUFBdUMsU0FBQSxHQUFBO0FBQ3JDLGNBQUEsS0FBQyxDQUFBLElBQUQsQ0FBTTtBQUFBLGdCQUFBLE9BQUEsRUFBTywyREFBUDtlQUFOLENBQUEsQ0FBQTtxQkFDQSxLQUFDLENBQUEsSUFBRCxDQUFNLGtCQUFOLEVBRnFDO1lBQUEsQ0FBdkMsQ0FBQSxDQUFBO21CQUdBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxjQUFBLE9BQUEsRUFBTyx3QkFBUDthQUFMLEVBSnlCO1VBQUEsQ0FBM0IsRUFEMkQ7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUE3RCxFQURRO0lBQUEsQ0FBVixDQUFBOztBQUFBLGtDQVFBLFVBQUEsR0FBWSxTQUFDLGNBQUQsR0FBQTtBQUNWLE1BQUEsSUFBQyxD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
//# sourceURL=/Users/marian/.atom/packages/less-autocompile/lib/less-autocompile-view.coffee