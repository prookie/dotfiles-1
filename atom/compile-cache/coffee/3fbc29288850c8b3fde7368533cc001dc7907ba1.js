(function() {
  var GoFormatStatusView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom').View;

  module.exports = GoFormatStatusView = (function(_super) {
    __extends(GoFormatStatusView, _super);

    function GoFormatStatusView() {
      return GoFormatStatusView.__super__.constructor.apply(this, arguments);
    }

    GoFormatStatusView.content = function() {
      return this.div({
        "class": 'go-format-status inline-block'
      });
    };

    GoFormatStatusView.prototype.destroy = function() {
      return this.detach();
    };

    GoFormatStatusView.prototype.initialize = function() {
      return setTimeout(((function(_this) {
        return function() {
          return _this.attach();
        };
      })(this)), 0);
    };

    GoFormatStatusView.prototype.attach = function() {
      var statusbar;
      statusbar = atom.workspaceView.statusBar;
      return statusbar.appendRight(this);
    };

    return GoFormatStatusView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHdCQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxPQUFRLE9BQUEsQ0FBUSxNQUFSLEVBQVIsSUFBRCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLHlDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLGtCQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLE9BQUEsRUFBTywrQkFBUDtPQUFMLEVBRFE7SUFBQSxDQUFWLENBQUE7O0FBQUEsaUNBR0EsT0FBQSxHQUFTLFNBQUEsR0FBQTthQUNQLElBQUMsQ0FBQSxNQUFELENBQUEsRUFETztJQUFBLENBSFQsQ0FBQTs7QUFBQSxpQ0FNQSxVQUFBLEdBQVksU0FBQSxHQUFBO2FBQ1YsVUFBQSxDQUFXLENBQUMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFBRyxLQUFDLENBQUEsTUFBRCxDQUFBLEVBQUg7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFELENBQVgsRUFBMkIsQ0FBM0IsRUFEVTtJQUFBLENBTlosQ0FBQTs7QUFBQSxpQ0FTQSxNQUFBLEdBQVEsU0FBQSxHQUFBO0FBQ04sVUFBQSxTQUFBO0FBQUEsTUFBQSxTQUFBLEdBQVksSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUEvQixDQUFBO2FBQ0EsU0FBUyxDQUFDLFdBQVYsQ0FBc0IsSUFBdEIsRUFGTTtJQUFBLENBVFIsQ0FBQTs7OEJBQUE7O0tBRCtCLEtBSGpDLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/marian/.atom/packages/go-format/lib/go-format-status-view.coffee