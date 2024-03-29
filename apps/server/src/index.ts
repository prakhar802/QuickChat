import http from "http";
import SocketService from "./services/socket";
import {startMessageConsumer} from "./services/kafka"

async function init() {
    startMessageConsumer();
    const SocketServices = new SocketService();

    const httpServer = http.createServer();
    const PORT = process.env.PORT ? process.env.PORT : 8000;

    SocketServices.io.attach(httpServer);

    httpServer.listen(PORT, () =>
    console.log(`HTTP Server started at PORT:${PORT}`)
    );
    SocketServices.initListeners();
}

init();