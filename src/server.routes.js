import { Router } from "express";
import { accountRoutes } from "./modules/account/account.routes.js";

export const routes = Router();

routes.use(accountRoutes);