import { accountService } from "../services/index.js";

async function getAccountByUserId(req, res) {
	const { userId } = req.params;
	try {
		const account = await accountService.getAccountById(userId);
		if (!account) {
			return res.status(404).json({ error: "Account not found" });
		}
		res.status(200).json({
			message: "Successfully fetched account",
			data: account,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
}

async function updateAccountBalance(req, res) {
	const userId = req.body.user_id;
	try {
		await accountService.updateAccountBalance(userId);
		res.status(200).json({
			message: "Successfully update account's balance",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Failed to update account's balance",
		});
	}
}

export default { getAccountByUserId, updateAccountBalance };
