(function() {
  var GoFormatStatusView, exec;

  exec = require('child_process').exec;

  GoFormatStatusView = require('./go-format-status-view');

  module.exports = {
    view: null,
    configDefaults: {
      executable: 'go fmt',
      formatOnSave: true
    },
    activate: function(state) {
      this.view = new GoFormatStatusView(state.viewState);
      atom.project.eachEditor((function(_this) {
        return function(editor) {
          return _this.attachEditor(editor);
        };
      })(this));
      atom.subscribe(atom.project, 'editor-created', (function(_this) {
        return function(editor) {
          return _this.attachEditor(editor);
        };
      })(this));
      return atom.workspaceView.command('go-format:format', (function(_this) {
        return function() {
          var editor;
          editor = atom.workspace.getActiveEditor();
          if (editor) {
            return _this.format(editor);
          }
        };
      })(this));
    },
    deactivate: function() {
      this.view.destroy();
      return atom.unsubscribe(atom.project);
    },
    serialize: function() {
      return {
        viewState: this.view.serialize()
      };
    },
    attachEditor: function(editor) {
      atom.subscribe(editor.getBuffer(), 'reloaded saved', (function(_this) {
        return function() {
          if (atom.config.get('go-format.formatOnSave')) {
            return _this.format(editor);
          }
        };
      })(this));
      return atom.subscribe(editor.getBuffer(), 'destroyed', (function(_this) {
        return function() {
          return atom.unsubscribe(editor.getBuffer());
        };
      })(this));
    },
    command: function(editor) {
      var cmd, executable;
      executable = atom.config.get('go-format.executable');
      cmd = "" + executable + " " + (editor.getPath());
      return "bash --login -c '" + (cmd.replace(/'/g, "\\'")) + "'";
    },
    format: function(editor) {
      var editorView, scope;
      if (editor && editor.getPath()) {
        scope = editor.getCursorScopes()[0];
        if (scope === 'source.go') {
          editorView = atom.workspaceView.getActiveView();
          if (editorView.gutter && editorView.gutter.attached) {
            editorView.gutter.removeClassFromAllLines('go-format-error');
            editorView.gutter.find('.go-format-error-msg').remove();
          }
          return exec(this.command(editor), (function(_this) {
            return function(err, stdout, stderr) {
              var message;
              if (!err || err.code === 0) {
                return _this.view.html('').hide();
              } else {
                console.log("[go-format save error]: " + stderr);
                message = 'Format error.';
                if (stderr.match(/No such file or directory/)) {
                  message = 'Cannot find gofmt executable.';
                }
                editorView = atom.workspaceView.getActiveView();
                if (editorView.gutter && editorView.gutter.attached) {
                  stderr.split(/\r?\n/).forEach(function(line) {
                    var lineEl, lineNo, match;
                    match = line.match(/^.+?:(\d+):(\d+):\s+(.+)/);
                    if (match) {
                      lineNo = parseInt(match[1]) - 1;
                      editorView.gutter.addClassToLine(lineNo, 'go-format-error');
                      lineEl = editorView.gutter.find('.line-number-' + lineNo);
                      if (lineEl.size() > 0) {
                        return lineEl.prepend('<abbr class="go-format-error-msg" title="' + match[2] + ': ' + match[3] + '">✘</abbr>');
                      }
                    }
                  });
                }
                return _this.view.html('<span class="error">' + message + '</span>').show();
              }
            };
          })(this));
        }
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHdCQUFBOztBQUFBLEVBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxlQUFSLENBQXdCLENBQUMsSUFBaEMsQ0FBQTs7QUFBQSxFQUVBLGtCQUFBLEdBQXFCLE9BQUEsQ0FBUSx5QkFBUixDQUZyQixDQUFBOztBQUFBLEVBSUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsSUFBQSxFQUFNLElBQU47QUFBQSxJQUVBLGNBQUEsRUFDRTtBQUFBLE1BQUEsVUFBQSxFQUFZLFFBQVo7QUFBQSxNQUNBLFlBQUEsRUFBYyxJQURkO0tBSEY7QUFBQSxJQU1BLFFBQUEsRUFBVSxTQUFDLEtBQUQsR0FBQTtBQUNSLE1BQUEsSUFBQyxDQUFBLElBQUQsR0FBWSxJQUFBLGtCQUFBLENBQW1CLEtBQUssQ0FBQyxTQUF6QixDQUFaLENBQUE7QUFBQSxNQUNBLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBYixDQUF3QixDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxNQUFELEdBQUE7aUJBQ3RCLEtBQUMsQ0FBQSxZQUFELENBQWMsTUFBZCxFQURzQjtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXhCLENBREEsQ0FBQTtBQUFBLE1BR0EsSUFBSSxDQUFDLFNBQUwsQ0FBZSxJQUFJLENBQUMsT0FBcEIsRUFBNkIsZ0JBQTdCLEVBQStDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLE1BQUQsR0FBQTtpQkFDN0MsS0FBQyxDQUFBLFlBQUQsQ0FBYyxNQUFkLEVBRDZDO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBL0MsQ0FIQSxDQUFBO2FBTUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQixrQkFBM0IsRUFBK0MsQ0FBQSxTQUFB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
//# sourceURL=/Users/marian/.atom/packages/go-format/lib/go-format.coffee