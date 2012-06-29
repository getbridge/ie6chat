(function() {

  Kandan.Data.Channels = (function() {

    function Channels() {}

    Channels.callbacks = {
      "change": []
    };

    Channels.activeChannelId = function() {
      return Kandan.Helpers.Channels.getActiveChannelId();
    };

    Channels.all = function(callbacks) {
      var attachments;
      return attachments = new Kandan.Collections.Attachments([], {
        channel_id: this.activeChannelId()
      });
    };

    Channels.runCallbacks = function(event) {
      var callback, _i, _len, _ref, _results;
      _ref = this.callbacks[event];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        callback = _ref[_i];
        _results.push(callback());
      }
      return _results;
    };

    Channels.registerCallback = function(event, callback) {
      return this.callbacks[event].push(callback);
    };

    Channels.unregisterCallback = function(event, callback) {
      delete this.callbacks[this.callbacks.indexOf(callback)];
      return this.callbacks.filter(function(element, index, array) {
        return element !== void 0;
      });
    };

    return Channels;

  })();

}).call(this);
