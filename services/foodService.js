import fs from 'fs/promises';
import path from 'path';
import { Product, Shop } from '../models/index.js';

const shopDbPath = path.resolve('db', 'shop.json');
const productDbPath = path.resolve('db', 'product.json');

async function readJsonFile(filePath) {
	try {
		const data = await fs.readFile(filePath, 'utf-8');
		return JSON.parse(data);
	} catch (error) {
		console.error(`Error reading file from disk: ${error}`);
		return [];
	}
}

async function getAllFoodShop() {
	try {
		const shopsData = await readJsonFile(shopDbPath);
		return shopsData.map(({ id, name, address, rating }) => new Shop(id, name, address, rating));
	} catch (error) {
		console.error("Error fetching all food shops:", error);
		throw new Error("Error fetching all food shops");
	}
}

async function getAllFoodProduct(shopId) {
	try {
		const productsData = await readJsonFile(productDbPath);
		const filteredProducts = productsData.filter(product => product.shopId == shopId);
		return filteredProducts.map(({ id, shopId, name, description, price }) =>
			new Product(id, shopId, name, description, price)
		);
	} catch (error) {
		console.error("Error fetching all food products:", error);
		throw new Error("Error fetching all food products");
	}
}

export default {
	getAllFoodShop,
	getAllFoodProduct,
};
