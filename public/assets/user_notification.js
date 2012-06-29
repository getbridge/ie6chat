(function() {
  this.JST || (this.JST = {});
  this.JST["user_notification"] = function(__obj) {
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
      
        __out.push('<span class="posted_at">\n  ');
      
        __out.push(__sanitize(new Date(this.activity.created_at).toRelativeTime(Kandan.options.nowThreshold)));
      
        __out.push('\n</span>\n<img class="avatar" src="http://gravatar.com/avatar/');
      
        __out.push(__sanitize(this.activity.user.gravatar_hash));
      
        __out.push('?s=30&d=https://cloudfuji.com/images/profile.png"/>\n\n<div class="readable">\n  <span class="user">Kandan bot</span>\n\n  <span class="content">\n    ');
      
        __out.push(__sanitize(this.activity.user.first_name || this.activity.user.email));
      
        __out.push(' ');
      
        __out.push(__sanitize(this.activity.action));
      
        __out.push('ed ');
      
        if (this.activity.action === "upload") {
          __out.push("<a href='" + this.activity.content + "'>" + this.activity.content + "</a>");
        }
      
        __out.push('\n  </span>\n</div>\n\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
