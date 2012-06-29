(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Kandan.Collections.Activities = (function(_super) {

    __extends(Activities, _super);

    function Activities() {
      Activities.__super__.constructor.apply(this, arguments);
    }

    Activities.prototype.url = function() {
      return "channels/" + this.channelId + "/activities";
    };

    Activities.prototype.initialize = function(models, options) {
      return this.channelId = options.channel_id;
    };

    Activities.prototype.parse = function(response) {
      this.moreActivities = response.more_activities;
      return response.activities;
    };

    return Activities;

  })(Backbone.Collection);

}).call(this);
