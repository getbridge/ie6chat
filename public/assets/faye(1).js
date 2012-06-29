(function() {

  Kandan.Broadcasters.FayeBroadcaster = (function() {

    function FayeBroadcaster() {
      var authExtension,
        _this = this;
      this.fayeClient = new Faye.Client("/remote/faye");
      this.fayeClient.disable('websocket');
      authExtension = {
        outgoing: function(message, callback) {
          if (message.channel === "/meta/subscribe") {
            message['ext'] = {
              auth_token: Kandan.Helpers.Users.currentUser().auth_token
            };
          }
          return callback(message);
        }
      };
      this.fayeClient.addExtension(authExtension);
      this.fayeClient.bind("transport:down", function() {
        return console.log("Comm link to Cybertron is down!");
      });
      this.fayeClient.bind("transport:up", function() {
        return console.log("Comm link is up!");
      });
      this.fayeClient.subscribe("/app/activities", function(data) {
        var entityName, eventName, _ref;
        _ref = data.event.split("#"), entityName = _ref[0], eventName = _ref[1];
        if (entityName === "user") _this.processEventsForUser(eventName, data);
        if (entityName === "channel") {
          _this.processEventsForChannel(eventName, data);
        }
        if (entityName === "attachments") {
          return _this.processEventsForAttachments(eventName, data);
        }
      });
    }

    FayeBroadcaster.prototype.processEventsForAttachments = function(eventName, data) {
      Kandan.Helpers.Channels.addActivity(data.entity, Kandan.Helpers.Activities.ACTIVE_STATE);
      return Kandan.Data.Attachments.runCallbacks("change", data);
    };

    FayeBroadcaster.prototype.processEventsForUser = function(eventName, data) {
      if (eventName.match(/connect/)) {
        $(document).data('active-users', data.extra.active_users);
        return Kandan.Data.ActiveUsers.runCallbacks("change", data);
      }
    };

    FayeBroadcaster.prototype.processEventsForChannel = function(eventName, data) {
      if (eventName === "delete") {
        Kandan.Helpers.Channels.deleteChannelById(data.entity.id);
      }
      if (data.eventName === "update") {
        return Kandan.Helpers.Channels.renameChannelById(data.entity.id, data.entity.name);
      }
    };

    FayeBroadcaster.prototype.subscribe = function(channel) {
      var subscription,
        _this = this;
      subscription = this.fayeClient.subscribe(channel, function(data) {
        return Kandan.Helpers.Channels.addActivity(data, Kandan.Helpers.Activities.ACTIVE_STATE);
      });
      return subscription.errback(function(data) {
        console.log("error", data);
        return alert("Oops! could not connect to the server");
      });
    };

    return FayeBroadcaster;

  })();

}).call(this);
