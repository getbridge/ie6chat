(function() {

  Kandan.Plugins.Pastie = (function() {

    function Pastie() {}

    Pastie.options = {
      maxPreviewLength: 300,
      maxPreviewLines: 4,
      regex: /\n.*\n/i,
      template: _.template('<pre class="pastie">\n  <a target="_blank" class="pastie-link" href="<%= messageLink %>">View pastie</a>\n  <br/><%= preview %>\n</pre>')
    };

    Pastie.truncate = function(content) {
      var originalLength;
      originalLength = content.length;
      if (content.split("\n") > this.options.maxPreviewLines) {
        content = content.split("/n").slice(0, this.options.maxPreviewLines);
      }
      if (content.length > this.options.maxPreviewLines) {
        content = content.substring(0, this.options.maxPreviewLength);
      }
      if (content.length !== originalLength) return "" + content + "...";
      return content;
    };

    Pastie.init = function() {
      var _this = this;
      return Kandan.Modifiers.register(this.options.regex, function(message, state) {
        var url;
        url = "/channels/" + message.channel_id + "/activities/" + message.id;
        message.content = _this.options.template({
          preview: _this.truncate(message.content),
          messageLink: url
        });
        return Kandan.Helpers.Activities.buildFromMessageTemplate(message);
      });
    };

    return Pastie;

  })();

}).call(this);
