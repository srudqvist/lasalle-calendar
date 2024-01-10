document.addEventListener("DOMContentLoaded", function () {
	const signupForm = document.getElementById("signupForm");
	// const passwordField = document.getElementById("password");
	const confirmPasswordField = document.getElementById("confirmPassword");
	const errorMessagesDiv = document.getElementById("errorMessages");
	const existingErrorMessages = errorMessagesDiv.getElementsByTagName("span");

	const firstNameInput = document.getElementById("firstName").trim();
	const lastNameInput = document.getElementById("lastName").trim();

	const phoneInput = document.getElementById("phone");

	if (signupForm) {
		if (phoneInput) {
			// Handle the phone number format as the user is typing.
			phoneInput.addEventListener("input", function (event) {
				const isBackspace = event.inputType === "deleteContentBackward";
				if (!isBackspace) {
					let inputValue = event.target.value.replace(/\D/g, "");
					if (inputValue.length > 0) {
						inputValue =
							"(" +
							inputValue.substring(0, 3) +
							") " +
							inputValue.substring(3);
					}
					if (inputValue.length > 8) {
						inputValue =
							inputValue.substring(0, 9) +
							"-" +
							inputValue.substring(9);
					}
					if (inputValue.length > 14) {
						inputValue = inputValue.substring(0, 14);
					}
					event.target.value = inputValue;
				} else {
					let inputValue = event.target.value;
					const lastChar = inputValue.charAt(inputValue.length - 1);
					if (lastChar === ")" || lastChar === "-") {
						inputValue = inputValue.substring(
							0,
							inputValue.length - 1
						);
					}
					event.target.value = inputValue;
				}
			});
		}
		signupForm.addEventListener("submit", function (event) {
			event.preventDefault();
			nameValidation(firstNameInput);
			nameValidation(lastNameInput);
			const password = document.getElementById("password").value;
			const confirmPassword =
				document.getElementById("confirmPassword").value;

			if (!isPasswordValid(password)) {
				showErrorMessage(
					"Password does not meet the required complexity"
				);
			} else {
				if (password === confirmPassword) {
					confirmPasswordField.classList.remove("password-no-match");
					signupForm.submit();
				} else {
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

	function nameValidation(name) {
		// Regex allowing letters, spaces, hyphens, and apostrophes
		const nameRegex = /^[A-Za-z]+(?:[-' ]?[A-Za-z]+)*$/;
		const validName = nameRegex.test(name);

		if (!validName) {
			alert("Invalid name");
		}
	}

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
