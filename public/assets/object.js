(function() {

  Object.size = function(obj) {
    var key, size;
    size = 0;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

}).call(this);
