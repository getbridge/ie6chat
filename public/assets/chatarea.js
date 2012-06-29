(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Kandan.Views.ChatArea = (function(_super) {

    __extends(ChatArea, _super);

    function ChatArea() {
      ChatArea.__super__.constructor.apply(this, arguments);
    }

    ChatArea.prototype.render = function() {
      var channel, tabView, view, _i, _len, _ref;
      tabView = new Kandan.Views.ChannelTabs({
        channels: this.options.channels
      });
      window.tabViewGlobal = tabView;
      $('.header .logo').after(tabView.render().el);
      $('#create_channel').click(tabView.createChannel);
      $('.header ul a').delegate('cite.close_channel', 'click', tabView.deleteChannel);
      _ref = this.options.channels.models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        channel = _ref[_i];
        view = new Kandan.Views.ChannelPane({
          channel: channel
        });
        $(this.el).append(view.render().el);
      }
      $(this.el).attr('id', 'channels');
      return this;
    };

    return ChatArea;

  })(Backbone.View);

}).call(this);
