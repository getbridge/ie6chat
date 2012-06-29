(function() {

  Kandan.Helpers.Utils = (function() {

    function Utils() {}

    Utils.unreadActivities = 0;

    Utils.browserTabFocused = true;

    Utils.notifyInTitleIfRequired = function(activityAttributes) {
      console.log(activityAttributes);
      if (Kandan.Data.Channels.activeChannelId() === activityAttributes.channel_id && activityAttributes.action === "message" && this.browserTabFocused !== true) {
        Kandan.Plugins.MusicPlayer.playAudioNotice();
        this.unreadActivities += 1;
        return $(document).attr('title', "(" + this.unreadActivities + ") Kandan");
      }
    };

    Utils.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    Utils.resetUnreadActivities = function() {
      return this.unreadActivities = 0;
    };

    Utils.unescape = function(string) {
      return string.replace(/&#x2F;/g, "/");
    };

    return Utils;

  })();

}).call(this);
