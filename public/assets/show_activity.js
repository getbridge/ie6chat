(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Kandan.Views.ShowActivity = (function(_super) {

    __extends(ShowActivity, _super);

    function ShowActivity() {
      ShowActivity.__super__.constructor.apply(this, arguments);
    }

    ShowActivity.prototype.tagName = 'div';

    ShowActivity.prototype.className = 'activity';

    ShowActivity.prototype.render = function() {
      var activity, modifiedMessage;
      activity = this.options.activity.toJSON();
      activity.content = _.escape(activity.content);
      if (activity.action !== "message") {
        this.compiledTemplate = JST['user_notification']({
          activity: activity
        });
      } else {
        modifiedMessage = Kandan.Modifiers.process(activity, this.options.state);
        if (modifiedMessage !== false) {
          this.compiledTemplate = modifiedMessage;
        } else {
          this.compiledTemplate = Kandan.Helpers.Activities.buildFromMessageTemplate(activity);
        }
      }
      $(this.el).data("activity-id", activity.id);
      if (activity.action === "message" && activity.user.id === Kandan.Helpers.Users.currentUser().id) {
        $(this.el).addClass("current_user");
      }
      if (activity.id === void 0) {
        $(this.el).attr("id", "activity-c" + activity.cid);
      } else {
        $(this.el).attr("id", "activity-" + activity.id);
      }
      $(this.el).html(this.compiledTemplate);
      $(this.el).find(".posted_at").data("timestamp", activity.created_at);
      return this;
    };

    return ShowActivity;

  })(Backbone.View);

}).call(this);
