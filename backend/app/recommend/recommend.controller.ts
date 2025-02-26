import { Request, Response } from "express";
import { recommendEvents } from "./recommend.trainModel";
import asyncHandler from "express-async-handler"
import path from "path";
import fs from "fs"

export const recommendation = asyncHandler(async (req: Request, res: Response) => {
    const { city, month, year } = req.body;

    if (!city || !month || !year) {
        res.status(400).json({ success: false, message: "All fields are required" });
        return
    }

    const recommendations = await recommendEvents(city, month, year);
    res.json({ success: true, message: "recommendation added successfully ", recommendations });
})


export const getEventData = asyncHandler(async (req: Request, res: Response) => {

    const filePath = path.join(__dirname, "../common/helper/events_dataset.json");
    const eventData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    if (!eventData) {
        res.status(401).json({
            success: false,
            message: "Event data not found",
        });
        return
    } else {
        res.status(200).json({
            success: true,
            message: "Event data fetched successfully",
            recommendations: eventData,
        });
        return
    }


});
