import { Router } from "express";
import * as recommendController from "./recommend.controller"
const router = Router();

router.post("/", recommendController.recommendation)

export default router