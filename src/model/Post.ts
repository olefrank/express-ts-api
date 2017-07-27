import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

export interface IPost {
    id: number;
    author: string;
    heading: string;
    body: string;
}

/**
 * Class to model a blog post
 */
@Entity()
export class Post implements IPost {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public author: string;

    @Column()
    public heading: string;

    @Column("text")
    public body: string;

    constructor(author: string, heading: string, body: string, id?: number) {
        this.author = author;
        this.heading = heading;
        this.body = body;
        this.id = id;
    }
}
