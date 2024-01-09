document.addEventListener("DOMContentLoaded", function () {
	const signupForm = document.getElementById("signupForm");
	// const passwordField = document.getElementById("password");
	const confirmPasswordField = document.getElementById("confirmPassword");
	const errorMessagesDiv = document.getElementById("errorMessages");
	const existingErrorMessages = errorMessagesDiv.getElementsByTagName("span");
	console.log(existingErrorMessages);

	if (signupForm) {
		signupForm.addEventListener("submit", function (event) {
			event.preventDefault();
			if (existingErrorMessages) {
				console.log("Error: " + existingErrorMessages);
			}
			const password = document.getElementById("password").value;
			const confirmPassword =
				document.getElementById("confirmPassword").value;

			if (!isPasswordValid(password)) {
				showErrorMessage(
					"Password does not meet the required complexity"
				);
			} else {
				if (password === confirmPassword) {
					console.log("Passwords match");
					confirmPasswordField.classList.remove("password-no-match");
					signupForm.submit();
				} else {
					console.log("Password complexity met, password mismatch");
					console.log(existingErrorMessages.length);
					showErrorMessage("Passwords do not match");
				}
			}
		});
	}
	//Add password requirements text, show on hover, hide otherwise.
	const tooltip = document.querySelector(".password-tooltip");

	tooltip.addEventListener("mouseenter", function () {
		const tooltipText = document.createElement("span");
		tooltipText.textContent =
			"Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.I";
		tooltipText.classList.add("tooltiptext");
		this.appendChild(tooltipText);
	});

	tooltip.addEventListener("mouseleave", function () {
		const tooltipText = document.querySelector(".tooltiptext");
		this.removeChild(tooltipText);
	});

	function showErrorMessage(message) {
		// Change the border color of the confirm password field to red
		confirmPasswordField.classList.add("password-no-match");
		confirmPasswordField.blur();

		// Display a message saying the passwords did not match
		const passwordNoMatchText = document.createElement("span");
		passwordNoMatchText.textContent = message;
		passwordNoMatchText.classList.add("red_text");
		if (existingErrorMessages.length > 0) {
			existingErrorMessages[0].remove();
		}
		errorMessagesDiv.appendChild(passwordNoMatchText);
		errorMessagesDiv.classList.add("show-confirm-password");
		errorMessagesDiv.style.display = "block";
		errorMessagesDiv.style.visibility = "visible";
	}

	function isPasswordValid(password) {
		const passwordRegex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		return passwordRegex.test(password);
	}
});
