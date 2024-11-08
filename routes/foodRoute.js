import express from "express";
import { foodController } from "../controllers/index.js";

const foodRoutes = express.Router();
const API = "/food";

foodRoutes.get(API + "/getAllFoodShop", foodController.getAllFoodShop);
foodRoutes.get(
	API + "/getAllFoodProduct/:shopId",
	foodController.getAllFoodProduct
);

export default foodRoutes;
