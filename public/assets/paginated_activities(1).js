(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Kandan.Views.PaginatedActivities = (function(_super) {

    __extends(PaginatedActivities, _super);

    function PaginatedActivities() {
      PaginatedActivities.__super__.constructor.apply(this, arguments);
    }

    PaginatedActivities.prototype.tagName = 'div';

    PaginatedActivities.prototype.className = 'paginated-activities';

    PaginatedActivities.prototype.template = JST['paginated_activities'];

    PaginatedActivities.prototype.events = {
      "click .pagination": "loadMoreActivities"
    };

    PaginatedActivities.prototype.setPagination = function() {
      var oldestActivityId;
      oldestActivityId = 0;
      if (this.channel.activities && this.channel.activities.models.length > 0) {
        oldestActivityId = _.first(this.channel.activities.models).get("id");
      }
      return $(this.el).find(".pagination").data("oldest", oldestActivityId);
    };

    PaginatedActivities.prototype.render = function() {
      var listActivitiesView;
      this.channel = this.options.channel;
      $(this.el).html(this.template());
      this.setPagination();
      if (this.channel.moreActivities !== true) {
        $(this.el).find(".pagination").hide();
      }
      listActivitiesView = new Kandan.Views.ListActivities({
        channel: this.channel
      });
      $(this.el).append(listActivitiesView.render().el);
      return this;
    };

    PaginatedActivities.prototype.loadMoreActivities = function() {
      var activities, oldest,
        _this = this;
      oldest = $(this.el).find(".pagination").data("oldest");
      activities = new Kandan.Collections.Activities([], {
        channel_id: this.channel.get("id")
      });
      return activities.fetch({
        data: {
          oldest: oldest
        },
        success: function(collection) {
          var activity, activityView, _i, _len, _ref;
          _ref = collection.models.reverse();
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            activity = _ref[_i];
            activityView = new Kandan.Views.ShowActivity({
              activity: activity
            });
            $(_this.el).find(".channel-activities").prepend(activityView.render().el);
          }
          return Kandan.Helpers.Channels.setPaginationState(collection.channelId, collection.moreActivities, _.last(collection.models).get("id"));
        }
      });
    };

    return PaginatedActivities;

  })(Backbone.View);

}).call(this);
