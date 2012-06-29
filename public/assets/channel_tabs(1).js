(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Kandan.Views.ChannelTabs = (function(_super) {

    __extends(ChannelTabs, _super);

    function ChannelTabs() {
      ChannelTabs.__super__.constructor.apply(this, arguments);
    }

    ChannelTabs.prototype.template = JST['channel_tabs'];

    ChannelTabs.prototype.tagName = 'ul';

    ChannelTabs.prototype.render = function() {
      $(this.el).html(this.template({
        channels: this.options.channels
      }));
      return this;
    };

    ChannelTabs.prototype.createChannel = function(event) {
      var channel, channelName, name, names;
      names = ["A Dark Place", "Discotheque", "Dungeon", "Garden", "Lobby", "Office", "Palace", "Park", "Studio", "Temple", "War Room", "Zork"];
      name = _.shuffle(names)[0];
      channelName = prompt("What's the channel name?", name);
      channelName = channelName.replace(/^\s+|\s+$/g, '');
      if (channelName) {
        channel = new Kandan.Models.Channel({
          name: channelName
        });
        channel.save({}, {
          success: function(model) {
            return Kandan.Helpers.Channels.createChannelArea(model);
          }
        });
        console.log("create channel: " + channelName);
      }
      return false;
    };

    ChannelTabs.prototype.deleteChannel = function(event) {
      var channelIndex;
      channelIndex = $(event.target).parents('li').prevAll().length;
      if (channelIndex !== 0) {
        Kandan.Helpers.Channels.deleteChannelByTabIndex(channelIndex);
      }
      return false;
    };

    return ChannelTabs;

  })(Backbone.View);

}).call(this);
