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
});
