(function() {
  var _definitions, _globPatterns, _variablePatterns;

  _definitions = {};

  _variablePatterns = {
    'variable:sass': '\\$__VARIABLE__\\:[\\s?](.+)[\\;|\\n]',
    'variable:less': '\\@__VARIABLE__\\:[\\s?](.+)[\\;|\\n]'
  };

  _globPatterns = {
    'variable:sass': ['**/*.scss', '**/*.sass'],
    'variable:less': ['**/*.less']
  };

  module.exports = {
    findDefinition: function(name, type) {
      var _definition, _options, _pointer, _regex, _regexString, _results;
      if (!(_regexString = _variablePatterns[type])) {
        return;
      }
      _regex = RegExp(_regexString.replace('__VARIABLE__', name));
      _results = [];
      if (_definition = _definitions[name]) {
        _pointer = _definition.pointer;
        return (atom.project.bufferForPath(_pointer.filePath)).then((function(_this) {
          return function(buffer) {
            var _match, _text;
            _text = buffer.getTextInRange(_pointer.range);
            _match = _text.match(_regex);
            if (!_match) {
              _definitions[name] = null;
              return _this.findDefinition(name, type);
            }
            _definition.definition = _match[1];
            return _definition;
          };
        })(this));
      }
      _options = !_globPatterns[type] ? null : {
        paths: _globPatterns[type]
      };
      return atom.project.scan(_regex, _options, function(result) {
        return _results.push(result);
      }).then((function(_this) {
        return function() {
          var i, pathFragment, result, _bestMatch, _bestMatchHits, _i, _j, _len, _len1, _match, _pathFragments, _targetFragments, _targetPath, _thisMatchHits;
          _targetPath = atom.workspaceView.getActivePaneItem().getPath();
          _targetFragments = _targetPath.split('/');
          _bestMatch = null;
          _bestMatchHits = 0;
          for (_i = 0, _len = _results.length; _i < _len; _i++) {
            result = _results[_i];
            _thisMatchHits = 0;
            _pathFragments = result.filePath.split('/');
            for (i = _j = 0, _len1 = _pathFragments.length; _j < _len1; i = ++_j) {
              pathFragment = _pathFragments[i];
              if (pathFragment === _targetFragments[i]) {
                _thisMatchHits++;
              }
            }
            if (_thisMatchHits > _bestMatchHits) {
              _bestMatch = result;
              _bestMatchHits = _thisMatchHits;
            }
          }
          if (!(_bestMatch && (_match = _bestMatch.matches[0]))) {
            return _this;
          }
          _definitions[name] = {
            name: name,
            type: type,
            pointer: {
              filePath: _bestMatch.filePath,
              range: _match.range
            }
          };
          return _this.findDefinition(name, type);
        };
      })(this));
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBSVE7QUFBQSxNQUFBLDhDQUFBOztBQUFBLEVBQUEsWUFBQSxHQUFlLEVBQWYsQ0FBQTs7QUFBQSxFQUtBLGlCQUFBLEdBQW9CO0FBQUEsSUFDaEIsZUFBQSxFQUFpQix1Q0FERDtBQUFBLElBRWhCLGVBQUEsRUFBaUIsdUNBRkQ7R0FMcEIsQ0FBQTs7QUFBQSxFQWFBLGFBQUEsR0FBZ0I7QUFBQSxJQUNaLGVBQUEsRUFBaUIsQ0FBQyxXQUFELEVBQWMsV0FBZCxDQURMO0FBQUEsSUFFWixlQUFBLEVBQWlCLENBQUMsV0FBRCxDQUZMO0dBYmhCLENBQUE7O0FBQUEsRUFxQkEsTUFBTSxDQUFDLE9BQVAsR0FJSTtBQUFBLElBQUEsY0FBQSxFQUFnQixTQUFDLElBQUQsRUFBTyxJQUFQLEdBQUE7QUFDWixVQUFBLCtEQUFBO0FBQUEsTUFBQSxJQUFBLENBQUEsQ0FBYyxZQUFBLEdBQWUsaUJBQWtCLENBQUEsSUFBQSxDQUFqQyxDQUFkO0FBQUEsY0FBQSxDQUFBO09BQUE7QUFBQSxNQUNBLE1BQUEsR0FBUyxNQUFBLENBQVEsWUFBWSxDQUFDLE9BQWIsQ0FBcUIsY0FBckIsRUFBcUMsSUFBckMsQ0FBUixDQURULENBQUE7QUFBQSxNQUdBLFFBQUEsR0FBVyxFQUhYLENBQUE7QUFNQSxNQUFBLElBQUcsV0FBQSxHQUFjLFlBQWEsQ0FBQSxJQUFBLENBQTlCO0FBQ0ksUUFBQSxRQUFBLEdBQVcsV0FBVyxDQUFDLE9BQXZCLENBQUE7QUFFQSxlQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFiLENBQTJCLFFBQVEsQ0FBQyxRQUFwQyxDQUFELENBQThDLENBQUMsSUFBL0MsQ0FBb0QsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFDLE1BQUQsR0FBQTtBQUN2RCxnQkFBQSxhQUFBO0FBQUEsWUFBQSxLQUFBLEdBQVEsTUFBTSxDQUFDLGNBQVAsQ0FBc0IsUUFBUSxDQUFDLEtBQS9CLENBQVIsQ0FBQTtBQUFBLFlBQ0EsTUFBQSxHQUFTLEtBQUssQ0FBQyxLQUFOLENBQVksTUFBWixDQURULENBQUE7QUFHQSxZQUFBLElBQUEsQ0FBQSxNQUFBO0FBQ0ksY0FBQSxZQUFhLENBQUEsSUFBQSxDQUFiLEdBQXFCLElBQXJCLENBQUE7QUFDQSxxQkFBTyxLQUFDLENBQUEsY0FBRCxDQUFnQixJQUFoQixFQUFzQixJQUF0QixDQUFQLENBRko7YUFIQTtBQUFBLFlBT0EsV0FBVyxDQUFDLFVBQVosR0FBeUIsTUFBTyxDQUFBLENBQUEsQ0FQaEMsQ0FBQTtBQVFBLG1CQUFPLFdBQVAsQ0FUdUQ7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFwRCxDQUFQLENBSEo7T0FOQTtBQUFBLE1Bb0JBLFFBQUEsR0FBVyxDQUFBLGFBQXFCLENBQUEsSUFBQSxDQUFyQixHQUFnQyxJQUFoQyxHQUEwQztBQUFBLFFBQ2pELEtBQUEsRUFBTyxhQUFjLENBQUEsSUFBQSxDQUQ0QjtPQXBCckQsQ0FBQTthQXlCQSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQWIsQ0FBa0IsTUFBbEIsRUFBMEIsUUFBMUIsRUFBb0MsU0FBQyxNQUFELEdBQUE7ZUFDaEMsUUFBUSxDQUFDLElBQVQsQ0FBYyxNQUFkLEVBRGdDO01BQUEsQ0FBcEMsQ0FFQSxDQUFDLElBRkQsQ0FFTSxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO0FBR0YsY0FBQSwrSUFBQTtBQUFBLFVBQUEsV0FBQSxHQUFjLElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQW5CLENBQUEsQ0FBc0MsQ0FBQyxPQUF2QyxDQUFBLENBQWQsQ0FBQTtBQUFBLFVBQ0EsZ0JBQUEsR0FBbUIsV0FBVyxDQUFDLEtBQVosQ0FBa0IsR0FBbEIsQ0FEbkIsQ0FBQTtBQUFBLFVBR0EsVUFBQSxHQUFhLElBSGIsQ0FBQTtBQUFBLFVBSUEsY0FBQSxHQUFpQixDQUpqQixDQUFBO0FBTUEsZUFBQSwrQ0FBQTtrQ0FBQTtBQUNJLFlBQUEsY0FBQSxHQUFpQixDQUFqQixDQUFBO0FBQUEsWUFDQSxjQUFBLEdBQWlCLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBaEIsQ0FBc0IsR0FBdEIsQ0FEakIsQ0FBQTtBQUVBLGlCQUFBLCtEQUFBOytDQUFBO2tCQUE0RCxZQUFBLEtBQWdCLGdCQUFpQixDQUFBLENBQUE7QUFBN0YsZ0JBQUEsY0FBQSxFQUFBO2VBQUE7QUFBQSxhQUZBO0FBSUEsWUFBQSxJQUFHLGNBQUEsR0FBaUIsY0FBcEI7QUFDSSxjQUFBLFVBQUEsR0FBYSxNQUFiLENBQUE7QUFBQSxjQUNBLGNBQUEsR0FBaUIsY0FEakIsQ0FESjthQUxKO0FBQUEsV0FOQTtBQWNBLFVBQUEsSUFBQSxDQUFBLENBQW1CLFVBQUEsSUFBZSxDQUFBLE1BQUEsR0FBUyxVQUFVLENBQUMsT0FBUSxDQUFBLENBQUEsQ0FBNUIsQ0FBbEMsQ0FBQTtBQUFBLG1CQUFPLEtBQVAsQ0FBQTtXQWRBO0FBQUEsVUFnQkEsWUFBYSxDQUFBLElBQUEsQ0FBYixHQUFxQjtBQUFBLFlBQ2pCLElBQUEsRUFBTSxJQURXO0FBQUEsWUFFakIsSUFBQSxFQUFNLElBRlc7QUFBQSxZQUlqQixPQUFBLEVBQ0k7QUFBQSxjQUFBLFFBQUEsRUFBVSxVQUFVLENBQUMsUUFBckI7QUFBQSxjQUNBLEtBQUEsRUFBTyxNQUFNLENBQUMsS0FEZDthQUxhO1dBaEJyQixDQUFBO0FBeUJBLGlCQUFPLEtBQUMsQ0FBQSxjQUFELENBQWdCLElBQWhCLEVBQXNCLElBQXRCLENBQVAsQ0E1QkU7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUZOLEVBMUJZO0lBQUEsQ0FBaEI7R0F6QkosQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/marian/.atom/packages/color-picker/lib/variable-inspector.coffee