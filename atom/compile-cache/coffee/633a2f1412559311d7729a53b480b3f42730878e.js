(function() {
  var InsertBoilerplateView;

  InsertBoilerplateView = require('./insert-boilerplate-view');

  module.exports = {
    insertBoilerplateView: null,
    insert: function() {
      var editor;
      editor = atom.workspace.activePaneItem;
      return editor.insertText('This is boilerplate');
    },
    activate: function(state) {
      return atom.workspaceView.command("boilerplate:insert", (function(_this) {
        return function() {
          return _this.insert();
        };
      })(this));
    },
    deactivate: function() {
      return this.insertBoilerplateView.destroy();
    },
    serialize: function() {
      return {
        insertBoilerplateViewState: this.insertBoilerplateView.serialize()
      };
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHFCQUFBOztBQUFBLEVBQUEscUJBQUEsR0FBd0IsT0FBQSxDQUFRLDJCQUFSLENBQXhCLENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxxQkFBQSxFQUF1QixJQUF2QjtBQUFBLElBR0EsTUFBQSxFQUFRLFNBQUEsR0FBQTtBQUNOLFVBQUEsTUFBQTtBQUFBLE1BQUEsTUFBQSxHQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBeEIsQ0FBQTthQUNBLE1BQU0sQ0FBQyxVQUFQLENBQWtCLHFCQUFsQixFQUZNO0lBQUEsQ0FIUjtBQUFBLElBUUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO2FBRVIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQixvQkFBM0IsRUFBaUQsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFBRyxLQUFDLENBQUEsTUFBRCxDQUFBLEVBQUg7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFqRCxFQUZRO0lBQUEsQ0FSVjtBQUFBLElBWUEsVUFBQSxFQUFZLFNBQUEsR0FBQTthQUNWLElBQUMsQ0FBQSxxQkFBcUIsQ0FBQyxPQUF2QixDQUFBLEVBRFU7SUFBQSxDQVpaO0FBQUEsSUFlQSxTQUFBLEVBQVcsU0FBQSxHQUFBO2FBQ1Q7QUFBQSxRQUFBLDBCQUFBLEVBQTRCLElBQUMsQ0FBQSxxQkFBcUIsQ0FBQyxTQUF2QixDQUFBLENBQTVCO1FBRFM7SUFBQSxDQWZYO0dBSEYsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/marian/.atom/packages/insert-boilerplate/lib/insert-boilerplate.coffee