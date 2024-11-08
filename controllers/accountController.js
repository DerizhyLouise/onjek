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

async function topup(req, res) {
	const userId = req.body.userId;
	let balance = req.body.balance;
	try {
		const account = await accountService.getAccountById(userId);
		balance = balance + parseFloat(account.balance);
		await accountService.updateAccountBalance(userId, balance);
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

async function transfer(req, res) {
	const userId = req.body.userId;
	let nominal = req.body.nominal;
	let balance = req.body.nominal;
	let accountCode = req.body.accountCode;
	try {
		const account = await accountService.getAccountById(userId);
		const targetAccount = await accountService.getAccountByCode(accountCode);
		if (!targetAccount) {
			return res.json({
				message: "Transfer Account Code Not Found!",
			});
		}

		balance = account.balance - parseFloat(balance);
		if (balance < 0) {
			return res.json({
				message: "Transfer failed! Check your balance!",
			});
		}
		nominal = nominal + parseFloat(targetAccount.balance);

		await accountService.updateAccountBalance(userId, balance);
		await accountService.updateAccountBalance(targetAccount.userId, nominal);
		res.status(200).json({
			message: "Successfully update account's balance",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "Transfer failed",
		});
	}
}

export default { getAccountByUserId, topup, transfer };
