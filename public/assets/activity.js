(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Kandan.Models.Activity = (function(_super) {

    __extends(Activity, _super);

    function Activity() {
      Activity.__super__.constructor.apply(this, arguments);
    }

    Activity.prototype.url = function() {
      return "channels/" + (this.get('channel_id')) + "/activities";
    };

    return Activity;

  })(Backbone.Model);

}).call(this);
