import { Router } from "express";
import {signUp, login, forgotPassword, resetPassword} from "../controller/auth.js";

const authRouter = new Router();

authRouter.post('/signup', signUp);
authRouter.post('/login', login);
authRouter.post('/forgot-password', forgotPassword);
authRouter.post('/reset-password/:id/:token', resetPassword);

export default authRouter;