document.addEventListener("DOMContentLoaded", async function () {
    const session = sessionStorage.getItem("user_id");
    const response = await fetch(`http://localhost:3000/api/account/getAccountByUserId/${session}`);
    const acc = await response.json();
    document.getElementById("accountBalance").value = "Rp" + acc.data.balance;
    document.getElementById("accountCode").innerHTML = acc.data.accountCode;
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
    const session = sessionStorage.getItem("user_id");
    const nominal = document.getElementById("topupNominal").value;

    let json = {
        user_id: session,
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
    const session = sessionStorage.getItem("user_id");
    const nominal = document.getElementById("nominal").value;
    const accountCode = document.getElementById("transferCode").value;

    let json = {
        user_id: session,
        nominal: parseFloat(nominal),
        accountCode
    };

    try {
        const response = await fetch(`http://localhost:3000/api/account/transfer`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(json),
        });
        const res = await response.json();
        
        alert(res.message);
        window.location.href = "/home";
    } catch (err) {
        alert("Failed to transfer");
    }
}