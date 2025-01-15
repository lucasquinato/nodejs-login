import database from "./src/configs/database.js";
import { routes } from "./src/server.routes.js";
import cookieParser from "cookie-parser";
import express from "express";

const $Server = express();
const $Port = Number(process.env.SERVER_PORT) || 3000;

$Server.use(express.urlencoded({ extended: true }));
$Server.use(express.json());
$Server.use(cookieParser());

$Server.use(routes);

(async function() {
    try {

        await database.sync({ force: true });
        $Server.listen($Port, () => console.log(`Server running at port:${$Port}`));

    } catch (error) {
        console.error(error);

        console.error("Initialization error");
        console.error("Error details:", error.message);
    }
})()