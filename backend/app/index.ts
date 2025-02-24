import express from "express";
import dotenv from "dotenv";
import routes from "./routes"
import { loadConfig } from "./common/helper/config.helper";

dotenv.config();
loadConfig()
const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(require("cors")());
app.use("/api/v1", routes)


app.post("/recommend-events",);

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});
