document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: [], // Initialize with an empty array
    });
    calendar.render();

    var eventsData = []; // Array to store events

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

            // Add the event to the data array
            eventsData.push({
                title: eventName,
                start: eventDate
            });

            // Clear input fields
            document.getElementById('event-name').value = '';
            document.getElementById('event-date').value = '';
        }
    });

    // Save button click handler
    var saveButton = document.getElementById('save-button');
    saveButton.addEventListener('click', function() {
        // Call the function to save events to CSV
        saveEventsToCSV(eventsData);
    });

    // Function to save events to CSV (simplified)
    function saveEventsToCSV(events) {
        var csvContent = "Date,Event\n";
        events.forEach(function(event) {
            csvContent += event.start + ',' + event.title + '\n';
        });

        // Create a Blob and save it to data.csv
        var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        var link = document.createElement("a");
        link.setAttribute("href", URL.createObjectURL(blob));
        link.setAttribute("download", "data.csv");
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});
