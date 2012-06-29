(function() {

  Kandan.Plugins = (function() {

    function Plugins() {}

    Plugins.plugins = [];

    Plugins.register = function(plugin) {
      return this.plugins.push(plugin);
    };

    Plugins.all = function() {
      return this.plugins;
    };

    Plugins.initAll = function() {
      var plugin, _i, _len, _ref, _results;
      _ref = this.all();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        plugin = _ref[_i];
        _results.push(eval(plugin).init());
      }
      return _results;
    };

    return Plugins;

  })();

}).call(this);
