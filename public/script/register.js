document
	.getElementById("registerForm")
	.addEventListener("submit", function (event) {
		event.preventDefault();
		submitForm();
	});

async function submitForm() {
	let fullName = document.getElementById("name").value;
	let birthDate = document.getElementById("birthdate").value;
	let email = document.getElementById("email").value;
	let password = document.getElementById("pass").value;

	let birthDateObj = new Date(birthDate);
	let formattedBirthDate = birthDateObj.toISOString();
	formattedBirthDate = formattedBirthDate.replace("Z", "+00:00");

	let json = {};
	json.name = fullName;
	json.birthdate = formattedBirthDate;
	json.email = email;
	json.password = password;

	try {
		await fetch(`http://localhost:3000/api/user/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(json),
		});
		alert("Account created!");
		window.location.href = "/login";
	} catch (err) {
		alert("Failed to create account");
	}

}

const passwordInput = document.getElementById("pass");
const confirmPasswordInput = document.getElementById("confirmPass");

confirmPasswordInput.addEventListener("input", () => {
	const passwordValue = passwordInput.value;
	const confirmPasswordValue = confirmPasswordInput.value;

	if (passwordValue !== confirmPasswordValue) {
		confirmPasswordInput.classList.add("password-mismatch");
	} else {
		confirmPasswordInput.classList.remove("password-mismatch");
	}
});
