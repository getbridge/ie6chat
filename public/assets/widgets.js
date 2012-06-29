(function() {

  Kandan.Widgets = (function() {

    function Widgets() {}

    Widgets.template = JST['widget'];

    Widgets.widgets = {};

    Widgets.register = function(widgetNamespace) {
      return this.widgets[widgetNamespace] = "widget_" + (Object.size(this.widgets));
    };

    Widgets.all = function() {
      return this.widgets;
    };

    Widgets.initAll = function() {
      var widgetNamespace, _results;
      _results = [];
      for (widgetNamespace in this.widgets) {
        _results.push(this.init(widgetNamespace));
      }
      return _results;
    };

    Widgets.init = function(widgetNamespace) {
      var widget;
      widget = eval(widgetNamespace);
      $(".sidebar .widgets").append(this.template({
        element_id: this.widgets[widgetNamespace],
        title: widget.widget_title,
        icon_url: widget.widget_icon_url
      }));
      return this.render(widgetNamespace);
    };

    Widgets.render = function(widgetNamespace) {
      var $widgetEl;
      $widgetEl = $("#" + this.widgets[widgetNamespace]);
      if ($widgetEl !== []) return eval(widgetNamespace).render($widgetEl);
    };

    return Widgets;

  })();

}).call(this);
