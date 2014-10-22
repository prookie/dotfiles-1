(function() {
  var View, WeatherPackageView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom').View;

  module.exports = WeatherPackageView = (function(_super) {
    __extends(WeatherPackageView, _super);

    function WeatherPackageView() {
      return WeatherPackageView.__super__.constructor.apply(this, arguments);
    }

    WeatherPackageView.content = function() {
      return this.div({
        "class": 'weather-package overlay from-top from-right'
      }, (function(_this) {
        return function() {
          _this.div("City", {
            "class": "city",
            id: "city"
          });
          _this.div("Temperature", {
            "class": "temp",
            id: "temp"
          });
          return _this.div("Pressure", {
            "class": "pressure",
            id: "pressure"
          });
        };
      })(this));
    };

    WeatherPackageView.prototype.initialize = function(serializeState) {
      return atom.workspaceView.command("weather-package:toggle", (function(_this) {
        return function() {
          return _this.toggle();
        };
      })(this));
    };

    WeatherPackageView.prototype.serialize = function() {};

    WeatherPackageView.prototype.destroy = function() {
      return this.detach();
    };

    WeatherPackageView.prototype.toggle = function() {
      var city, constructor, fahrenheit, remove, sUrl, that, view, xml;
      if (this.hasParent()) {
        this.detach();
        return;
      }
      atom.workspaceView.appendToBottom(this);
      city = atom.config.get("weather-package.city");
      if (!(city != null)) {
        city = "Kiev";
        atom.config.set("weather-package.city", city);
      }
      fahrenheit = atom.config.get("weather-package.showInFahrenheit");
      if (!(fahrenheit != null)) {
        fahrenheit = true;
        atom.config.set("weather-package.showInFahrenheit", true);
      }
      that = this;
      view = this;
      constructor = {
        units: "imperial",
        unitTemp: "F",
        unitPress: "hPa",
        correctPress: 1
      };
      if (!fahrenheit) {
        constructor.units = "metric";
        constructor.unitTemp = "C";
        constructor.unitPress = "mmHg";
        constructor.correctPress = 1.33;
      }
      xml = new XMLHttpRequest();
      xml.addEventListener('readystatechange', function() {
        var oJSON, pressure;
        if (xml.readyState === 4 && xml.status === 200) {
          oJSON = JSON.parse(xml.responseText);
          pressure = oJSON.main.pressure / constructor.correctPress;
          view.find("#city").text("City: " + oJSON.name + " " + oJSON.weather[0].description);
          view.find("#temp").text("Temperature: " + oJSON.main.temp.toFixed() + " " + constructor.unitTemp);
          return view.find("#pressure").text("Pressure: " + pressure.toFixed(2) + " " + constructor.unitPress);
        }
      });
      sUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + constructor.units;
      xml.open("get", sUrl, true);
      xml.send();
      return remove = function() {
        return view.detach();
      };
    };

    return WeatherPackageView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHdCQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxPQUFRLE9BQUEsQ0FBUSxNQUFSLEVBQVIsSUFBRCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLHlDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLGtCQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLE9BQUEsRUFBTyw2Q0FBUDtPQUFMLEVBQTJELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7QUFDdkQsVUFBQSxLQUFDLENBQUEsR0FBRCxDQUFLLE1BQUwsRUFBYTtBQUFBLFlBQUEsT0FBQSxFQUFPLE1BQVA7QUFBQSxZQUFlLEVBQUEsRUFBSSxNQUFuQjtXQUFiLENBQUEsQ0FBQTtBQUFBLFVBQ0EsS0FBQyxDQUFBLEdBQUQsQ0FBSyxhQUFMLEVBQW9CO0FBQUEsWUFBQSxPQUFBLEVBQU8sTUFBUDtBQUFBLFlBQWUsRUFBQSxFQUFJLE1BQW5CO1dBQXBCLENBREEsQ0FBQTtpQkFFQSxLQUFDLENBQUEsR0FBRCxDQUFLLFVBQUwsRUFBaUI7QUFBQSxZQUFBLE9BQUEsRUFBTyxVQUFQO0FBQUEsWUFBbUIsRUFBQSxFQUFJLFVBQXZCO1dBQWpCLEVBSHVEO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBM0QsRUFEUTtJQUFBLENBQVYsQ0FBQTs7QUFBQSxpQ0FNQSxVQUFBLEdBQVksU0FBQyxjQUFELEdBQUE7YUFDVixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLHdCQUEzQixFQUFxRCxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUFHLEtBQUMsQ0FBQSxNQUFE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
//# sourceURL=/Users/marian/.atom/packages/weather-package/lib/weather-package-view.coffee