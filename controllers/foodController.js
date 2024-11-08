import { foodService } from "../services/index.js";

async function getAllFoodShop(req, res) {
	try {
		const shop = await foodService.getAllFoodShop();
		if (!shop) {
			return res.status(404).json({ error: "No shop not found" });
		}
		res.status(200).json({
			message: "Successfully fetched Shop",
			data: shop,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
}

async function getAllFoodProduct(req, res) {
	try {
		const { shopId } = req.params;
		const product = await foodService.getAllFoodProduct(shopId);
		if (!product) {
			return res.status(404).json({ error: "No product not found" });
		}
		res.status(200).json({
			message: "Successfully fetched Products",
			data: product,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
}

export default { getAllFoodShop, getAllFoodProduct };
