document.addEventListener('DOMContentLoaded', function () {
    // Clock
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Calendar
    function generateCalendar() {
        const now = new Date();
        const month = now.getMonth();
        const year = now.getFullYear();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const calendar = document.getElementById('calendar');
        calendar.innerHTML = '';
        const monthAndYear = document.createElement('h2');
        monthAndYear.textContent = now.toLocaleString('default', { month: 'long' }) + ' ' + year;
        calendar.appendChild(monthAndYear);
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const daysRow = document.createElement('div');
        daysOfWeek.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day');
            dayElement.textContent = day;
            daysRow.appendChild(dayElement);
        });
        calendar.appendChild(daysRow);
        let dateRow = document.createElement('div');
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('day');
            dateRow.appendChild(emptyCell);
        }
        for (let date = 1; date <= daysInMonth; date++) {
            if (dateRow.children.length === 7) {
                calendar.appendChild(dateRow);
                dateRow = document.createElement('div');
            }
            const dateCell = document.createElement('div');
            dateCell.classList.add('day');
            dateCell.textContent = date;
            dateRow.appendChild(dateCell);
        }
        calendar.appendChild(dateRow);
    }
    generateCalendar();

    // Events
    const events = [];
    document.getElementById('add-event-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const date = document.getElementById('event-date').value;
        const description = document.getElementById('event-description').value;
        events.push({ date, description });
        updateEventList();
    });

    function updateEventList() {
        const eventList = document.getElementById('events');
        eventList.innerHTML = '';
        events.forEach(event => {
            const eventItem = document.createElement('li');
            eventItem.textContent = `${event.date}: ${event.description}`;
            eventList.appendChild(eventItem);
        });
    }
});
