(function($){

  $.fn.semanticCalendar = function(options){

    // Default options configuration
    var defaultOptions = {
      locale: 'en',
      minDate: moment().subtract(6, 'months'),
      maxDate: moment(),
      selectedDate: moment()
    };
    options = $.extend(defaultOptions, options);

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
      
      var tbody = object.find("tbody");
      tbody.empty();

      // Build days
      var tr = $("<tr/>");
      for(; start.isBefore(end); start.add(1, 'days')){
        var td = $("<td/>").html(start.date()).data('date', start.clone());

        td.on('click', object, function(e){
          // Update Css
          $(this).parents('tbody').find('td.selected').removeClass('selected');
          $(this).addClass('selected');

          // Trigger change event and update selectedDate
          var calendar = e.data;
          var date = $(this).data('date');
          calendar.data('semanticCalendar').selectedDate = date;

          calendar.trigger("semanticCalendar:change", [date.clone()]);
        });

        // Update Css
        if(start.month() == data.baseDate.month()){
          td.addClass("current-month");
        }

        if(start.isAfter(data.now, 'day')){
          td.addClass("disabled");
        }else if(start.isSame(data.selectedDate, 'day')){
          td.addClass("selected");
        }

        tr.append(td);
        if(tr.children().length == 7){
          tbody.append(tr);
          tr = $("<tr/>");
        }
      }

      // Add the last line
      if(tr.children().length > 0){
        tbody.append(tr);
      }

      // Update labels
      object.find("span.current-month").html(data.baseDate.locale(data.options.locale).format('MMMM'));
      object.find("span.current-year").html(data.baseDate.locale(data.options.locale).format('YYYY'));

      // Update buttons
      object.find(".button.previous-month").toggleClass("disabled", data.baseDate.isSame(data.options.minDate, "month"));
      object.find(".button.next-month").toggleClass("disabled", data.baseDate.isSame(data.options.maxDate, "month"));
    };

    return this.each(function(index, object){
      // Update selected date locale
      options.selectedDate.locale(options.locale);

      // Create data
      var data = {};
      data.now = moment();
      data.baseDate = options.selectedDate.clone();
      data.selectedDate = options.selectedDate.clone();
      data.options = options;
      
      // Ajusting css and storing data
      var calendar = $(object);
      calendar.data('semanticCalendar', data);
      calendar.addClass("ui compact collapsing table semantic-calendar");

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
      calendar.append($("<tbody/>"));

      loadCalendar(calendar);
    });
  };

}(jQuery));