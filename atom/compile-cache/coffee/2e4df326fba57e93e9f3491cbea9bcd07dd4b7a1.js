(function() {
  window.lorem = require('lorem-ipsum');

  module.exports = {
    configDefaults: {
      wordRange: [6, 15],
      sentenceRange: [4, 10],
      paragraphRange: [3, 5]
    },

    /*
    Called when a lorem-ipsum command is called
    Actives the package
     */
    activate: function() {
      return atom.workspaceView.command('lorem-ipsum:sentence lorem-ipsum:paragraph lorem-ipsum:paragraphs', this.generate);
    },

    /*
    Outputs lorem ipsum text into the editor pane
    Handles lorem-ipsum:(sentence|paragraph|paragraphs)
     */
    generate: function(_arg) {
      var config, editor, options, type;
      type = _arg.type;
      editor = atom.workspace.getActiveEditor();
      config = atom.config.get('lorem-ipsum');
      options = {
        units: 'paragraphs',
        format: 'plain',
        sentenceLowerBound: parseInt(config.wordRange[0]),
        sentenceUpperBound: parseInt(config.wordRange[1]),
        paragraphLowerBound: parseInt(config.sentenceRange[0]),
        paragraphUpperBound: parseInt(config.sentenceRange[1]),
        count: 1
      };
      if (type === 'lorem-ipsum:sentence') {
        options.units = 'sentence';
      }
      if (type === 'lorem-ipsum:paragraphs') {
        options.count = Math.floor(parseInt(config.paragraphRange[0]) + Math.random() * parseInt(config.paragraphRange[1] - config.paragraphRange[0] + 1));
      }
      return editor != null ? editor.insertText(lorem(options)) : void 0;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxFQUFBLE1BQU0sQ0FBQyxLQUFQLEdBQWUsT0FBQSxDQUFRLGFBQVIsQ0FBZixDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FJSTtBQUFBLElBQUEsY0FBQSxFQUNJO0FBQUEsTUFBQSxTQUFBLEVBQVcsQ0FBQyxDQUFELEVBQUcsRUFBSCxDQUFYO0FBQUEsTUFDQSxhQUFBLEVBQWUsQ0FBQyxDQUFELEVBQUcsRUFBSCxDQURmO0FBQUEsTUFFQSxjQUFBLEVBQWdCLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FGaEI7S0FESjtBQUtBO0FBQUE7OztPQUxBO0FBQUEsSUFTQSxRQUFBLEVBQVUsU0FBQSxHQUFBO2FBR04sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQixtRUFBM0IsRUFHNkIsSUFBQyxDQUFBLFFBSDlCLEVBSE07SUFBQSxDQVRWO0FBa0JBO0FBQUE7OztPQWxCQTtBQUFBLElBc0JBLFFBQUEsRUFBVSxTQUFDLElBQUQsR0FBQTtBQUdOLFVBQUEsNkJBQUE7QUFBQSxNQUhRLE9BQUQsS0FBQyxJQUdSLENBQUE7QUFBQSxNQUFBLE1BQUEsR0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWYsQ0FBQSxDQUFULENBQUE7QUFBQSxNQUNBLE1BQUEsR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsYUFBaEIsQ0FEVCxDQUFBO0FBQUEsTUFFQSxPQUFBLEdBQ0k7QUFBQSxRQUFBLEtBQUEsRUFBTyxZQUFQO0FBQUEsUUFDQSxNQUFBLEVBQVEsT0FEUjtBQUFBLFFBRUEsa0JBQUEsRUFBb0IsUUFBQSxDQUFTLE1BQU0sQ0FBQyxTQUFVLENBQUEsQ0FBQSxDQUExQixDQUZwQjtBQUFBLFFBR0Esa0JBQUEsRUFBb0IsUUFBQSxDQUFTLE1BQU0sQ0FBQyxTQUFVLENBQUEsQ0FBQSxDQUExQixDQUhwQjtBQUFBLFFBSUEsbUJBQUEsRUFBcUIsUUFBQSxDQUFTLE1BQU0sQ0FBQyxhQUFjLENBQUEsQ0FBQSxDQUE5QixDQUpyQjtBQUFBLFFBS0EsbUJBQUEsRUFBcUIsUUFBQSxDQUFTLE1BQU0sQ0FBQyxhQUFjLENBQUEsQ0FBQSxDQUE5QixDQUxyQjtBQUFBLFFBTUEsS0FBQSxFQUFPLENBTlA7T0FISixDQUFBO0FBWUEsTUFBQSxJQUE4QixJQUFBLEtBQVEsc0JBQXRDO0FBQUEsUUFBQSxPQUFPLENBQUMsS0FBUixHQUFnQixVQUFoQixDQUFBO09BWkE7QUFhQSxNQUFBLElBR0ssSUFBQSxLQUFRLHdCQUhiO0FBQUEsUUFBQSxPQUFPLENBQUMsS0FBUixHQUFnQixJQUFJLENBQUMsS0FBTCxDQUNaLFFBQUEsQ0FBUyxNQUFNLENBQUMsY0FBZSxDQUFBLENBQUEsQ0FBL0IsQ0FBQSxHQUFxQyxJQUFJLENBQUMsTUFBTCxDQUFBLENBQUEsR0FDckMsUUFBQSxDQUFTLE1BQU0sQ0FBQyxjQUFlLENBQUEsQ0FBQSxDQUF0QixHQUEyQixNQUFNLENBQUMsY0FBZSxDQUFBLENBQUEsQ0FBakQsR0FBc0QsQ0FBL0QsQ0FGWSxDQUFoQixDQUFBO09BYkE7OEJBbUJBLE1BQU0sQ0FBRSxVQUFSLENBQW1CLEtBQUEsQ0FBTSxPQUFOLENBQW5CLFdBdEJNO0lBQUEsQ0F0QlY7R0FOSixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/marian/.atom/packages/lorem-ipsum/lib/index.coffee