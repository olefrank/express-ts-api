/* tslint:disable:object-literal-sort-keys */

import {Connection, ConnectionOptions} from "typeorm";
import {Post} from "../model/Post";
import * as path from "path";

const base: ConnectionOptions = {
    type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "",
        entities: [
            // path.join(__dirname, "../model/*.js"),
            Post
        ],
        autoSchemaSync: true,
}

const dev: ConnectionOptions = Object.assign({}, base, {
    entities: [
        path.join(__dirname, "../model/*.js"),
    ],
    database: "api",
});

const test: ConnectionOptions = Object.assign({}, base, {
    database: "api_test",
});

export default {
    dev,
    test,
};
