(function() {
  var _this = this;

  window.Kandan = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    Helpers: {},
    Broadcasters: {},
    Data: {},
    Plugins: {},
    options: {
      broadcaster: "Faye",
      perPage: 30,
      nowThreshold: 3000,
      timestampRefreshInterval: 2000
    },
    registerPlugins: function() {
      var plugin, plugins, _i, _len, _results;
      plugins = ["UserList", "MusicPlayer", "YouTubeEmbed", "ImageEmbed", "LinkEmbed", "Pastie", "Attachments", "MeAnnounce", "Emoticons"];
      _results = [];
      for (_i = 0, _len = plugins.length; _i < _len; _i++) {
        plugin = plugins[_i];
        _results.push(Kandan.Plugins.register("Kandan.Plugins." + plugin));
      }
      return _results;
    },
    registerAppEvents: function() {
      Kandan.Data.ActiveUsers.registerCallback("change", function(data) {
        return Kandan.Helpers.Channels.addActivity({
          user: data.entity,
          action: data.event.split("#")[1]
        });
      });
      $(window).focus(function() {
        Kandan.Helpers.Utils.browserTabFocused = true;
        Kandan.Helpers.Utils.resetUnreadActivities();
        return $(document).attr('title', 'Kandan');
      });
      return $(window).blur(function() {
        return Kandan.Helpers.Utils.browserTabFocused = false;
      });
    },
    initBroadcasterAndSubscribe: function() {
      Kandan.broadcaster = eval("new Kandan.Broadcasters." + this.options.broadcaster + "Broadcaster()");
      Kandan.broadcaster.subscribe("/channels/*");
      return this.registerAppEvents();
    },
    initTabs: function() {
      $('#kandan').tabs({
        select: function(event, ui) {
          $(document).data('active-channel-id', Kandan.Helpers.Channels.getChannelIdByTabIndex(ui.index));
          return Kandan.Data.Channels.runCallbacks('change');
        },
        add: function(event, ui) {
          $('.header .ui-tabs-panel:last').detach().appendTo('#channels');
          $('#kandan').tabs('option', 'disabled', []);
          return $('.header ul a').delegate('cite.close_channel', 'click', window.tabViewGlobal.deleteChannel);
        }
      });
      return $("#kandan").tabs('option', 'tabTemplate', '<li>\n  <a href="#{href}" class="show_channel">\n    <span class="tab_right"></span>\n    <span class="tab_left"></span>\n    <span class="tab_content">\n      <cite>#{label}</cite>\n      <cite class="close_channel" title="close channel">x</cite>\n    </span>\n  </a>\n</li>');
    },
    initChatArea: function(channels) {
      var chatArea;
      chatArea = new Kandan.Views.ChatArea({
        channels: channels
      });
      $(".main-area").append(chatArea.render().el);
      return $(document).scrollTop($(document).height() + 9000);
    },
    onFetchActiveUsers: function(channels) {
      return function(activeUsers) {
        if (!Kandan.Helpers.ActiveUsers.collectionHasCurrentUser(activeUsers)) {
          activeUsers.add([Kandan.Helpers.Users.currentUser()]);
        }
        Kandan.Helpers.ActiveUsers.setFromCollection(activeUsers);
        Kandan.registerPlugins();
        Kandan.Plugins.initAll();
        Kandan.initChatArea(channels);
        Kandan.initTabs();
        return Kandan.Widgets.initAll();
      };
    },
    setCurrentUser: function() {
      var currentUser, displayName, template;
      template = JST['current_user'];
      currentUser = Kandan.Helpers.Users.currentUser();
      if (currentUser.first_name != null) {
        displayName = "" + currentUser.first_name + " " + currentUser.last_name;
      }
      displayName || (displayName = currentUser.email);
      return $(".header .user").html(template({
        gravatarHash: currentUser.gravatar_hash,
        name: displayName
      }));
    },
    registerUtilityEvents: function() {
      var _this = this;
      window.setInterval(function() {
        var el, _i, _len, _ref, _results;
        _ref = $(".posted_at");
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          el = _ref[_i];
          _results.push($(el).text((new Date($(el).data("timestamp"))).toRelativeTime(_this.options.nowThreshold)));
        }
        return _results;
      }, this.options.timestampRefreshInterval);
      return $(".user_menu_link").click(function(e) {
        e.preventDefault();
        $(".user_menu").toggle();
        return false;
      });
    },
    init: function() {
      var channels,
        _this = this;
      this.setCurrentUser();
      channels = new Kandan.Collections.Channels();
      channels.fetch({
        success: function(channelsCollection) {
          var activeUsers;
          _this.initBroadcasterAndSubscribe();
          activeUsers = new Kandan.Collections.ActiveUsers();
          return activeUsers.fetch({
            success: _this.onFetchActiveUsers(channelsCollection)
          });
        }
      });
      return this.registerUtilityEvents();
    }
  };

}).call(this);
