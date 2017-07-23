import * as path from "path";
import * as express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import "reflect-metadata";

// routers
import PostRouter from "./routes/PostRouter";

// Creates and configures an ExpressJS web server.
class App {

    // ref to Express instance
    public express: express.Application;

    // Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {

        // don't show logs when testing
        if ( process.env.NODE_ENV !== "test" ) {
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

export default new App().express;
