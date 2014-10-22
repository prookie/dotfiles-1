(function() {
  var InsertBoilerplateView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom').View;

  module.exports = InsertBoilerplateView = (function(_super) {
    __extends(InsertBoilerplateView, _super);

    function InsertBoilerplateView() {
      return InsertBoilerplateView.__super__.constructor.apply(this, arguments);
    }

    InsertBoilerplateView.content = function() {
      return this.div({
        "class": 'insert-boilerplate overlay from-top'
      }, (function(_this) {
        return function() {
          return _this.div("The InsertBoilerplate package is Alive! It's ALIVE!", {
            "class": "message"
          });
        };
      })(this));
    };

    InsertBoilerplateView.prototype.initialize = function(serializeState) {
      return atom.workspaceView.command("insert-boilerplate:toggle", (function(_this) {
        return function() {
          return _this.toggle();
        };
      })(this));
    };

    InsertBoilerplateView.prototype.serialize = function() {};

    InsertBoilerplateView.prototype.destroy = function() {
      return this.detach();
    };

    InsertBoilerplateView.prototype.toggle = function() {
      console.log("InsertBoilerplateView was toggled!");
      if (this.hasParent()) {
        return this.detach();
      } else {
        return atom.workspaceView.append(this);
      }
    };

    return InsertBoilerplateView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDJCQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxPQUFRLE9BQUEsQ0FBUSxNQUFSLEVBQVIsSUFBRCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLDRDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLHFCQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLE9BQUEsRUFBTyxxQ0FBUDtPQUFMLEVBQW1ELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQ2pELEtBQUMsQ0FBQSxHQUFELENBQUsscURBQUwsRUFBNEQ7QUFBQSxZQUFBLE9BQUEsRUFBTyxTQUFQO1dBQTVELEVBRGlEO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbkQsRUFEUTtJQUFBLENBQVYsQ0FBQTs7QUFBQSxvQ0FJQSxVQUFBLEdBQVksU0FBQyxjQUFELEdBQUE7YUFDVixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLDJCQUEzQixFQUF3RCxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUFHLEtBQUMsQ0FBQSxNQUFELENBQUEsRUFBSDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXhELEVBRFU7SUFBQSxDQUpaLENBQUE7O0FBQUEsb0NBUUEsU0FBQSxHQUFXLFNBQUEsR0FBQSxDQVJYLENBQUE7O0FBQUEsb0NBV0EsT0FBQSxHQUFTLFNBQUEsR0FBQTthQUNQLElBQUMsQ0FBQSxNQUFELENBQUEsRUFETztJQUFBLENBWFQsQ0FBQTs7QUFBQSxvQ0FjQSxNQUFBLEdBQVEsU0FBQSxHQUFBO0FBQ04sTUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLG9DQUFaLENBQUEsQ0FBQTtBQUNBLE1BQUEsSUFBRyxJQUFDLENBQUEsU0FBRCxDQUFBLENBQUg7ZUFDRSxJQUFDLENBQUEsTUFBRCxDQUFBLEVBREY7T0FBQSxNQUFBO2VBR0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFuQixDQUEwQixJQUExQixFQUhGO09BRk07SUFBQSxDQWRSLENBQUE7O2lDQUFBOztLQURrQyxLQUhwQyxDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/marian/.atom/packages/insert-boilerplate/lib/insert-boilerplate-view.coffee