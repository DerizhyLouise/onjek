import { conn } from "../config/mysql.js";
import { Product, Shop } from "../models/index.js";

async function getAllFoodShop() {
	try {
		return new Promise((resolve, reject) => {
			conn.query("SELECT * FROM shop", (err, results) => {
				if (err) {
					console.error(err);
					reject("Error fetching all food shops");
				} else if (results.length === 0) {
					resolve([]);
				} else {
					const shops = results.map(
						({ id, name, address, rating }) =>
							new Shop(id, name, address, rating)
					);
					resolve(shops);
				}
			});
		});
	} catch (error) {
		console.error(error);
		throw new Error(error);
	}
}

async function getAllFoodProduct(shopId) {
	try {
		return new Promise((resolve, reject) => {
			conn.query(
				"SELECT * FROM product WHERE shop_id = ?",
				[shopId],
				(err, results) => {
					if (err) {
						console.error(err);
						reject("Error fetching all food products");
					} else if (results.length === 0) {
						resolve([]);
					} else {
						const products = results.map(
							({ id, shop_id, name, description, price }) =>
								new Product(
									id,
									shop_id,
									name,
									description,
									price
								)
						);
						resolve(products);
					}
				}
			);
		});
	} catch (error) {
		console.error("Error in getAllFoodProduct:", error);
		throw new Error(error);
	}
}

export default {
	getAllFoodShop,
	getAllFoodProduct,
};
