(function() {

  Kandan.Plugins.MeAnnounce = (function() {

    function MeAnnounce() {}

    MeAnnounce.options = {
      regex: /^&#x2F;me /
    };

    MeAnnounce.init = function() {
      var _this = this;
      return Kandan.Modifiers.register(this.options.regex, function(message, state) {
        var actor;
        actor = message.user.first_name || message.user.email;
        message.content = message.content.replace(_this.options.regex, "" + actor + " ");
        return Kandan.Helpers.Activities.buildFromBaseTemplate(message);
      });
    };

    return MeAnnounce;

  })();

}).call(this);
