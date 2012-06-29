(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Kandan.Collections.Attachments = (function(_super) {

    __extends(Attachments, _super);

    function Attachments() {
      Attachments.__super__.constructor.apply(this, arguments);
    }

    Attachments.prototype.url = function() {
      return "/channels/" + this.channelId + "/attachments";
    };

    Attachments.prototype.initialize = function(models, options) {
      return this.channelId = options.channelId;
    };

    return Attachments;

  })(Backbone.Collection);

}).call(this);
