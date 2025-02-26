import { Router } from "express";
import * as recommendController from "./recommend.controller"
const router = Router();

router.post("/", recommendController.recommendation).get("/", recommendController.getEventData)

export default router