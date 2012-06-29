(function() {

  Kandan.Store = (function() {

    function Store() {}

    Store.get = function(plugin_id, callbacks) {
      var data;
      data = ["http://google.com/song.mp3", "http://google.com/song2.mp3"];
      return callbacks.success(data);
    };

    Store.set = function(plugin_id, callbacks) {
      return callbacks.success(data);
    };

    return Store;

  })();

}).call(this);
