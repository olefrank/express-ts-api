import * as http from "http";
import * as debug from "debug";

import App from "./App";
import {Server} from "net";
import {Application} from "express";
import {Connection} from "typeorm";

debug("ts-express:server");

let port: number | string | boolean;
let server: Server;
let express: Application;

const app = new App();

app.ready.then((connection) => {
    express = app.express;
    this.connection = connection;

    port = normalizePort(process.env.PORT || 3000);
    express.set("port", port);

    server = http.createServer(express);
    server.listen(port);
    server.on("error", onError);
    server.on("listening", onListening);
});

function normalizePort(val: number | string): number | string | boolean {
    const port: number = (typeof val === "string") ? parseInt(val, 10) : val;
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return false;
}

function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== "listen") throw error;
    const bind = (typeof port === "string") ? "Pipe " + port : "Port " + port;

    switch (error.code) {
        case "EACCES":
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening(): void {
    const addr = server.address();
    const bind = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}
