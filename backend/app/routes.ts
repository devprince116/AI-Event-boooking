import { Router } from "express";
import eventRoute from "./recommend/recommend.router"
const router = Router();

router.use("/events", eventRoute)

export default router;