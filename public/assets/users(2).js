(function() {

  Kandan.Data.Users = (function() {

    function Users() {}

    Users.currentUser = function() {
      return Kandan.Helpers.Users.currentUser();
    };

    return Users;

  })();

}).call(this);
