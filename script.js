document.addEventListener('DOMContentLoaded', function() {
    // Initialize FullCalendar
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: 'data.csv', // Load data from CSV file
        eventDidMount: function(info) {
            // Custom event rendering
            var tooltip = new Tooltip(info.el, {
                title: info.event.extendedProps.Activity,
                placement: 'top',
                trigger: 'hover',
                container: 'body'
            });
        }
    });
    calendar.render();
});
