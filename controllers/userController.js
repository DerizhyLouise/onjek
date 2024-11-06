import { accountService, userService } from "../services/index.js";
import { User } from "../models/index.js"

async function getUsers(req, res) {
	try {
		const users = await userService.getUsers();
		res.status(200).json({
			message: "Successfully fetched all users",
			data: users,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
}

async function getUserById(req, res) {
	const { userId } = req.params;
	try {
		const user = await userService.getUserById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		res.status(200).json({
			message: "Successfully fetched user",
			data: user,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
}

async function createUser(req, res) {
	try {
		const { name, birthdate, email, password } = req.body;
		const newUser = new User(null, name, birthdate, email, password);

		const userResult = await userService.createUser(newUser);
		const accountResult = await accountService.createAccount(userResult.id);

		res.status(201).json({
			userId: userResult.id,
			accountCode: accountResult.accountCode,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Failed to create new user and account",
		});
	}
}

async function updateUserById(req, res) {
	const userId = req.body.user_id;
	try {
		const user = await userService.getUserById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		if (req.body.name) user.name = req.body.name;
		if (req.body.birthdate) user.birthdate = req.body.birthdate;
		if (req.body.email) user.email = req.body.email;
		if (req.body.password) user.password = req.body.password;

		await userService.updateUserById(userId, user);
		res.status(200).json({
			message: "Successfully updated user",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Failed to update user's data" });
	}
}

async function login(req, res) {
	const email = req.body.email;
	const password = req.body.password;
	try {
		const user = await userService.login(email, password);
		if (!user) {
			return res
				.status(404)
				.json({ error: "Email or Password is incorrect!" });
		}
		res.status(200).json({
			message: "Login successfully",
			data: user,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
}

export default {
	getUsers,
	getUserById,
	createUser,
	updateUserById,
	login,
};
