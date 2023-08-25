document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: [], // Initialize with an empty array
    });
    calendar.render();

    // Add event button click handler
    var addButton = document.getElementById('add-button');
    addButton.addEventListener('click', function() {
        var eventName = document.getElementById('event-name').value;
        var eventDate = document.getElementById('event-date').value;

        if (eventName && eventDate) {
            // Add the event to the calendar
            calendar.addEvent({
                title: eventName,
                start: eventDate
            });

            // Clear input fields
            document.getElementById('event-name').value = '';
            document.getElementById('event-date').value = '';

            // Save events to CSV (simplified; this would be more complex in a real app)
            saveEventsToCSV(calendar.getEvents());
        }
    });

    // Function to save events to CSV (simplified)
    function saveEventsToCSV(events) {
        var csvContent = "Date,Event\n";
        events.forEach(function(event) {
            csvContent += event.startStr + ',' + event.title + '\n';
        });

        // Create a data URI and download the CSV
        var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        var link = document.createElement("a");
        if (link.download !== undefined) {
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "events.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
});
