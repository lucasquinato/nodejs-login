import { Router } from "express";
import { signUpValidator } from "./account.validator.js";

export const accountRoutes = Router();

accountRoutes.post("/account/signup", signUpValidator);