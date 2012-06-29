(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Kandan.Views.ChannelPane = (function(_super) {

    __extends(ChannelPane, _super);

    function ChannelPane() {
      ChannelPane.__super__.constructor.apply(this, arguments);
    }

    ChannelPane.prototype.tagName = 'div';

    ChannelPane.prototype.render = function(container) {
      container = container || $(this.el);
      $(container).html(this.paginatedActivitiesView());
      $(container).append(this.chatboxView());
      this.setIdAndData(container);
      Kandan.Helpers.Audio.createAudioChannel(this.options.channel.get('id'));
      return this;
    };

    ChannelPane.prototype.setIdAndData = function(container) {
      $(container).attr("id", "channels-" + (this.options.channel.get("id")));
      return $(container).data("channel-id", this.options.channel.get('id'));
    };

    ChannelPane.prototype.paginatedActivitiesView = function() {
      var view;
      view = new Kandan.Views.PaginatedActivities({
        channel: this.options.channel
      });
      return view.render().el;
    };

    ChannelPane.prototype.chatboxView = function() {
      var view;
      view = new Kandan.Views.Chatbox({
        channel: this.options.channel
      });
      return view.render().el;
    };

    return ChannelPane;

  })(Backbone.View);

}).call(this);
