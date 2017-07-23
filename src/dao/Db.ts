import {Connection, ConnectionOptions, createConnection} from "typeorm";
import config from "../config";

export class Db {

    private static instance: Db;
    private connection: Promise<Connection>;

    private constructor() {}

    static get Instance() {
        if (this.instance === null || this.instance === undefined) {
            this.instance = new Db();
        }
        return this.instance;
    }

    public getConnection(): Promise<Connection> {
        const env: string = process.env.NODE_ENV || "dev";
        const options: ConnectionOptions = config.database[env] as ConnectionOptions;

        if (!this.connection) {
            return createConnection(options);
        }
        else return this.connection;
    }

}