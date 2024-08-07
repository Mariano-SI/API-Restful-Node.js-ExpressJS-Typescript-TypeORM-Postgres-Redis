import { Router } from "express";
import {celebrate, Joi, Segments} from "celebrate";
import SessionsController from "../controller/SessionsController";
import ForgotPasswordController from "../controller/ForgotPasswordController";

const passwordRoutes = Router();

const forgotPasswordController = new ForgotPasswordController();

passwordRoutes.post(
    "/forgot",
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
        }
    }),
    forgotPasswordController.create
);

export default passwordRoutes;