document.addEventListener("DOMContentLoaded", function () {
	const calendarContainer = document.getElementById("calendar");
	const currentDate = new Date();

	const timeContainer = document.getElementById("timeDiv");
	const calculateTimeSlots = (startTime, endTime, durationMinutes) => {
		// Convert start time, end time, and duration to minutes
		const startMinutes = timeToMinutes(startTime);
		const endMinutes = timeToMinutes(endTime);

		// Calculate time difference in minutes
		const timeDifference = endMinutes - startMinutes;

		// Calculate the number of time slots
		const numTimeSlots = Math.floor(timeDifference / durationMinutes);

		console.log(numTimeSlots);
		return numTimeSlots;
	};
	// Function to convert time in HH:mm format to minutes
	function timeToMinutes(time) {
		const [hours, minutes] = time.split(":").map(Number);
		return hours * 60 + minutes;
	}

	const timeToHours = (timeInMinutes) => {
		let hours = Math.floor(timeInMinutes / 60);
		let remainingMinutes = timeInMinutes % 60;
		if (remainingMinutes.toString() == "0") {
			remainingMinutes = "00";
		}
		if (hours.toString().length == 1) {
			hours = "0" + hours.toString();
		}
		return `${hours}:${remainingMinutes}`;
	};

	const generateTimeSlotButtons = (
		numTimeSlots,
		startTime,
		endTime,
		duration
	) => {
		for (let i = 0; i < numTimeSlots; i++) {
			const row = document.createElement("div");
			row.classList.add("time-button-row");
			const button = document.createElement("button");
			const buttonId = "time-button-" + i;
			button.classList.add("center_content");
			button.id = buttonId;
			if (i == 0) {
				button.innerText = startTime;
			} else if (i == numTimeSlots - 1) {
				button.innerText = endTime;
			} else {
				const buttonMinutes = timeToMinutes(startTime) + duration * i;
				const buttonText = timeToHours(buttonMinutes);
				button.innerText = buttonText;
			}

			button.addEventListener("click", () => {
				console.log(`Button ${buttonId} Clicked!`);
				highlightButton(buttonId);
			});

			row.appendChild(button);
			timeContainer.appendChild(row);
		}
	};

	const startTime = "08:00";
	const endTime = "17:00";
	const durationMinutes = 60;
	const numTimeSlots = calculateTimeSlots(
		startTime,
		endTime,
		durationMinutes
	);
	console.log(`Timeslots: ${numTimeSlots}`);
	const test = generateTimeSlotButtons(
		numTimeSlots,
		startTime,
		endTime,
		durationMinutes
	);

	function generateCalendar(year, month) {
		const date = new Date();
		const currentYear = date.getFullYear();
		const currentMonth = date.getMonth() + 1;
		const currentDay = date.getDate();
		if (year < currentYear) {
			console.log("Year is less than current year");
		}
		console.log(`Year: ${currentYear}`);
		console.log(`Month: ${currentMonth}`);
		console.log(`Day: ${currentDay}`);
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
			th.classList.add("gray-out");
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
				} else if (year < currentYear) {
					td.textContent = dayCounter;
					td.classList.add("gray-out");
					dayCounter++;
				} else if (
					((i !== 0 && j > firstDayOfMonth) ||
						dayCounter < daysInMonth) &&
					dayCounter < currentDay &&
					month < currentMonth
				) {
					td.textContent = dayCounter;
					td.classList.add("gray-out");
					dayCounter++;
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

	const highlightButton = (buttonId) => {
		const selectedButtons = document.querySelectorAll(".selected-time");
		selectedButtons.forEach((button) =>
			button.classList.remove("selected-time")
		);
		const button = document.getElementById(buttonId);
		button.classList.add("selected-time");
	};

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
