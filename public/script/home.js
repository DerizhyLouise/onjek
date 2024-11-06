document.addEventListener("DOMContentLoaded", async function () {
    const session = sessionStorage.getItem("user_id");
    const response = await fetch(`http://localhost:3000/api/account/getAccountByUserId/${session}`);
    const acc = await response.json();
    document.getElementById("accountBalance").value = "Rp" + acc.data.balance;
});

document
    .getElementById("topupForm")
    .addEventListener("submit", function (event) {
        const nominal = document.getElementById("nominal").value;
        console.log(nominal)
        event.preventDefault();
        topupForm();
    });

async function topupForm() {
    const session = sessionStorage.getItem("user_id");
    const nominal = document.getElementById("nominal").value;

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