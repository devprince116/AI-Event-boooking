import { Request, Response } from "express";
import { recommendEvents } from "./recommend.trainModel";
import asyncHandler from "express-async-handler"

export const recommendation = asyncHandler(async (req: Request, res: Response) => {
    const { city, month, year } = req.body;

    if (!city || !month || !year) {
        res.status(400).json({ success: false, message: "All fields are required" });
        return
    }

    const recommendations = await recommendEvents(city, month, year);
    res.json({ success: true, message: "recommendation added successfully ", recommendations });
})