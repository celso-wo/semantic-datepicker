(function($){
  $.fn.semanticDateRangePicker = function(options){

    // Default options configuration
    var defaultOptions = {
    };
    options = $.extend(defaultOptions, typeof options !== 'undefined' ? options : {});

    return this.each(function(index, object) {
      var datepicker = $(object);

      // Update Css
      datepicker.addClass("ui top left pointing labeled icon button");
      datepicker.addClass("semantic-daterangepicker");

      // Build calendar
      var leftCalendar = $("<table/>").semanticCalendar(options);
      leftCalendar.on("semanticCalendar:change", function(e, date){
        datepicker.find("span.left-calendar-label").html(date.format("L"));
      });

      var rightCalendar = $("<table/>").semanticCalendar(options);
      rightCalendar.on("semanticCalendar:change", function(e, date){
        datepicker.find("span.right-calendar-label").html(date.format("L"));
      });

      var divider = $("<div class='ui two column middle aligned relaxed fitted stackable grid'/>");
      divider.append($("<div class='column'/>").append(leftCalendar));
      divider.append($("<div class='ui vertical divider'><i class='calendar icon'></i></div>"));
      divider.append($("<div class='column'/>").append(rightCalendar));

      // Build label
      datepicker.append($("<i class='calendar icon'/>"));
      datepicker.append($("<span class='text left-calendar-label'/>").html(
        leftCalendar.data("semanticCalendar").selectedDate.format("L"))
      );
      datepicker.append($("<span class='text'>&nbsp;-&nbsp;</span>"));
      datepicker.append($("<span class='text right-calendar-label'/>").html(
        rightCalendar.data("semanticCalendar").selectedDate.format("L"))
      );

      var dropdownContent = $("<div class='menu' tabindex='-1'/>")
      dropdownContent.append($("<div class='ui segment'/>").append(divider));
      datepicker.append(dropdownContent);

      datepicker.addClass("dropdown");
      datepicker.dropdown();
    });

  };
}(jQuery));