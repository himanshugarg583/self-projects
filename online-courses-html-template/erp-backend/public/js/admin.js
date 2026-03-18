const dropdowns = document.querySelectorAll('.dropdown');

// Add event listener for each dropdown to toggle visibility
dropdowns.forEach(dropdown => {
    const dropdownToggle = dropdown.querySelector('a');
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
    
    // Toggle dropdown menu visibility on click
    dropdownToggle.addEventListener('click', (event) => {
        event.preventDefault();  // Prevent default action (link click)
        
        // Close all other dropdowns
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            if (menu !== dropdownMenu) {
                menu.style.display = 'none';
            }
        });
        
        // Toggle the clicked dropdown's menu
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });
});

// Close dropdowns if clicked outside
document.addEventListener('click', (event) => {
    const isClickInside = event.target.closest('.sidebar');
    
    if (!isClickInside) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.style.display = 'none';
        });
    }
});



const notifications = [
  { title: "New Assignment", description: "Math assignment for Grade 8 is due on 15th Jan 2025.", time: "2 hours ago" },
  { title: "Parent-Teacher Meeting", description: "Scheduled for 20th Jan 2025 at 10:00 AM.", time: "5 hours ago" },
  { title: "Exam Schedule", description: "Mid-term exams for Grade 10 have been uploaded.", time: "1 day ago" },
  { title: "Holiday Notice", description: "School will remain closed on 26th Jan 2025 for Republic Day.", time: "2 days ago" },
  { title: "Fee Reminder", description: "Last date for fee payment is 31st Jan 2025.", time: "3 days ago" },
];

const notificationList = document.querySelector(".notifications ul");
notifications.forEach(notification => {
  const li = document.createElement("li");
  li.innerHTML = `<strong>${notification.title}:</strong> ${notification.description} <span class="timestamp">${notification.time}</span>`;
  notificationList.appendChild(li);
});


const monthNames = [
    "January", "February", "March", "April", "May", 
    "June", "July", "August", "September", "October", "November", "December"
];

const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

const renderCalendar = (month, year) => {
    const calendarBody = document.getElementById("calendar-body");
    const monthYear = document.getElementById("month-year");

    calendarBody.innerHTML = "";
    monthYear.textContent = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = daysInMonth(month, year);

    let date = 1;

    for (let i = 0; i < 6; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            const cell = document.createElement("td");

            if (i === 0 && j < firstDay) {
                cell.classList.add("empty");
            } else if (date > totalDays) {
                cell.classList.add("empty");
            } else {
                cell.textContent = date;

                if (
                    date === new Date().getDate() &&
                    month === new Date().getMonth() &&
                    year === new Date().getFullYear()
                ) {
                    cell.classList.add("today");
                }

                date++;
            }

            row.appendChild(cell);
        }

        calendarBody.appendChild(row);
    }
};

const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

document.getElementById("prev-month").addEventListener("click", () => {
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    currentYear = (currentMonth === 11) ? currentYear - 1 : currentYear;
    renderCalendar(currentMonth, currentYear);
});

document.getElementById("next-month").addEventListener("click", () => {
    currentMonth = (currentMonth === 11) ? 0 : currentMonth + 1;
    currentYear = (currentMonth === 0) ? currentYear + 1 : currentYear;
    renderCalendar(currentMonth, currentYear);
});

renderCalendar(currentMonth, currentYear);




