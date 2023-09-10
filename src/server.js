import express from "express";
require("dotenv").config();
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
const app = express();
const PORT = process.env.PORT || 8080;
configViewEngine(app);
initWebRoutes(app);

app.listen(PORT, () => {
    console.log(">>> running " + PORT);
})