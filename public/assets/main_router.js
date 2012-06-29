(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Kandan.Routers.Main = (function(_super) {

    __extends(Main, _super);

    function Main() {
      Main.__super__.constructor.apply(this, arguments);
    }

    Main.prototype.routes = {
      '': 'index'
    };

    Main.prototype.index = function() {
      var view;
      view = new Kandan.Views.ChatArea();
      $('.main-area').html(view.render().el);
      return $('.channels').tabs();
    };

    return Main;

  })(Backbone.Router);

}).call(this);
