(function() {
  var ConfigObserver, View, WeatherPackageView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom').View;

  ConfigObserver = require('atom').ConfigObserver;

  module.exports = WeatherPackageView = (function(_super) {
    __extends(WeatherPackageView, _super);

    function WeatherPackageView() {
      return WeatherPackageView.__super__.constructor.apply(this, arguments);
    }

    WeatherPackageView.content = function() {
      return this.div({
        "class": 'weather-package inline-block'
      }, (function(_this) {
        return function() {
          _this.span("Getting weather", {
            "class": "city",
            id: "city"
          });
          _this.span("", {
            "class": "temp",
            id: "temp"
          });
          return _this.span("", {
            "class": "pressure",
            id: "pressure"
          });
        };
      })(this));
    };

    WeatherPackageView.prototype.initialize = function(serializeState) {
      atom.workspaceView.command("weather-package:toggle", (function(_this) {
        return function() {
          return _this.toggle();
        };
      })(this));
      atom.config.setDefaults("weather-package", {
        city: "Kiev"
      });
      return atom.config.setDefaults("weather-package", {
        refreshIntervalInMinutes: 30
      });
    };

    WeatherPackageView.prototype.serialize = function() {};

    WeatherPackageView.prototype.destroy = function() {
      return this.detach();
    };

    WeatherPackageView.prototype.interval = null;

    WeatherPackageView.prototype.toggle = function() {
      var iTimeout, view, _ref;
      view = this;
      if (this.hasParent()) {
        clearInterval(this.interval);
        this.interval = null;
        this.detach();
        return;
      }
      if ((_ref = atom.workspaceView.statusBar) != null) {
        _ref.prependRight(this);
      }
      iTimeout = atom.config.get("weather-package.refreshIntervalInMinutes");
      if (iTimeout) {
        iTimeout = iTimeout * 60 * 1000;
      } else {
        iTimeout = 1800000;
        atom.config.set("weather-package.refreshIntervalInMinutes", iTimeout / 60000);
      }
      if (!this.interval) {
        view.interval = setInterval(((function(_this) {
          return function() {
            return _this.getData(view);
          };
        })(this)), iTimeout);
      }
      return this.getData(view);
    };

    WeatherPackageView.prototype.getData = function(view) {
      var city, constr, fahrenheit, sUrl, showPressure, showTemp, xml;
      city = atom.config.get("weather-package.city");
      fahrenheit = atom.config.get("weather-package.showInFahrenheit");
      if (fahrenheit == null) {
        fahrenheit = true;
        atom.config.set("weather-package.showInFahrenheit", false);
      }
      constr = {
        units: "imperial",
        unitTemp: "F",
        unitPress: "hPa",
        correctPress: 1
      };
      if (!fahrenheit) {
        constr.units = "metric";
        constr.unitTemp = "C";
        constr.unitPress = "mmHg";
        constr.correctPress = 1.33;
      }
      showTemp = atom.config.get("weather-package.showTemperature");
      if (showTemp == null) {
        showTemp = true;
        atom.config.set("weather-package.showTemperature", true);
      }
      showPressure = atom.config.get("weather-package.showPressure");
      if (showPressure == null) {
        showPressure = true;
        atom.config.set("weather-package.showPressure", true);
      }
      xml = new XMLHttpRequest();
      xml.addEventListener('readystatechange', (function(_this) {
        return function() {
          var oJSON, pressure;
          if (xml.readyState === 4 && xml.status === 200) {
            oJSON = JSON.parse(xml.responseText);
            pressure = oJSON.main.pressure / constr.correctPress;
            view.find("#city").text(" " + oJSON.name + " " + oJSON.weather[0].description);
            if (showTemp) {
              view.find("#temp").text(" " + oJSON.main.temp.toFixed() + " " + constr.unitTemp);
            } else {
              view.find("#temp").text("");
            }
            if (showPressure) {
              return view.find("#pressure").text(" " + pressure.toFixed(2) + " " + constr.unitPress);
            } else {
              return view.find("#pressure").text("");
            }
          }
        };
      })(this));
      sUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + constr.units;
      xml.open("get", sUrl, true);
      return xml.send();
    };

    return WeatherPackageView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHdDQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxPQUFRLE9BQUEsQ0FBUSxNQUFSLEVBQVIsSUFBRCxDQUFBOztBQUFBLEVBQ0MsaUJBQWtCLE9BQUEsQ0FBUSxNQUFSLEVBQWxCLGNBREQsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQ1E7QUFFSix5Q0FBQSxDQUFBOzs7O0tBQUE7O0FBQUEsSUFBQSxrQkFBQyxDQUFBLE9BQUQsR0FBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsUUFBQSxPQUFBLEVBQU8sOEJBQVA7T0FBTCxFQUE0QyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO0FBQzFDLFVBQUEsS0FBQyxDQUFBLElBQUQsQ0FBTSxpQkFBTixFQUF5QjtBQUFBLFlBQUEsT0FBQSxFQUFPLE1BQVA7QUFBQSxZQUFlLEVBQUEsRUFBSSxNQUFuQjtXQUF6QixDQUFBLENBQUE7QUFBQSxVQUNBLEtBQUMsQ0FBQSxJQUFELENBQU0sRUFBTixFQUFVO0FBQUEsWUFBQSxPQUFBLEVBQU8sTUFBUDtBQUFBLFlBQWUsRUFBQSxFQUFJLE1BQW5CO1dBQVYsQ0FEQSxDQUFBO2lCQUVBLEtBQUMsQ0FBQSxJQUFELENBQU0sRUFBTixFQUFVO0FBQUEsWUFBQSxPQUFBLEVBQU8sVUFBUDtBQUFBLFlBQW1CLEVBQUEsRUFBSSxVQUF2QjtXQUFWLEVBSDBDO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBNUMsRUFEUTtJQUFBLENBQVYsQ0FBQTs7QUFBQSxpQ0FNQSxVQUFBLEdBQVksU0FBQyxjQUFELEdBQUE7QUFDVixNQUFBLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBbkIsQ0FBMkIsd0JBQTNCLEVBQXFELENB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
//# sourceURL=/Users/marian/.atom/packages/weather-package/lib/weather-package-view.coffee