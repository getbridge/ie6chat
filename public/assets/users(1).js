(function() {

  Kandan.Helpers.Users = (function() {

    function Users() {}

    Users.currentUser = function() {
      return $.data(document, 'current-user');
    };

    return Users;

  })();

}).call(this);
