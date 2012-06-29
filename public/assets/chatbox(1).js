(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Kandan.Views.Chatbox = (function(_super) {

    __extends(Chatbox, _super);

    function Chatbox() {
      Chatbox.__super__.constructor.apply(this, arguments);
    }

    Chatbox.prototype.template = JST['chatbox'];

    Chatbox.prototype.tagName = 'div';

    Chatbox.prototype.className = 'chatbox';

    Chatbox.prototype.events = {
      "keypress .chat-input": 'postMessageOnEnter',
      "click    .post": 'postMessage'
    };

    Chatbox.prototype.postMessageOnEnter = function(event) {
      if (event.keyCode === 13) {
        this.postMessage(event);
        return event.preventDefault();
      }
    };

    Chatbox.prototype.postMessage = function(event) {
      var $chatbox, activity, chatInput;
      $chatbox = $(event.target).parent().find(".chat-input");
      chatInput = $chatbox.val();
      if (chatInput.trim().length === 0) return false;
      activity = new Kandan.Models.Activity({
        'content': chatInput,
        'action': 'message',
        'channel_id': this.channel.get('id')
      });
      $chatbox.val("");
      Kandan.Helpers.Channels.addActivity(_.extend(activity.toJSON(), {
        cid: activity.cid,
        user: Kandan.Data.Users.currentUser()
      }, {
        created_at: new Date()
      }), Kandan.Helpers.Activities.ACTIVE_STATE, true);
      return activity.save({}, {
        success: function(model, response) {
          return $("#activity-c" + model.cid).attr("id", "activity-" + (model.get('id')));
        }
      });
    };

    Chatbox.prototype.render = function() {
      this.channel = this.options.channel;
      $(this.el).html(this.template());
      return this;
    };

    return Chatbox;

  })(Backbone.View);

}).call(this);
