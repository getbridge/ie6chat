(function() {

  Kandan.Plugins.LinkEmbed = (function() {

    function LinkEmbed() {}

    LinkEmbed.options = {
      regex: /(http?\S*)/g
    };

    LinkEmbed.init = function() {
      var _this = this;
      return Kandan.Modifiers.register(this.options.regex, function(message, state) {
        message.content = message.content.replace(_this.options.regex, '<a target="_blank" href="$1">$1</a>');
        return Kandan.Helpers.Activities.buildFromMessageTemplate(message);
      });
    };

    return LinkEmbed;

  })();

}).call(this);
