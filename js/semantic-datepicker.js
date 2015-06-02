(function($){
  $.fn.semanticDatePicker = function(options){

    // Default options configuration
    var defaultOptions = {
      name: 'date'
    };
    options = $.extend(defaultOptions, typeof options !== 'undefined' ? options : {});

    return this.each(function(index, object) {
      var datepicker = $(object);

      // Update Css
      datepicker.addClass("ui top left pointing labeled icon button");
      datepicker.addClass("semantic-datepicker");

      // Build calendar
      var calendar = $("<table/>").semanticCalendar(options);
      calendar.on("semanticCalendar:change", function(e, date){
        datepicker.find("span.text").html(date.format("L"));
        datepicker.find("input[type='hidden']").val(date.format("L"));
      });

      // Hidden input 
      var input = $("<input type='hidden'/>").attr("name", options.name)
      input.val(calendar.data("semanticCalendar").selectedDate.format("L"));
      datepicker.append(input);

      // Build label
      datepicker.append($("<i class='calendar icon'/>"));
      datepicker.append($("<span class='text'/>").html(
        calendar.data("semanticCalendar").selectedDate.format("L")));

      var dropdownContent = $("<div class='menu' tabindex='-1'/>")
      dropdownContent.append($("<div class='ui segment'/>").append(calendar));
      datepicker.append(dropdownContent);

      datepicker.addClass("dropdown");
      datepicker.dropdown();
    });

  };
}(jQuery));