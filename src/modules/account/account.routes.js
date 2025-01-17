import { Router } from "express";
import { signUpValidator } from "./account.validator.js";
import { signUp } from "./account.controller.js";

export const accountRoutes = Router();

accountRoutes.post("/account/signup", signUpValidator, signUp);
