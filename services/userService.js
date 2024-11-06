import { conn } from "../config/mysql.js";
import { User } from "../models/index.js";

async function getUsers() {
	try {
		return new Promise((resolve, reject) => {
			conn.query("SELECT * FROM user", (err, results) => {
				if (err) {
					console.error(err);
					reject("Error fetching users");
				}
				const users = results.map(row => new User(row.id, row.name, row.birthdate, row.email, row.password));
				resolve(users);
			});
		});
	} catch (error) {
		console.error(error);
	}
}

async function getUserById(userId) {
	try {
		return new Promise((resolve, reject) => {
			conn.query(
				"SELECT * FROM user WHERE id = ?",
				[userId],
				(err, results) => {
					if (err) {
						console.error(err);
						reject("Error fetching user by ID");
					}
					const user = results[0] ? new User(results[0].id, results[0].name, results[0].birthdate, results[0].email, results[0].password) : null;
					resolve(user);
				}
			);
		});
	} catch (error) {
		console.error(error);
		throw new Error(error);
	}
}

async function createUser(user) {
	if (!(user instanceof User)) {
		throw new Error("Expected a User instance");
	}
	try {
		return new Promise((resolve, reject) => {
			const { name, birthdate, email, password } = user;
			conn.query(
				"INSERT INTO user (name, birthdate, email, password) VALUES (?, ?, ?, ?)",
				[name, birthdate, email, password],
				(err, results) => {
					if (err) {
						console.error(err);
						throw new Error(err);
					} else {
						const newUser = new User(results.insertId, name, birthdate, email, password);
						resolve(newUser);
					}
				}
			);
		});
	} catch (error) {
		console.error(error);
		throw new Error(error);
	}
}

async function updateUserById(userId, updatedUser) {
	if (!(updatedUser instanceof User)) {
		throw new Error("Expected a User instance");
	}
	try {
		return new Promise((resolve, reject) => {
			const { name, birthdate, email, password } = updatedUser;
			conn.query(
				"UPDATE user SET name = ?, birthdate = ?, email = ?, password = ? WHERE id = ?",
				[name, birthdate, email, password, userId],
				(err, results) => {
					if (err) {
						console.error(err);
						reject("Error updating user");
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

async function login(email, password) {
	try {
		return new Promise((resolve, reject) => {
			conn.query(
				"SELECT id, email, name FROM user WHERE email = ? AND password = ?",
				[email, password],
				(err, results) => {
					if (err) {
						console.error(err);
						reject("Error during login");
					}
					if (results.length === 0) {
						resolve(null);
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

export default { createUser, getUserById, getUsers, login, updateUserById };
