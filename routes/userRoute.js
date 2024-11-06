import express from "express";
import { userController } from "../controllers/index.js";

const userRoutes = express.Router();
const API = "/user";

userRoutes.get(API + "/getAllUser", userController.getUsers);
userRoutes.post(API + "/create", userController.createUser);
userRoutes.get(API + "/getUserById/:userId", userController.getUserById);
userRoutes.put(API + "/update", userController.updateUserById);
userRoutes.put(API + "/login", userController.login);

export default userRoutes;
