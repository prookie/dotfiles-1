(function() {
  var LessAutocompileView;

  LessAutocompileView = require('./less-autocompile-view');

  module.exports = {
    lessAutocompileView: null,
    activate: function(state) {
      return this.lessAutocompileView = new LessAutocompileView(state.lessAutocompileViewState);
    },
    deactivate: function() {
      return this.lessAutocompileView.destroy();
    },
    serialize: function() {
      return {
        lessAutocompileViewState: this.lessAutocompileView.serialize()
      };
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG1CQUFBOztBQUFBLEVBQUEsbUJBQUEsR0FBc0IsT0FBQSxDQUFRLHlCQUFSLENBQXRCLENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxtQkFBQSxFQUFxQixJQUFyQjtBQUFBLElBRUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO2FBQ1IsSUFBQyxDQUFBLG1CQUFELEdBQTJCLElBQUEsbUJBQUEsQ0FBb0IsS0FBSyxDQUFDLHdCQUExQixFQURuQjtJQUFBLENBRlY7QUFBQSxJQUtBLFVBQUEsRUFBWSxTQUFBLEdBQUE7YUFDVixJQUFDLENBQUEsbUJBQW1CLENBQUMsT0FBckIsQ0FBQSxFQURVO0lBQUEsQ0FMWjtBQUFBLElBUUEsU0FBQSxFQUFXLFNBQUEsR0FBQTthQUNUO0FBQUEsUUFBQSx3QkFBQSxFQUEwQixJQUFDLENBQUEsbUJBQW1CLENBQUMsU0FBckIsQ0FBQSxDQUExQjtRQURTO0lBQUEsQ0FSWDtHQUhGLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/marian/.atom/packages/less-autocompile/lib/less-autocompile.coffee