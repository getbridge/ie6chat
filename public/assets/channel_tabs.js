(function() {
  this.JST || (this.JST = {});
  this.JST["channel_tabs"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        var channel, _i, _len, _ref;
      
        _ref = this.channels.models;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          channel = _ref[_i];
          __out.push('\n  <li>\n  <a href="#');
          __out.push(__sanitize("channels-" + (channel.get('id'))));
          __out.push('"  class="show_channel" >\n    <span class="tab_right"></span>\n    <span class="tab_left"></span>\n    <span class="tab_content">\t\n      <cite>');
          __out.push(__sanitize(channel.get('name')));
          __out.push('</cite>\n      <cite class="close_channel" title="close channel">x</cite>\n    </span>\n  </a>\t\n  </li>\n');
        }
      
        __out.push('\n');
      
        __out.push(JST['create_channel']());
      
        __out.push('\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
