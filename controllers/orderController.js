import { OnCarOrder, OnRideOrder } from "../models/index.js";
import { accountService, orderService } from "../services/index.js";

async function createOnRideOrder(req, res) {
	try {
		const { startPoint, endPoint, userId } = req.body;
		const onRide = new OnRideOrder(
			null,
			userId,
			startPoint,
			endPoint,
			false
		);

		const onRideResult = await orderService.createOnRideOrder(onRide);

		res.status(201).json({
			onRide: onRideResult,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Failed to create order",
		});
	}
}

async function createOnCarOrder(req, res) {
	try {
		const { startPoint, endPoint, userId, capacity } = req.body;
		const onCar = new OnCarOrder(
			null,
			userId,
			startPoint,
			endPoint,
			false,
			capacity
		);

		const onCarResult = await orderService.createOnCarOrder(onCar);

		res.status(201).json({
			onCar: onCarResult,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Failed to create order",
		});
	}
}

async function completeOnRideOrder(req, res) {
	const { orderId, userId } = req.query;
	try {
		const result = await orderService.completeOnRideOrder(orderId);
		const account = await accountService.getAccountById(userId);

		await accountService.updateAccountBalance(
			userId,
			parseFloat(account.balance) - parseFloat(10000)
		);
		res.status(200).json({
			message: "OnRide order completed",
			result: result,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Failed to update OnRide order indicator",
		});
	}
}

async function completeOnCarOrder(req, res) {
	const { orderId, userId } = req.query;
	try {
		const result = await orderService.completeOnCarOrder(orderId);
		const order = await orderService.getOnCarOrderByOrderId(orderId);
		const account = await accountService.getAccountById(userId);
		let price = 0;

		if (order.capacity == 4) {
			price = 20000;
		} else if (order.capacity == 6) {
			price = 25000;
		} else if (order.capacity == 8) {
			price = 30000;
		}

		await accountService.updateAccountBalance(
			userId,
			parseFloat(account.balance) - parseFloat(price)
		);

		res.status(200).json({
			message: "OnCar order completed",
			result: result,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Failed to update OnCar order indicator",
		});
	}
}

export default {
	createOnRideOrder,
	createOnCarOrder,
	completeOnRideOrder,
	completeOnCarOrder,
};
