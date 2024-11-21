document.addEventListener('DOMContentLoaded', () => {
    const calendarBody = document.getElementById('calendarBody');
    const monthYear = document.getElementById('monthYear');
    const prevMonth = document.getElementById('prevMonth');
    const nextMonth = document.getElementById('nextMonth');
    const yearInput = document.getElementById('yearInput');
    const monthInput = document.getElementById('monthInput');
    const goButton = document.getElementById('goButton');

    let currentDate = new Date();

    const renderCalendar = (date) => {
        calendarBody.innerHTML = '';
        const currentYear = date.getFullYear();
        const currentMonth = date.getMonth();
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const lastDayOfLastMonth = currentMonth === 0 ? 31 : new Date(currentYear, currentMonth, 0).getDate();
        
        monthYear.innerText = `${date.toLocaleDateString('default', { month: 'long' })} ${currentYear}`;

        let dayCounter = 1;
        let calendarCells = '';

        for (let i = 0; i < 6; i++) {
            calendarCells += '<tr>';
            for (let j = 0; j < 7; j++) {
                const isSunday = (j === 0) ? 'sunday' : ''

                if (i === 0 && j < firstDayOfMonth) {
                    calendarCells += `<td class="prev-date ${isSunday}">${lastDayOfLastMonth - firstDayOfMonth + j + 1}</td>`;
                } else if (dayCounter > lastDateOfMonth) {
                    calendarCells += `<td class="next-date ${isSunday}">${dayCounter - lastDateOfMonth}</td>`;
                    dayCounter++;
                } else {
                    const todayClass = dayCounter === date.getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear() ? 'today' : '';
                    calendarCells += `<td class="${todayClass} ${isSunday}">${dayCounter}</td>`;
                    dayCounter++;
                }
            }
            calendarCells += '</tr>';
        }

        calendarBody.innerHTML = calendarCells;
    };

    prevMonth.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextMonth.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    goButton.addEventListener('click', () => {
        const year = parseInt(yearInput.value);
        const month = parseInt(monthInput.value) - 1; // Subtract 1 because months are 0-based in JavaScript
        if (!isNaN(year) && !isNaN(month) && month >= 0 && month <= 11) {
            currentDate = new Date(year, month, 1);
            renderCalendar(currentDate);
        } else {
            alert('Please enter a valid year and month.');
        }
    });

    renderCalendar(currentDate);
});
