(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Kandan.Models.Channel = (function(_super) {

    __extends(Channel, _super);

    function Channel() {
      Channel.__super__.constructor.apply(this, arguments);
    }

    Channel.prototype.urlRoot = '/channels';

    Channel.prototype.parse = function(response) {
      var activities;
      this.moreActivities = false;
      if (response.activities) {
        activities = new Kandan.Collections.Activities([], {
          channel_id: response.id
        });
        activities.add(response.activities);
        this.activities = activities;
        this.moreActivities = response.more_activities;
      }
      return response;
    };

    return Channel;

  })(Backbone.Model);

}).call(this);
