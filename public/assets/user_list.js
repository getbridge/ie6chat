(function() {

  Kandan.Plugins.UserList = (function() {

    function UserList() {}

    UserList.widget_title = "People";

    UserList.widget_icon_url = "/assets/people_icon.png";

    UserList.pluginNamespace = "Kandan.Plugins.UserList";

    UserList.template = _.template('<div class="user clearfix">\n  <img class="avatar" src="http://gravatar.com/avatar/<%= gravatarHash %>?s=25&d=https://cloudfuji.com/images/profile.png"/>\n  <span class="name"><%= name %></span>\n</div>');

    UserList.render = function($el) {
      var $users, displayName, user, _i, _len, _ref;
      $users = $("<div class='user_list'></div>");
      $el.next().hide();
      _ref = Kandan.Data.ActiveUsers.all();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        user = _ref[_i];
        displayName = null;
        if (user.first_name != null) {
          displayName = "" + user.first_name + " " + user.last_name;
        }
        displayName || (displayName = user.email);
        $users.append(this.template({
          name: displayName,
          gravatarHash: user.gravatar_hash
        }));
      }
      return $el.html($users);
    };

    UserList.init = function() {
      var _this = this;
      Kandan.Widgets.register(this.pluginNamespace);
      return Kandan.Data.ActiveUsers.registerCallback("change", function() {
        return Kandan.Widgets.render(_this.pluginNamespace);
      });
    };

    return UserList;

  })();

}).call(this);
