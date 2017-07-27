import * as path from "path";
import * as express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import "reflect-metadata";
import PostRouter from "./routes/PostRouter";
import {Connection, ConnectionOptions, createConnection, getConnectionManager} from "typeorm";
import config from "./config";

// Creates and configures an ExpressJS web server.
class App {

    // when App is initialized
    public ready: Promise<any>;

    // ref to Express instance
    public express: express.Application;

    public connection: Connection;

    // Run configuration methods on the Express instance.
    constructor() {
        this.ready = new Promise((resolve, reject) => {
            if ( !this.connection ) {
                // connect to database
                const env: string = process.env.NODE_ENV || "dev";
                const options: ConnectionOptions = config.database[env] as ConnectionOptions;
                createConnection(options)
                    .then(async (connection) => {
                        this.connection = connection;
                        this.express = express();
                        this.middleware();
                        this.routes();
                        resolve();
                    })
                    .catch((err) => {
                        console.error(err);
                        reject(err);
                    });
            }
        });
    }

    // Configure Express middleware.
    private middleware(): void {

        // don't show logs when testing
        if (process.env.NODE_ENV !== "test") {
            this.express.use(logger("dev"));
        }
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: false}));
    }

    // Configure API endpoints.
    private routes(): void {
        this.express.use("/api/v1/posts", PostRouter);
    }

}

export default App;
