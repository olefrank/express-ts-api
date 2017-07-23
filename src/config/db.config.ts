/* tslint:disable:object-literal-sort-keys */

import {ConnectionOptions} from "typeorm";
import * as path from "path";

const dev: ConnectionOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "api",
    entities: [
        path.join(__dirname, "../model/*.js"),
    ],
    autoSchemaSync: true,
};

const test: ConnectionOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "api_test",
    entities: [
        path.join(__dirname, "../model/*.ts"),
    ],
    autoSchemaSync: true,
};

export default {
    dev,
    test,
};
