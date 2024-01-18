document.addEventListener("DOMContentLoaded", function () {
	const calendarContainer = document.getElementById("calendar");
	const currentDate = new Date();

	function generateCalendar(year, month) {
		const daysInMonth = new Date(year, month + 1, 0).getDate();
		const firstDayOfMonth = new Date(year, month, 1).getDay();
		const calendarTable = document.createElement("table");
		document.getElementById("currentYear").textContent = year;
		document.getElementById("currentMonth").textContent = new Date(
			year,
			month,
			1
		).toLocaleString("default", { month: "long" });

		let dayCounter = 1;

		// Create table header with days of the week
		const headerRow = document.createElement("tr");
		const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		daysOfWeek.forEach((day) => {
			const th = document.createElement("th");
			th.textContent = day;
			headerRow.appendChild(th);
		});
		calendarTable.appendChild(headerRow);

		// Create table rows with days
		for (let i = 0; i < 6; i++) {
			const row = document.createElement("tr");

			for (let j = 0; j < 7; j++) {
				const td = document.createElement("td");

				if (
					(i === 0 && j < firstDayOfMonth) ||
					dayCounter > daysInMonth
				) {
					td.textContent = "";
				} else {
					td.textContent = dayCounter;
					td.addEventListener("click", () => highlightDate(td));
					dayCounter++;
				}

				row.appendChild(td);
			}

			calendarTable.appendChild(row);
		}

		calendarContainer.innerHTML = "";
		calendarContainer.appendChild(calendarTable);
	}

	function highlightDate(element) {
		const selectedDates = document.querySelectorAll(".selected-date");
		selectedDates.forEach((date) => date.classList.remove("selected-date"));

		const selectedDate = element.textContent;
		element.innerHTML = `<div class="selected-date">${selectedDate}</div>`;
	}

	function updateCalendar() {
		const year = parseInt(selectYear.value);
		const month = parseInt(selectMonth.value);
		generateCalendar(year, month);
	}

	function switchMonth(offset) {
		const currentMonth = parseInt(selectMonth.value);
		const newMonth = (currentMonth + offset + 12) % 12;
		selectMonth.value = newMonth;
		updateCalendar();
	}

	function switchYear(offset) {
		const currentYear = parseInt(selectYear.value);
		const newYear = currentYear + offset;
		selectYear.value = newYear;
		updateCalendar();
	}

	// Create and append year and month selectors
	const selectYear = document.createElement("select");
	const selectMonth = document.createElement("select");

	for (
		let i = currentDate.getFullYear() - 10;
		i <= currentDate.getFullYear() + 10;
		i++
	) {
		const option = document.createElement("option");
		option.value = i;
		option.text = i;
		selectYear.appendChild(option);
	}

	for (let i = 0; i < 12; i++) {
		const option = document.createElement("option");
		option.value = i;
		option.text = new Date(currentDate.getFullYear(), i, 1).toLocaleString(
			"default",
			{
				month: "long",
			}
		);
		selectMonth.appendChild(option);
	}

	selectYear.addEventListener("change", updateCalendar);
	selectMonth.addEventListener("change", updateCalendar);

	// Append year and month selectors
	calendarContainer.appendChild(selectYear);
	calendarContainer.appendChild(selectMonth);

	// Create and append buttons for switching months and years
	const prevMonthButton = document.getElementById("prevMonth");
	prevMonthButton.addEventListener("click", () => switchMonth(-1));

	const nextMonthButton = document.getElementById("nextMonth");
	nextMonthButton.addEventListener("click", () => switchMonth(1));

	const prevYearButton = document.getElementById("prevYear");
	prevYearButton.addEventListener("click", () => switchYear(-1));

	const nextYearButton = document.getElementById("nextYear");
	nextYearButton.addEventListener("click", () => switchYear(1));

	// Set initial values for selectors
	selectYear.value = currentDate.getFullYear();
	selectMonth.value = currentDate.getMonth();
	// Generate initial calendar
	generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
});
