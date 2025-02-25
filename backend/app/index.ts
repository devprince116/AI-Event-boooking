import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import routes from "./routes"
import { loadConfig } from "./common/helper/config.helper";
dotenv.config();
loadConfig()
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  define origin and methods
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}));

//  send a json response on server start
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Server is up."
    })
})

//  define routes
app.use("/api/v1", routes)

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});
