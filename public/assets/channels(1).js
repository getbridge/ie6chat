(function() {

  Kandan.Helpers.Channels = (function() {

    function Channels() {}

    Channels.options = {
      autoScrollThreshold: 0.90,
      maxActivities: Kandan.options.perPage
    };

    Channels.pastAutoScrollThreshold = function(channelId) {
      var currentPosition, scrollPercentage, totalHeight;
      currentPosition = this.currentScrollPosition(channelId);
      totalHeight = $(document).height() - $(window).height();
      scrollPercentage = currentPosition / totalHeight;
      return scrollPercentage > this.options.autoScrollThreshold;
    };

    Channels.scrollToLatestMessage = function(channelId) {
      return $(document).scrollTop($(document).height() + 9000);
    };

    Channels.currentScrollPosition = function(channelId) {
      return $(document).scrollTop();
    };

    Channels.channelActivitiesEl = function(channelId) {
      return $("#channel-activities-" + channelId);
    };

    Channels.channelPaginationEl = function(channelId) {
      return $("#channels-" + channelId + " .pagination");
    };

    Channels.selectedTab = function() {
      return $("#kandan").tabs("option", "selected");
    };

    Channels.getActiveChannelId = function() {
      if ($(document).data('active-channel-id') === void 0) {
        return $("#kandan .ui-tabs-panel").eq(this.selectedTab()).data("channel-id");
      } else {
        return $(document).data("active-channel-id");
      }
    };

    Channels.confirmDeletion = function() {
      return confirm("Really delete the channel?");
    };

    Channels.flushActivities = function(channelId) {
      var $channelActivities, oldest;
      $channelActivities = $("#channel-activities-" + channelId);
      if ($channelActivities.children().length === this.options.maxActivities + 1) {
        $channelActivities.children().first().remove();
        oldest = $channelActivities.children().first().data("activity-id");
        $channelActivities.prev().data("oldest", oldest);
        return this.channelPaginationEl(channelId).show();
      }
    };

    Channels.confirmAndDeleteChannel = function(channel, tabIndex) {
      var _this = this;
      if (this.confirmDeletion() === false) return false;
      return channel.destroy({
        success: function() {
          return $("#kandan").tabs("remove", tabIndex);
        }
      });
    };

    Channels.getChannelIdByTabIndex = function(tabIndex) {
      return $("#kandan .ui-tabs-panel").eq(tabIndex).data("channel-id");
    };

    Channels.getTabIndexByChannelId = function(channelId) {
      return $("#channels-" + channelId).prevAll("div").length;
    };

    Channels.deleteChannelById = function(channelId) {
      var tabIndex;
      if (this.channelExists(channelId)) {
        tabIndex = this.getTabIndexByChannelId(channelId);
        return this.deleteChannelByTabIndex(tabIndex, true);
      }
    };

    Channels.deleteChannelByTabIndex = function(tabIndex, deleted) {
      var channel, channelId;
      deleted = deleted || false;
      channelId = this.getChannelIdByTabIndex(tabIndex);
      if (channelId === void 0) throw "NO CHANNEL ID";
      channel = new Kandan.Models.Channel({
        id: channelId
      });
      if (!deleted) return this.confirmAndDeleteChannel(channel, tabIndex);
    };

    Channels.channelExists = function(channelId) {
      if ($("#channels-" + channelId).length > 0) return true;
      return false;
    };

    Channels.createChannelArea = function(channel) {
      var $createTab, channelArea, totalTabs, view;
      channelArea = "#channels-" + (channel.get('id'));
      totalTabs = $("#kandan").tabs("length");
      $createTab = $("#create_channel").parents("li").detach();
      $("#kandan").tabs("add", channelArea, "" + (channel.get("name")), totalTabs);
      $createTab.appendTo("ul.ui-tabs-nav");
      view = new Kandan.Views.ChannelPane({
        channel: channel
      });
      view.render($(channelArea));
      return $(channelArea).data("channel_id", channel.get("id"));
    };

    Channels.newActivityView = function(activityAttributes) {
      var activity, activityView;
      activity = new Kandan.Models.Activity(activityAttributes);
      activityView = new Kandan.Views.ShowActivity({
        activity: activity
      });
      return activityView;
    };

    Channels.createChannelIfNotExists = function(activityAttributes) {
      if (activityAttributes.channel && (!this.channelExists(activityAttributes.channel_id))) {
        return this.createChannelArea(new Kandan.Models.Channel(activityAttributes.channel));
      }
    };

    Channels.addActivity = function(activityAttributes, state, local) {
      var channelId;
      local = local || false;
      this.createChannelIfNotExists(activityAttributes);
      if (activityAttributes.channel_id) {
        this.addMessage(activityAttributes, state, local);
      } else {
        this.addNotification(activityAttributes);
      }
      channelId = activityAttributes.channel_id || this.getActiveChannelId();
      if (this.pastAutoScrollThreshold(channelId)) {
        return this.scrollToLatestMessage(channelId);
      }
    };

    Channels.addMessage = function(activityAttributes, state, local) {
      var activityExists, belongsToCurrentUser;
      belongsToCurrentUser = activityAttributes.user.id === Kandan.Data.Users.currentUser().id;
      activityExists = $("#activity-" + activityAttributes.id).length > 0;
      local = local || false;
      console.log(!local, !belongsToCurrentUser, !activityExists);
      if (local || (!local && !belongsToCurrentUser && !activityExists)) {
        this.channelActivitiesEl(activityAttributes.channel_id).append(this.newActivityView(activityAttributes).render().el);
      }
      this.flushActivities(activityAttributes.channel_id);
      if (!local) {
        Kandan.Helpers.Utils.notifyInTitleIfRequired(activityAttributes);
        return this.setPaginationData(activityAttributes.channel_id);
      }
    };

    Channels.addNotification = function(activityAttributes) {
      var $channelElements, el, _i, _len, _results;
      $channelElements = $(".channel-activities");
      activityAttributes["created_at"] = new Date();
      _results = [];
      for (_i = 0, _len = $channelElements.length; _i < _len; _i++) {
        el = $channelElements[_i];
        $(el).append(this.newActivityView(activityAttributes).render().el);
        this.flushActivities($(el).closest(".ui-widget-content").data("channel-id"));
        _results.push(this.setPaginationData(activityAttributes.channel_id));
      }
      return _results;
    };

    Channels.setPaginationState = function(channelId, moreActivities, oldest) {
      this.channelPaginationEl(channelId).data("oldest", oldest);
      console.log("pagination element", moreActivities, this.channelPaginationEl(channelId));
      if (moreActivities === true) {
        return this.channelPaginationEl(channelId).show();
      } else {
        return this.channelPaginationEl(channelId).hide();
      }
    };

    Channels.setPaginationData = function(channelId) {
      var $oldestActivity;
      $oldestActivity = this.channelActivitiesEl(channelId).find(".activity").first();
      if ($oldestActivity.length !== 0) {
        return this.channelPaginationEl(channelId).data("oldest", $oldestActivity.data("activity-id"));
      }
    };

    return Channels;

  })();

}).call(this);
