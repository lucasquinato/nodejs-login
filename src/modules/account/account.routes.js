import { Router } from "express";
import { logInValidator, signUpValidator } from "./account.validator.js";
import { logIn, signUp } from "./account.controller.js";

export const accountRoutes = Router();

accountRoutes.post("/account/signup", signUpValidator, signUp);
accountRoutes.post("/account/login", logInValidator, logIn);