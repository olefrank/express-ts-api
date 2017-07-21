import {Connection, createConnection} from "typeorm";
import * as path from "path";
import {Post} from "../model/Post";

export class Db {

    private static instance: Db;

    private constructor() {}

    static get Instance() {
        if (this.instance === null || this.instance === undefined) {
            this.instance = new Db();
        }
        return this.instance;
    }

    public async getConnection(): Promise<Connection> {
        return createConnection({
                autoSchemaSync: true,
                database: "api",
                entities: [
                    Post,
                    // path.join(__dirname, "..", "model/*.js")
                ],
                host: "localhost",
                password: "",
                port: 3306,
                type: "mysql",
                username: "root",
            });
    }

}