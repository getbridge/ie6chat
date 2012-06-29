(function() {

  Kandan.Plugins.ImageEmbed = (function() {

    function ImageEmbed() {}

    ImageEmbed.options = {
      regex: /http.*\.(jpg|jpeg|gif|png)/i,
      template: _.template('<div class="image-preview">\n  <a target="_blank" href="<%= imageUrl %>">\n    <img class="image-embed" src="<%= imageUrl %>" />\n  </a>\n  <div class="name"><%= subtitle %></div>\n</div>')
    };

    ImageEmbed.init = function() {
      var _this = this;
      return Kandan.Modifiers.register(this.options.regex, function(message, state) {
        var comment, fileName, subtitle, url;
        url = message.content.match(_this.options.regex)[0];
        fileName = url.split("/").pop();
        comment = $.trim(message.content.split(url).join(""));
        subtitle = null;
        if (comment.length > 0) subtitle = comment;
        subtitle || (subtitle = fileName);
        message.content = _this.options.template({
          imageUrl: url,
          subtitle: subtitle
        });
        return Kandan.Helpers.Activities.buildFromMessageTemplate(message);
      });
    };

    return ImageEmbed;

  })();

}).call(this);
