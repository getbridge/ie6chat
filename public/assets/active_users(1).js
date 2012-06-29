(function() {

  Kandan.Helpers.ActiveUsers = (function() {

    function ActiveUsers() {}

    ActiveUsers.all = function(options) {
      return $(document).data("active-users");
    };

    ActiveUsers.setFromCollection = function(collection) {
      return $(document).data("active-users", collection.toJSON());
    };

    ActiveUsers.collectionHasCurrentUser = function(collection) {
      var currentUser, user, _i, _len, _ref;
      currentUser = Kandan.Helpers.Users.currentUser();
      _ref = collection.models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        user = _ref[_i];
        if (user.get('id') === currentUser.id) return true;
      }
      return false;
    };

    return ActiveUsers;

  })();

}).call(this);
