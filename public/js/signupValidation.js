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

			if (!isPasswordValid(password)) {
				event.preventDefault();
				alert(
					"Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character."
				);
			}
		});
	}
	//Add tooltip text
	const tooltip = document.querySelector(".password-tooltip");

	tooltip.addEventListener("mouseenter", function () {
		const tooltipText = document.createElement("span");
		tooltipText.textContent =
			"Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.";
		tooltipText.classList.add("tooltiptext");
		this.appendChild(tooltipText);
	});

	tooltip.addEventListener("mouseleave", function () {
		const tooltipText = document.querySelector(".tooltiptext");
		this.removeChild(tooltipText);
	});
});
