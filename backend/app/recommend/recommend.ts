import { NlpManager } from "node-nlp";

// Sample event database
const eventDatabase = [
    { name: "Music Concert", city: "New York", category: "Music" },
    { name: "Tech Conference", city: "San Francisco", category: "Technology" },
    { name: "Food Festival", city: "New York", category: "Food" },
    { name: "Art Exhibition", city: "Los Angeles", category: "Art" },
    { name: "Comedy Night", city: "San Francisco", category: "Comedy" },
    { name: "Film Festival", city: "Los Angeles", category: "Movies" },
];

export async function recommendEvents(city: string) {
    const manager = new NlpManager({ languages: ["en"] });

    // Train NLP model with city-based events
    eventDatabase.forEach((event) => {
        manager.addDocument("en", `Show me events in ${event.city}`, event.name);
        manager.addDocument("en", `I want to attend an event in ${event.city}`, event.name);
    });

    // Train and process NLP model
    await manager.train();
    manager.save();

    // Get recommendations based on city
    const response = await manager.process("en", `I want to attend an event in ${city}`);

    if (response.intent) {
        return eventDatabase.filter(event => event.city.toLowerCase() === city.toLowerCase());
    }

    return [];
}
