document.addEventListener("DOMContentLoaded", function () {
	function isPasswordValid(password) {
		const passwordRegex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		return passwordRegex.test(password);
	}

	const signupForm = document.getElementById("signupForm");
	if (signupForm) {
		signupForm.addEventListener("submit", function (event) {
			const password = document.getElementById("password").value;
			const confirmPassword =
				document.getElementById("confirmPassword").value;

			if (!isPasswordValid(password)) {
				event.preventDefault();
				alert(
					"Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character."
				);
			}

			const passwordField = document.getElementById("password");
			const confirmPasswordField =
				document.getElementById("confirmPassword");
			const confirmPasswordDiv =
				document.getElementById("confirmPasswordDiv");
			const existingErrorMessage =
				confirmPasswordDiv.querySelector("red_text");

			if (password === confirmPassword) {
				event.preventDefault();
				console.log("Passwords match");
				confirmPasswordField.classList.remove("password-no-match");

				// Remove the error message if it exists
				const existingErrorMessage =
					confirmPasswordDiv.querySelector(".red_text");
				if (existingErrorMessage) {
					existingErrorMessage.style.display = "none"; // Hide the error message
				}
			} else {
				event.preventDefault();
				console.log("Password does not match");

				if (!existingErrorMessage) {
					// Change the border color of the confirm password field to red
					confirmPasswordField.classList.add("password-no-match");
					confirmPasswordField.blur();

					// Display a message saying the passwords did not match
					const passwordNoMatchText = document.createElement("span");
					passwordNoMatchText.textContent = "Passwords do not match";
					passwordNoMatchText.classList.add("red_text");
					confirmPasswordDiv.appendChild(passwordNoMatchText);
					confirmPasswordDiv.classList.add("show-confirm-password");
					confirmPasswordDiv.style.display = "block";
					confirmPasswordDiv.style.visibility = "visible";
				} else {
					confirmPasswordDiv.style.display = "none";
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
});
