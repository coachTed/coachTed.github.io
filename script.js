document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: [], // Initialize with an empty array
    });
    calendar.render();

    var eventsData = []; // Array to store events

    // Function to load events from CSV file
    function loadEventsFromCSV() {
        fetch('data.csv') // Adjust the URL as needed
            .then((response) => response.text())
            .then((csvText) => {
                // Parse CSV data into an array of objects
                eventsData = parseCSV(csvText);
                // Add events to the calendar
                calendar.removeAllEvents();
                calendar.addEventSource(eventsData);
            })
            .catch((error) => {
                console.error('Error loading CSV:', error);
            });
    }

    // Function to save events to CSV and commit to the repository
    function saveEventsToCSVAndCommit() {
        // Convert eventsData to CSV format
        let csvContent = 'Date,Event\n';
        eventsData.forEach((event) => {
            csvContent += `${event.start},${event.title}\n`;
        });

        // Write the CSV content to data.csv
        fetch('data.csv', {
            method: 'PUT', // Use PUT to update the file
            body: csvContent,
            headers: {
                'Content-Type': 'text/csv'
            }
        })
        .then(() => {
            console.log('Changes saved to data.csv');
        })
        .catch((error) => {
            console.error('Error saving CSV:', error);
        });
    }

    // Parse CSV data into an array of objects
    function parseCSV(csvText) {
        const lines = csvText.trim().split('\n');
        const headers = lines[0].split(',');
        const eventsData = [];
        
        for (let i = 1; i < lines.length; i++) {
            const data = lines[i].split(',');
            const event = {};
            for (let j = 0; j < headers.length; j++) {
                event[headers[j].trim()] = data[j].trim();
            }
            eventsData.push(event);
        }
        
        return eventsData;
    }

    // Load events from CSV when the page loads
    loadEventsFromCSV();

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

            // Save events to CSV when adding a new event
            saveEventsToCSVAndCommit();
        }
    });

    // Save button click handler
    var saveButton = document.getElementById('save-button');
    saveButton.addEventListener('click', function() {
        // Save events to CSV when clicking the "Save Events to CSV" button
        saveEventsToCSVAndCommit();
    });
});
