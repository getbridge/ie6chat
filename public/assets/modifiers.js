(function() {

  Kandan.Modifiers = (function() {

    function Modifiers() {}

    Modifiers.modifiers = [];

    Modifiers.register = function(regex, callback) {
      return this.modifiers.push({
        regex: regex,
        callback: callback
      });
    };

    Modifiers.all = function() {
      return this.modifiers;
    };

    Modifiers.process = function(message, state) {
      var modified_object, modifier, _i, _len, _ref;
      _ref = this.modifiers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        modifier = _ref[_i];
        if (message.content.match(modifier.regex) !== null) {
          modified_object = modifier.callback(message, state);
          if (modified_object !== false) return modified_object;
        }
      }
      return false;
    };

    return Modifiers;

  })();

}).call(this);
