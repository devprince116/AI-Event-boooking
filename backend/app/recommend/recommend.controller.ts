import { Request, Response } from "express";
import { recommendEvents } from "./recommend";
import asyncHandler from "express-async-handler"

export const recommendation = asyncHandler(async (req: Request, res: Response) => {
    const { city } = req.body;

    if (!city) {
        res.status(400).json({ success: false, message: "City is required" });
        return
    }

    const recommendations = await recommendEvents(city);
    res.json({ success: true, message: "recommendation added successfully ", recommendations });
})