document.addEventListener("DOMContentLoaded", async function () {
	const session = sessionStorage.getItem("userId");
	const response = await fetch(
		`http://localhost:3000/api/account/getAccountByUserId/${session}`
	);
	const acc = await response.json();
	document.getElementById("accountBalance").value = "Rp" + acc.data.balance;
	document.getElementById("accountCode").innerHTML = acc.data.accountCode;
	loadShops();
});

document
	.getElementById("topupForm")
	.addEventListener("submit", function (event) {
		event.preventDefault();
		topupForm();
	});

document
	.getElementById("paymentForm")
	.addEventListener("submit", function (event) {
		event.preventDefault();
		paymentForm();
	});

async function topupForm() {
	const session = sessionStorage.getItem("userId");
	const nominal = document.getElementById("topupNominal").value;

	let json = {
		userId: session,
		balance: parseFloat(nominal),
	};

	try {
		await fetch(`http://localhost:3000/api/account/topup`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(json),
		});
		alert("Top Up success!");
		window.location.href = "/home";
	} catch (err) {
		alert("Failed to top up");
	}
}

async function paymentForm() {
	const session = sessionStorage.getItem("userId");
	const nominal = document.getElementById("nominal").value;
	const accountCode = document.getElementById("transferCode").value;

	let json = {
		userId: session,
		nominal: parseFloat(nominal),
		accountCode,
	};

	try {
		const response = await fetch(
			`http://localhost:3000/api/account/transfer`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(json),
			}
		);
		const res = await response.json();

		alert(res.message);
		window.location.href = "/home";
	} catch (err) {
		alert("Failed to transfer");
	}
}

async function loadShops() {
	try {
		const response = await fetch(
			"http://localhost:3000/api/food/getAllFoodShop"
		);

		if (!response.ok) {
			throw new Error("Failed to fetch shops");
		}

		const shops = await response.json();
		const shopList = document.getElementById("shopList");

		shopList.innerHTML = "";

		shops.data.slice(0, 6).forEach((shop) => {
			const shopDiv = document.createElement("button");
			shopDiv.onclick = () => openProduct(shop.id);
			shopDiv.setAttribute("href", "/shop/food");
			shopDiv.className =
				"mb-4 h-64 w-44 bg-white shadow-md rounded-lg text-center p-4 flex flex-col justify-between items-center";

			shopDiv.innerHTML = `
				<img src="/food" alt="${shop.name}" 
					class="h-24 w-24 object-cover mb-3 rounded-full border-2 border-gray-300"/>
				<h3 class="text-lg font-semibold text-gray-800 mb-1">${shop.name}</h3>
				<p class="text-sm text-gray-600 mb-1">${shop.address}</p>
				<p class="text-sm text-yellow-500 font-medium">⭐ ${shop.rating}</p>
			`;

			shopList.appendChild(shopDiv);
		});
	} catch (error) {
		console.error("Error loading shops:", error);
	}
}

function openProduct(shopId) {
	sessionStorage.setItem("shopId", shopId);
	window.location.href = "product";
}
