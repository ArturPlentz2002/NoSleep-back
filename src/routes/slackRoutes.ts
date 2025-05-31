// src/routes/slackRoutes.ts
import { Router } from "express";
import { slackController } from "../controllers/slackController";

const router = Router();

router.get("/users", slackController.getUsers);

export default router;
