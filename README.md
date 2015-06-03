# Semantic - Datepicker

This is a simple datepicker for [Semantic-UI](http://semantic-ui.com). It was initially designed to be used in the backend of [Kiik](https://www.kiik.com.br), a mobile payment app.

Its creates dropdown with date picker that you choose a date between an interval. Also it's possible select a range of date.

## Usage

### Dependencies
This component relies on [Semantic-UI](http://semantic-ui.com), [Moment.js](http://momentjs.com/) and [jQuery](http://jquery.com/).
```
  <link rel="stylesheet" type="text/css" href="./css/semantic/semantic.css">
 
  <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.js"></script>
  <script src="./js/semantic/semantic.js"></script>
  <script src="./js/moment/moment-with-locales.js"></script>
  
  <!-- Semantic DatePicker Files -->
  <link rel="stylesheet" type="text/css" href="./css/semantic-datepicker.css">
  <script src="./js/semantic-calendar.js"></script>
  <script src="./js/semantic-datepicker.js"></script>
  <script src="./js/semantic-daterangepicker.js"></script>  
```

### Calendar

![](http://i.imgur.com/o1vPauf.png)

```
  <!-- HTML part -->
  <table id="calendar"></table>
  
  <script type="text/javascript">
    $(document).ready(function(){
      $("#calendar").semanticCalendar({
        // No options is mandatories
        locale: 'pt-br',
        name: 'calendar',
        minDate: moment().subtract(6, "months"),
        maxDate: moment(),
        selectedDate: moment()
      }).on("semanticCalendar:change", function(e, date){
        // Calendar change event
        console.log(date);
      });
    });
  </script>
```

### Date Picker
![](http://i.imgur.com/K8CrQnZ.png)
```
  <!-- HTML part -->
  <div id="datepicker"></div>
  
  <script type="text/javascript">
    $(document).ready(function(){
      $("#datepicker").semanticDatePicker({
        // No options is mandatories
        locale: 'en',
        name: 'datepicker',
        minDate: moment().subtract(6, "months"),
        maxDate: moment(),
        selectedDate: moment()
      }).on("semanticDatePicker:change", function(e, date){
        // Datepicker change event
        console.log(date);
      });
    });
  </script>
```

### Date Range Picker
![](http://i.imgur.com/HJ7aEoD.png)
```
  <!-- HTML part -->
  <div id="daterangepicker"></div>
  
  <script type="text/javascript">
    $(document).ready(function(){
      $("#daterangepicker").semanticDateRangePicker({
        // No options is mandatories
        locale: 'es',
        startDateName: 'startDate',
        startDate: moment().subtract(10, "days"),
        endDateName: 'endDate',
        endDate: moment(),
        minDate: moment().subtract(6, "months"),
        maxDate: moment()
      }).on("semanticDateRangePicker:change", function(e, startDate, endDate){
        // Daterangepicker change event
        console.log(startDate);
        console.log(endDate);
      });
    });
  </script>
```

## License

It is available under the [MIT license](http://www.opensource.org/licenses/mit-license.php).

--

The MIT License (MIT)

Copyright (c) 2015 Celso Wo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
