(function() {
  var WeatherPackageView;

  WeatherPackageView = require('./weather-package-view');

  module.exports = {
    weatherPackageView: null,
    activate: function(state) {
      return this.weatherPackageView = new WeatherPackageView(state.weatherPackageViewState);
    },
    deactivate: function() {
      return this.weatherPackageView.destroy();
    },
    serialize: function() {
      return {
        weatherPackageViewState: this.weatherPackageView.serialize()
      };
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGtCQUFBOztBQUFBLEVBQUEsa0JBQUEsR0FBcUIsT0FBQSxDQUFRLHdCQUFSLENBQXJCLENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxrQkFBQSxFQUFvQixJQUFwQjtBQUFBLElBRUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO2FBQ1IsSUFBQyxDQUFBLGtCQUFELEdBQTBCLElBQUEsa0JBQUEsQ0FBbUIsS0FBSyxDQUFDLHVCQUF6QixFQURsQjtJQUFBLENBRlY7QUFBQSxJQUtBLFVBQUEsRUFBWSxTQUFBLEdBQUE7YUFDVixJQUFDLENBQUEsa0JBQWtCLENBQUMsT0FBcEIsQ0FBQSxFQURVO0lBQUEsQ0FMWjtBQUFBLElBUUEsU0FBQSxFQUFXLFNBQUEsR0FBQTthQUNUO0FBQUEsUUFBQSx1QkFBQSxFQUF5QixJQUFDLENBQUEsa0JBQWtCLENBQUMsU0FBcEIsQ0FBQSxDQUF6QjtRQURTO0lBQUEsQ0FSWDtHQUhGLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/marian/.atom/packages/weather-package/lib/weather-package.coffee