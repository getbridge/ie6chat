(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Kandan.Collections.ActiveUsers = (function(_super) {

    __extends(ActiveUsers, _super);

    function ActiveUsers() {
      ActiveUsers.__super__.constructor.apply(this, arguments);
    }

    ActiveUsers.prototype.url = "active_users";

    return ActiveUsers;

  })(Backbone.Collection);

}).call(this);
