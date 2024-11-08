import fs from 'fs/promises';
import path from 'path';
import { OnRideOrder, OnCarOrder } from '../models/index.js';
import { v4 as uuidv4 } from 'uuid';

const onRideOrderDbPath = path.resolve('db', 'onride_order.json');
const onCarOrderDbPath = path.resolve('db', 'oncar_order.json');

async function readJsonFile(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading file from disk: ${error}`);
        return [];
    }
}

async function writeJsonFile(filePath, data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error(`Error writing file to disk: ${error}`);
    }
}

async function createOnRideOrder(onRideOrder) {
    if (!(onRideOrder instanceof OnRideOrder)) {
        throw new Error("Expected an OnRideOrder instance");
    }
    const orders = await readJsonFile(onRideOrderDbPath);
    const newOrder = { ...onRideOrder, id: uuidv4() };
    orders.push(newOrder);
    await writeJsonFile(onRideOrderDbPath, orders);
    return newOrder;
}

async function createOnCarOrder(onCarOrder) {
    if (!(onCarOrder instanceof OnCarOrder)) {
        throw new Error("Expected an OnCarOrder instance");
    }
    const orders = await readJsonFile(onCarOrderDbPath);
    const newOrder = { ...onCarOrder, id: uuidv4() };
    orders.push(newOrder);
    await writeJsonFile(onCarOrderDbPath, orders);
    return newOrder;
}

async function getOnCarOrderByOrderId(orderId) {
    const orders = await readJsonFile(onCarOrderDbPath);
    const order = orders.find(order => order.id === orderId) || null;
    return order ? new OnCarOrder(order.id, order.userId, order.startPoint, order.endPoint, order.arrivedIndicator, order.capacity) : null;
}

async function completeOnRideOrder(orderId) {
    const orders = await readJsonFile(onRideOrderDbPath);
    const orderIndex = orders.findIndex(order => order.id === orderId);
    if (orderIndex === -1) throw new Error("No onride order found for the given ID");

    orders[orderIndex].arrivedIndicator = true;
    await writeJsonFile(onRideOrderDbPath, orders);
    return "OnRide order indicator updated successfully";
}

async function completeOnCarOrder(orderId) {
    const orders = await readJsonFile(onCarOrderDbPath);
    const orderIndex = orders.findIndex(order => order.id === orderId);
    if (orderIndex === -1) throw new Error("No oncar order found for the given ID");

    orders[orderIndex].arrivedIndicator = true;
    await writeJsonFile(onCarOrderDbPath, orders);
    return "OnCar order indicator updated successfully";
}

export default {
    getOnCarOrderByOrderId,
    createOnRideOrder,
    createOnCarOrder,
    completeOnRideOrder,
    completeOnCarOrder
};
