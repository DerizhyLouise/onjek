import express from "express";
import { orderController } from "../controllers/index.js";

const orderRoutes = express.Router();
const API = "/order";

orderRoutes.post(API + "/createOnRideOrder", orderController.createOnRideOrder);
orderRoutes.post(API + "/createOnCarOrder", orderController.createOnCarOrder);
orderRoutes.put(API + "/completeOnRideOrder", orderController.completeOnRideOrder);
orderRoutes.put(API + "/completeOnCarOrder", orderController.completeOnCarOrder);

export default orderRoutes;
