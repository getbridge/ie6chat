(function() {

  Kandan.Data.ActiveUsers = (function() {

    function ActiveUsers() {}

    ActiveUsers.callbacks = {
      "change": []
    };

    ActiveUsers.all = function() {
      return Kandan.Helpers.ActiveUsers.all();
    };

    ActiveUsers.registerCallback = function(event, callback) {
      return this.callbacks[event].push(callback);
    };

    ActiveUsers.runCallbacks = function(event, data) {
      var callback, _i, _len, _ref, _results;
      _ref = this.callbacks[event];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        callback = _ref[_i];
        _results.push(callback(data));
      }
      return _results;
    };

    ActiveUsers.unregisterCallback = function(event, callback) {
      delete this.callbacks[this.callbacks.indexOf(callback)];
      return this.callbacks.filter(function(element, index, array) {
        return element !== void 0;
      });
    };

    return ActiveUsers;

  })();

}).call(this);
