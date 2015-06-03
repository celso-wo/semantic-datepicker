(function($){

  var loadCalendar = function(object, monthDiff){
      
    var data = object.data('semanticCalendar');

    // Update month
    data.baseDate.add(monthDiff, 'months');

    // Calculate the visible period
    var start = data.baseDate.clone().startOf('month').hour(12);
    start.subtract(start.day() == 0 ? 7 : start.day(), 'days');
    start.locale(data.options.locale);

    var end = data.baseDate.clone().endOf('month').hour(12);
    end.day(6);
    end.add((6 * 7 - 1) - end.diff(start, 'days'), 'days');
    end.locale(data.options.locale);
    
    var trs = object.find("tbody tr");

    // Build days
    for(var i = 0; start.isBefore(end); start.add(1, 'days'), i++){
      var tr = $(trs[parseInt(i / 7)]);
      var td = $(tr.children("td")[i % 7]);

      td.html(start.date()).data('date', start.clone());

      // Update Css
      td.removeClass();
      td.toggleClass("current-month", start.month() == data.baseDate.month());

      if(start.isAfter(data.options.maxDate, "day")){
        td.addClass("disabled");
      }else if(start.isSame(data.selectedDate, "day")){
        td.addClass("selected");
      }else if(data.highlight && (start.isBetween(data.highlight.startDate, data.highlight.endDate, "day") || start.isSame(data.highlight.endDate, "day") || start.isSame(data.highlight.startDate, "day"))){
        td.addClass("highlight");
      }
    }

    // Update labels
    object.find("span.current-month").html(data.baseDate.locale(data.options.locale).format('MMMM'));
    object.find("span.current-year").html(data.baseDate.locale(data.options.locale).format('YYYY'));

    // Update buttons
    object.find(".button.previous-month").toggleClass("disabled", data.baseDate.isSame(data.options.minDate, "month"));
    object.find(".button.next-month").toggleClass("disabled", data.baseDate.isSame(data.options.maxDate, "month"));
  };

  $.fn.semanticCalendar = function(options){

    // Default options configuration
    var defaultOptions = {
      locale: 'en',
      name: 'calendar',
      minDate: moment().subtract(6, 'months'),
      maxDate: moment(),
      selectedDate: moment()
    };
    options = $.extend(defaultOptions, options);

    return this.each(function(index, object){
      // Update selected date locale
      options.selectedDate.locale(options.locale);

      // Create data
      var data = {options: options};
      data.baseDate = options.selectedDate.clone();
      data.highlight = options.highlight;

      if(options.selectedDate.isAfter(options.maxDate)){
        data.selectedDate = options.maxDate.locale(options.locale).clone();
      }else{
        data.selectedDate = options.selectedDate.clone();
      }
      
      // Ajusting css and storing data
      var calendar = $(object);
      calendar.data('semanticCalendar', data);
      calendar.addClass("ui compact collapsing table semantic-calendar");

      // Input
      var input = $("<input type='hidden'/>").attr("name", options.name)
      input.val(data.selectedDate.format("L"));
      calendar.append(input);

      // Thead
      var thead = $("<thead/>");
      calendar.append(thead);

      // Navigator
      var navigatorTr = $("<tr/>");
      thead.append(navigatorTr);

      // Previous month button
      var previousMonthButton = $("<div class='ui compact icon button previous-month'><i class='left arrow icon'></i></div>");
      previousMonthButton.on('click', calendar, function(e){
        loadCalendar(e.data, -1);
      });
      navigatorTr.append($("<th style='padding:0'/>").append(previousMonthButton));

      // Navigator's labels
      navigatorTr.append($("<th colspan='3'/>").append($("<span class='current-month'/>")));
      navigatorTr.append($("<th colspan='2'/>").append($("<span class='current-year'/>")));

      // Next month button
      var nextMonthButton = $("<div class='ui compact icon button next-month'><i class='right arrow icon'></i></div>");
      nextMonthButton.on('click', calendar, function(e){
        loadCalendar(e.data, 1);
      });
      navigatorTr.append($("<th style='padding:0'/>").append(nextMonthButton));

      // WeekDays
      var weekDaysTr = $("<tr/>");
      thead.append(weekDaysTr);

      // Load WeekDays from locale
      moment.locale(options.locale);
      var weekDays = moment.weekdaysShort();
      for(var i = 0; i < weekDays.length; i++){
        weekDaysTr.append($("<th/>").html(weekDays[i]));
      }

      // Tbody
      var tbody = $("<tbody/>");
      for(var i = 0; i < 6; i++){
        var tr = $("<tr/>");

        for(var j = 0; j < 7; j++){
          var td = $("<td/>");

          td.on('click', calendar, function(e){
            // Update Css
            $(this).parents('tbody').find('td.selected').removeClass('selected');
            $(this).addClass('selected');

            // Trigger change event and update selectedDate
            var calendar = e.data;
            var date = $(this).data('date');
            calendar.data('semanticCalendar').selectedDate = date;

            calendar.find("input[type='hidden']").val(date.format("L"));
            calendar.trigger("semanticCalendar:change", [date.clone()]);
          });

          tr.append(td);
        }
        tbody.append(tr);
      }
      calendar.append(tbody);

      // Events
      calendar.on("semanticCalendar:updateDate", calendar, function(e, eventData){
        var calendar = e.data;
        var data = calendar.data("semanticCalendar");

        if(eventData.minDate){
          data.options.minDate = eventData.minDate.clone();
        }

        if(eventData.maxDate){
          data.options.maxDate = eventData.maxDate.clone();
        }

        if(eventData.selectedDate){
          data.baseDate = eventData.selectedDate.clone();
          data.selectedDate = eventData.selectedDate.clone();

          calendar.find("input[type='hidden']").val(eventData.selectedDate.format("L"));
          calendar.trigger("semanticCalendar:change", [eventData.selectedDate.clone()]);
        }

        data.highlight = eventData.highlight;

        loadCalendar(calendar, 0);
      });

      loadCalendar(calendar, 0);
    });
  };

}(jQuery));