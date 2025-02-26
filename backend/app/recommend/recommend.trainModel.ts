import { NlpManager } from "node-nlp";
import fs from "fs";
import path from "path";

const datasetPath = path.resolve(__dirname, "../common/helper/events_dataset.json");

//   create interface of event
interface Event {
    id: number;
    heading: string;
    date: { year: number; month: string };
    location: string;
    category: "conference" | "workshop" | "concert";
    description: string;
    img: string;
}

//  create months object for filtering over months using AI
const months: { [key: string]: number } = {
    "january": 1, "february": 2, "march": 3, "april": 4,
    "may": 5, "june": 6, "july": 7, "august": 8,
    "september": 9, "october": 10, "november": 11, "december": 12
};


// fetch dataset from json file
let eventDatabase: Event[] = [];
try {
    eventDatabase = JSON.parse(fs.readFileSync(datasetPath, "utf-8"));
    console.log("Dataset loaded successfully");
} catch (err) {
    console.error("Error loading events dataset:", err);
    process.exit(1);
}

export async function recommendEvents(
    city: string,
    registeredMonth: string,
    registeredYear: number
): Promise<{ data: { requestedEvents: Event[]; nearestEvents: Event[]; futureEvents: Event[] } }> {
    const manager = new NlpManager({ languages: ["en"] });

    // Train NLP model with event-related queries
    eventDatabase.forEach((event: Event) => {
        const location = event.location.split(",")[0].toLowerCase();
        manager.addDocument("en", `Find events in ${location} this ${event.date.month} ${event.date.year}`, "event.search");
        manager.addDocument("en", `Show me events in ${location} in ${event.date.month} ${event.date.year}`, "event.search");
    });

    await manager.train();
    manager.save();

    const cityName = city.split(",")[0].toLowerCase();

    const registeredMonthNum = months[registeredMonth.toLowerCase()] || 1;

    // AI-based response
    const response = await manager.process("en", `Find events in ${cityName} this ${registeredMonth} ${registeredYear}`);
    // console.log("NLP response: ", response);

    //  get requested Events;
    const requestedEvents = eventDatabase.filter(event => {
        const eventMonthNum = months[event.date.month.toLowerCase()];
        return (
            event.location.toLowerCase().includes(cityName) &&
            event.date.year === registeredYear &&
            eventMonthNum === registeredMonthNum
        );
    });

    //  show Nearest Events
    const nearestEvents = eventDatabase.filter(event => {
        const eventMonthNum = months[event.date.month.toLowerCase()];
        return (
            event.date.year === registeredYear &&
            eventMonthNum === registeredMonthNum &&
            !event.location.toLowerCase().includes(cityName)
        );
    });

    //  show future events
    const futureEvents = eventDatabase.filter(event => {
        const eventMonthNum = months[event.date.month.toLowerCase()];
        return (
            event.date.year > registeredYear ||
            (event.date.year === registeredYear && eventMonthNum > registeredMonthNum)
        );
    });

    if (requestedEvents.length === 0) {
        return {
            data: {
                requestedEvents: [],
                nearestEvents,
                futureEvents
            }
        };
    }

    return {
        data: {
            requestedEvents,
            nearestEvents,
            futureEvents
        }
    };
}


