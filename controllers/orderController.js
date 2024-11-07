import { orderService } from "../services/index.js";
import { accountService } from "../services/index.js";
import { OnCarOrder, OnRideOrder } from "../models/index.js";

async function createOnRideOrder(req, res) {
    try {
        const { startPoint, endPoint, userId } = req.body;
        const onRide = new OnRideOrder(null, userId, startPoint, endPoint, false);

        const onRideResult = await orderService.createOnRideOrder(onRide);

        res.status(201).json({
            onRide: onRideResult
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
        const onCar = new OnCarOrder(null, userId, startPoint, endPoint, false, capacity);

        const onCarResult = await orderService.createOnCarOrder(onCar);

        res.status(201).json({
            onCar: onCarResult
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to create order",
        });
    }
}

async function getOnRideOrderByUserId(req, res) {
    const { userId } = req.params;
    try {
        const order = await orderService.getOnRideOrderByUserId(userId);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.status(200).json({
            message: "Successfully fetched order",
            data: order,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getOnCarOrderByUserId(req, res) {
    const { userId } = req.params;
    try {
        const order = await orderService.getOnCarOrderByUserId(userId);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.status(200).json({
            message: "Successfully fetched order",
            data: order,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function completeOnRideOrder(req, res) {
    const { orderId, userId } = req.query;
    try {
        const result = await orderService.completeOnRideOrder(orderId);
        await accountService.updateAccountBalance(userId, parseFloat(10000));
        res.status(200).json({
            message: "OnRide order completed",
            result: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update OnRide order indicator" });
    }
}

async function completeOnCarOrder(req, res) {
    const { orderId, userId } = req.query;
    try {
        const result = await orderService.completeOnCarOrder(orderId);
        const order = await orderService.getOnCarOrderByUserId(userId);
        const account = await accountService.getAccountById(userId);
        let price = 0;

        if (order.capacity == 4) {
          price = 20000;
        } else if (order.capacity == 6) {
          price = 25000;
        } else if (order.capacity == 8) {
          price = 30000;
        }

        await accountService.updateAccountBalance(userId, parseFloat(account.balance) - parseFloat(price));

        res.status(200).json({
            message: "OnCar order completed",
            result: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update OnCar order indicator" });
    }
}

export default { createOnRideOrder, createOnCarOrder, getOnRideOrderByUserId, getOnCarOrderByUserId, completeOnRideOrder, completeOnCarOrder };
