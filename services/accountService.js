import { conn } from "../config/mysql.js";

async function getAccountById(userId) {
	try {
		return new Promise((resolve, reject) => {
			conn.query(
				"SELECT * FROM account WHERE user_id = ?",
				[userId],
				(err, results) => {
					if (err) {
						console.error(err);
						reject("Error fetching account by User ID");
					}
					resolve(results[0]);
				}
			);
		});
	} catch (error) {
		console.error(error);
		throw new Error(error);
	}
}

async function createAccount(userId) {
	try {
		return new Promise((resolve, reject) => {
			const accountCode =
				"AC" + Math.random().toString(36).substr(2, 10).toUpperCase();
			conn.query(
				"INSERT INTO account (user_id, account_code, balance) VALUES (?, ?, ?)",
				[userId, accountCode, 0.0],
				(err, results) => {
					if (err) {
						console.error(err);
						reject("Error creating account");
					}
					resolve(results);
				}
			);
		});
	} catch (error) {
		console.error(error);
		throw new Error(error);
	}
}

async function updateAccountBalance(userId, balance) {
	try {
		return new Promise((resolve, reject) => {
			conn.query(
				"UPDATE account SET balance = ? WHERE user_id = ?",
				[balance, userId],
				(err, results) => {
					if (err) {
						console.error(err);
						reject("Error updating account balance");
					}
					if (results.affectedRows === 0) {
						reject("No account found for the given user ID");
					}
					resolve(results);
				}
			);
		});
	} catch (error) {
		console.error(error);
		throw new Error(error);
	}
}

export default { getAccountById, createAccount, updateAccountBalance };
