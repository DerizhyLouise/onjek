import { conn } from "../config/mysql.js";
import { OnRideOrder, OnCarOrder } from "../models/index.js";

async function createOnRideOrder(onRideOrder) {
    if (!(onRideOrder instanceof OnRideOrder)) {
        throw new Error("Expected a On Ride Order instance");
    }
    try {
        return new Promise((resolve, reject) => {
            conn.query(
                "INSERT INTO onride_order (user_id, start_point, end_point, arrived_indicator) VALUES (?, ?, ?, ?)",
                [onRideOrder.userId, onRideOrder.startPoint, onRideOrder.endPoint, onRideOrder.arrivedIndicator],
                (err, results) => {
                    if (err) {
                        console.error(err);
                        throw new Error(err);
                    } else {
                        const newOrder = new OnRideOrder(results.insertId, results.user_id, results.start_point, results.end_point, results.arrived_indicator);
                        resolve(newOrder);
                    }
                }
            );
        });
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}

async function createOnCarOrder(onCarOrder) {
    if (!(onCarOrder instanceof OnCarOrder)) {
        throw new Error("Expected a On Car Order instance");
    }
    try {
        return new Promise((resolve, reject) => {
            conn.query(
                "INSERT INTO oncar_order (user_id, start_point, end_point, arrived_indicator, capacity) VALUES (?, ?, ?, ?, ?)",
                [onCarOrder.userId, onCarOrder.startPoint, onCarOrder.endPoint, onCarOrder.arrivedIndicator, onCarOrder.capacity],
                (err, results) => {
                    if (err) {
                        console.error(err);
                        throw new Error(err);
                    } else {
                        const newOrder = new OnCarOrder(results.insertId, results.user_id, results.start_point, results.end_point, results.arrived_indicator, results.capacity);
                        resolve(newOrder);
                    }
                }
            );
        });
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}

async function getOnRideOrderByUserId(userId) {
    try {
        return new Promise((resolve, reject) => {
            conn.query(
                "SELECT * FROM onride_order WHERE user_id = ?",
                [userId],
                (err, results) => {
                    if (err) {
                        console.error(err);
                        reject("Error fetching onride order by User ID");
                    }
                    if (results.length === 0) {
                        resolve(null);
                    } else {
                        const { id, user_id, start_point, end_point, arrived_indicator } = results[0];
                        const onRideOrder = new OnRideOrder(id, user_id, start_point, end_point, arrived_indicator);
                        resolve(onRideOrder);
                    }
                }
            );
        });
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}

async function getOnCarOrderByUserId(userId) {
    try {
        return new Promise((resolve, reject) => {
            conn.query(
                "SELECT * FROM oncar_order WHERE user_id = ?",
                [userId],
                (err, results) => {
                    if (err) {
                        console.error(err);
                        reject("Error fetching oncar order by User ID");
                    }
                    if (results.length === 0) {
                        resolve(null);
                    } else {
                        const { id, user_id, start_point, end_point, arrived_indicator, capacity } = results[0];
                        const onCarOrder = new OnCarOrder(id, user_id, start_point, end_point, arrived_indicator, capacity);
                        resolve(onCarOrder);
                    }
                }
            );
        });
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}

async function completeOnRideOrder(orderId) {
    try {
        return new Promise((resolve, reject) => {
            conn.query(
                "UPDATE onride_order SET arrived_indicator = true WHERE id = ?",
                [orderId],
                (err, results) => {
                    if (err) {
                        console.error(err);
                        reject("Error updating onride order indicator");
                    } else if (results.affectedRows === 0) {
                        reject("No onride order found for the given ID");
                    } else {
                        resolve("OnRide order indicator updated successfully");
                    }
                }
            );
        });
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}

async function completeOnCarOrder(orderId) {
    try {
        return new Promise((resolve, reject) => {
            conn.query(
                "UPDATE oncar_order SET arrived_indicator = true WHERE id = ?",
                [orderId],
                (err, results) => {
                    if (err) {
                        console.error(err);
                        reject("Error updating oncar order indicator");
                    } else if (results.affectedRows === 0) {
                        reject("No oncar order found for the given ID");
                    } else {
                        resolve("OnCar order indicator updated successfully");
                    }
                }
            );
        });
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}


export default {
    getOnRideOrderByUserId,
    getOnCarOrderByUserId,
    createOnRideOrder,
    createOnCarOrder,
    completeOnRideOrder,
    completeOnCarOrder
};
