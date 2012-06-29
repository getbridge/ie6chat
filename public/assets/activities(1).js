(function() {

  Kandan.Helpers.Activities = (function() {

    function Activities() {}

    Activities.ACTIVE_STATE = "ACTIVE";

    Activities.HISTORY_STATE = "HISTORY";

    Activities.buildFromBaseTemplate = function(activity) {
      return JST['activity_base']({
        activity: activity
      });
    };

    Activities.buildFromMessageTemplate = function(activity) {
      return JST['message']({
        activity: activity
      });
    };

    return Activities;

  })();

}).call(this);
