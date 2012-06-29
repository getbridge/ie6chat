(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Kandan.Collections.Channels = (function(_super) {

    __extends(Channels, _super);

    function Channels() {
      Channels.__super__.constructor.apply(this, arguments);
    }

    Channels.prototype.model = Kandan.Models.Channel;

    Channels.prototype.url = '/channels';

    return Channels;

  })(Backbone.Collection);

}).call(this);
