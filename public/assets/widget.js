(function() {
  this.JST || (this.JST = {});
  this.JST["widget"] = function(__obj) {
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
      
        __out.push('<div class="widget" id="widget_');
      
        __out.push(__sanitize(this.element_id));
      
        __out.push('">\n  <div class="widget_header">\n    <h3 style="background-image:url(');
      
        __out.push(__sanitize(this.icon_url));
      
        __out.push(');">');
      
        __out.push(__sanitize(this.title));
      
        __out.push('</h3>\n  </div>\n  <div class="widget_content" id="');
      
        __out.push(__sanitize(this.element_id));
      
        __out.push('"></div>\n  <div class="widget_action_bar"></div>\n</div>\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
