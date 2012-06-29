(function() {

  Kandan.Data.Attachments = (function() {

    function Attachments() {}

    Attachments.callbacks = {
      "change": []
    };

    Attachments.all = function(callback) {
      var attachments;
      attachments = new Kandan.Collections.Attachments([], {
        channelId: Kandan.Data.Channels.activeChannelId()
      });
      return attachments.fetch({
        success: callback
      });
    };

    Attachments.registerCallback = function(event, callback) {
      return this.callbacks[event].push(callback);
    };

    Attachments.runCallbacks = function(event, data) {
      var callback, _i, _len, _ref, _results;
      this.cache = data.extra.attachments;
      _ref = this.callbacks[event];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        callback = _ref[_i];
        _results.push(callback(data));
      }
      return _results;
    };

    Attachments.unregisterCallback = function(event, callback) {
      delete this.callbacks[this.callbacks.indexOf(callback)];
      return this.callbacks.filter(function(element, index, array) {
        return element !== void 0;
      });
    };

    return Attachments;

  })();

}).call(this);
