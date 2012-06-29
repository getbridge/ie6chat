(function() {

  Kandan.Plugins.Emoticons = (function() {

    function Emoticons() {}

    Emoticons.options = {
      regex: /\([a-zA-Z]+\)/g,
      template: _.template('<img class="emoticon-embed" src="/assets/emoticons/<%= emoticon %>" title="<%= title %>" height="40" width="40" />')
    };

    Emoticons.emoticons = {
      "(alone)": "alone.jpg",
      "(awwyea)": "awwyea.jpg",
      "(badass)": "badass.png",
      "(bitchplease)": "bitchplease.jpg",
      "(cereal)": "cereal.jpg",
      "(challenge)": "challenge.jpg",
      "(fuckyeah)": "fuckyeah.jpg",
      "(gtfo)": "seriously.jpg",
      "(ilied)": "ilied.jpg",
      "(megusta)": "megusta.jpg",
      "(notbad)": "notbad.jpg",
      "(okay)": "okay.jpg",
      "(omgface)": "omgface.jpg",
      "(pokerface)": "pokerface.jpg",
      "(problem)": "trollface.jpg",
      "(rageguy)": "rageguy.jpg",
      "(seriously)": "seriously.jpg",
      "(sweetjesus)": "sweetjesus.jpg",
      "(trollface)": "trollface.jpg",
      "(truestory)": "truestory.png",
      "(youdontsay)": "youdontsay.png",
      "(yuno)": "yuno.jpg"
    };

    Emoticons.init = function() {
      var _this = this;
      return Kandan.Modifiers.register(this.options.regex, function(message, state) {
        var emoticon, match, matches, needle, replacement, search, title, _i, _len, _ref;
        matches = message.content.match(_this.options.regex);
        _ref = _.unique(matches);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          match = _ref[_i];
          emoticon = _this.emoticons[match];
          title = match.replace(/\(|\)/g, "");
          needle = match.replace('(', '\\(').replace(')', '\\)');
          search = new RegExp(needle, 'g');
          replacement = _this.options.template({
            emoticon: emoticon,
            title: title
          });
          if (emoticon) {
            message.content = message.content.replace(search, replacement);
          }
        }
        return Kandan.Helpers.Activities.buildFromMessageTemplate(message);
      });
    };

    return Emoticons;

  })();

}).call(this);
