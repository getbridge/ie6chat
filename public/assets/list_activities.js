(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Kandan.Views.ListActivities = (function(_super) {

    __extends(ListActivities, _super);

    function ListActivities() {
      ListActivities.__super__.constructor.apply(this, arguments);
    }

    ListActivities.prototype.tagName = 'div';

    ListActivities.prototype.className = 'channel-activities';

    ListActivities.prototype.render = function() {
      var activity, activityView, oldest, _i, _len, _ref;
      this.channel = this.options.channel;
      $(this.el).attr('id', "channel-activities-" + (this.channel.get('id')));
      oldest = 0;
      if (this.channel.activities) {
        _ref = this.channel.activities.models;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          activity = _ref[_i];
          activityView = new Kandan.Views.ShowActivity({
            activity: activity,
            state: Kandan.Helpers.Activities.HISTORY_STATE
          });
          $(this.el).append(activityView.render().el);
        }
      }
      return this;
    };

    return ListActivities;

  })(Backbone.View);

}).call(this);
