(function() {

  Kandan.Plugins.YouTubeEmbed = (function() {

    function YouTubeEmbed() {}

    YouTubeEmbed.options = {
      regex: /^http(s)?.+www.youtube.com.+watch/i,
      idRegex: /\Wv=([\w|\-]*)/,
      template: _.template('<div class="youtube-preview">\n  <a target="_blank" class="youtube-preview-link" href="<%= videoUrl %>">\n    <img class="youtube-preview-image" src="<%= thumbUrl %>" />\n  </a>\n  <div class="name"><%= subtitle %></div>\n</div>')
    };

    YouTubeEmbed.init = function() {
      var _this = this;
      return Kandan.Modifiers.register(this.options.regex, function(message, state) {
        var comment, subtitle, thumbUrl, videoId, videoUrl;
        comment = null;
        if (message.content.indexOf(" ") === -1) {
          videoUrl = message.content;
        } else {
          comment = $.trim(message.content.substr(message.content.indexOf(" ") + 1));
          videoUrl = message.content.split(" ")[0];
        }
        videoId = message.content.match(_this.options.idRegex)[1];
        thumbUrl = "http://img.youtube.com/vi/" + videoId + "/0.jpg";
        subtitle = null;
        if ((comment != null) && comment.length > 0) {
          subtitle = "Youtube: " + comment;
        }
        subtitle || (subtitle = videoUrl);
        message.content = _this.options.template({
          videoUrl: videoUrl,
          thumbUrl: thumbUrl,
          subtitle: subtitle
        });
        return Kandan.Helpers.Activities.buildFromMessageTemplate(message);
      });
    };

    return YouTubeEmbed;

  })();

}).call(this);
