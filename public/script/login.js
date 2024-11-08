sessionStorage.clear();

document
	.getElementById("loginForm")
	.addEventListener("submit", function (event) {
		event.preventDefault();
		submitForm();
	});

async function submitForm() {
	let email = document.getElementById("email").value;
	let password = document.getElementById("pass").value;
	let validUserFound = false;

	let response = await fetch(`http://localhost:3000/api/user/getAllUser`);
	let data = await response.json();
	data = data.data;

	for (let i in data) {
		if (data[i].email === email && data[i].password === password) {
			sessionStorage.clear();
			sessionStorage.setItem("userId", data[i].id);
			window.location.href = "/home";
			validUserFound = true;
			break;
		}
	}
	if (!validUserFound) {
		alert("Email or password invalid!");
	}
}
