import express from "express";
import { accountController } from "../controllers/index.js";

const accountRoutes = express.Router();
const API = "/account";

accountRoutes.get(
	API + "/getUserById/:userId",
	accountController.getAccountByUserId
);
accountRoutes.put(API + "/update", accountController.updateAccountBalance);

export default accountRoutes;
