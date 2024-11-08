import express from "express";
import { accountController } from "../controllers/index.js";

const accountRoutes = express.Router();
const API = "/account";

accountRoutes.get(
	API + "/getAccountByUserId/:userId",
	accountController.getAccountByUserId
);
accountRoutes.put(API + "/topup", accountController.topup);
accountRoutes.put(API + "/transfer", accountController.transfer);

export default accountRoutes;
