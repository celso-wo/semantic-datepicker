(function($){
  $.fn.semanticDateRangePicker = function(options){

    // Default options configuration
    var defaultOptions = {
      endDateName: 'endDate',
      startDateName: 'startDate',
      startDate: moment(),
      endDate: moment()
    };
    options = $.extend(defaultOptions, typeof options !== 'undefined' ? options : {});

    return this.each(function(index, object) {
      var datepicker = $(object);

      // Update Css
      datepicker.addClass("ui top left pointing labeled icon button");
      datepicker.addClass("semantic-daterangepicker");

      // Build calendar
      // Left calendar
      var leftCalendar = $("<table/>").semanticCalendar($.extend(options,{
        name: options.startDateName,
        selectedDate: options.startDate,
        highlight:{
          startDate: options.startDate,
          endDate: options.endDate
        }
      }));
      leftCalendar.on("semanticCalendar:change", datepicker, function(e, date){
        var data = {};

        if(rightCalendar.data("semanticCalendar").selectedDate.isAfter(date, "day")){
          data.highlight = {
            startDate: date,
            endDate: rightCalendar.data("semanticCalendar").selectedDate
          }
        }
        leftCalendar.trigger("semanticCalendar:updateDate", data);
        rightCalendar.trigger("semanticCalendar:updateDate", data);

        datepicker.find("span.left-calendar-label").html(date.format("L"));
        datepicker.trigger("semanticDateRangePicker:change", [date, rightCalendar.data("semanticCalendar").selectedDate]);
      });

      // Right calendar
      var rightCalendar = $("<table/>").semanticCalendar($.extend(options,{
        name: options.endDateName,
        selectedDate: options.endDate,
        highlight:{
          startDate: options.startDate,
          endDate: options.endDate
        }
      }));
      rightCalendar.on("semanticCalendar:change", datepicker, function(e, date){
        var data = {maxDate: date};

        if(leftCalendar.data("semanticCalendar").selectedDate.isAfter(date, "day")){
          data.selectedDate = date;
        }else{
          data.highlight = {
            startDate: leftCalendar.data("semanticCalendar").selectedDate,
            endDate: date
          }
        }

        leftCalendar.trigger("semanticCalendar:updateDate", data);
        rightCalendar.trigger("semanticCalendar:updateDate",{highlight: data.highlight});

        datepicker.find("span.right-calendar-label").html(date.format("L"));
        datepicker.trigger("semanticDateRangePicker:change", [leftCalendar.data("semanticCalendar").selectedDate, date]);
      });

      // Divider
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

      // Dropdown
      var dropdownContent = $("<div class='menu' tabindex='-1'/>")
      dropdownContent.append($("<div class='ui segment'/>").append(divider));
      datepicker.append(dropdownContent);

      datepicker.addClass("dropdown");
      datepicker.dropdown();
    });

  };
}(jQuery));