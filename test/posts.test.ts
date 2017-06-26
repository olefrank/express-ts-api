/* tslint:disable:no-unused-expression */

import * as mocha from "mocha";
import {Response} from "express";
import * as chai from "chai";
import chaiHttp = require("chai-http");

import app from "../src/App";
import {Post} from "../src/model/Post";
import {PostVM} from "../src/viewmodel/PostVM";

chai.use(chaiHttp);
const expect = chai.expect;

describe("GET api/v1/posts", () => {

    it("responds with json array of Posts", () => {
        return chai.request(app).get("/api/v1/posts")
            .then((res: ChaiHttp.Response) => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;

                const json: object = JSON.parse(JSON.stringify(res.body));
                const post: Post = json as Post;

                expect(post).to.be.an("array");
                expect(post).to.have.length(2);
            });
    });

    it("should include a Post with id 2", () => {
        return chai.request(app).get("/api/v1/posts")
            .then((res: ChaiHttp.Response) => {
                const post: Post = res.body.find((post: Post) => post.id === 2);
                expect(post).to.exist;
                expect(post).to.have.all.keys([
                    "id",
                    "author",
                    "text",
                ]);
            });
    });
});

describe("GET api/v1/posts/:id", () => {

    it("responds with single Post", () => {
        return chai.request(app).get("/api/v1/posts/1")
            .then((res: ChaiHttp.Response) => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;

                const json: object = JSON.parse( JSON.stringify(res.body) );
                const post: Post = json as Post;

                expect(post).to.be.an("object");
            });
    });

    it("should return Post with id 1", () => {
        return chai.request(app).get("/api/v1/posts/1")
            .then((res: ChaiHttp.Response) => {
                const post = res.body as Post;
                expect(post.id).to.equal(1);
            });
    });

    it("should not have a Post with id 3", () => {
        return chai.request(app).get("/api/v1/posts/3")
            .catch((res: ChaiHttp.Response) => {
                expect(res.status).to.equal(404);
            });
    });
});

describe("POST api/v1/posts/:id", () => {

    it("should create and store a Post", () => {
        return chai.request(app)
            .post("/api/v1/posts")
            .send({})
            .then((res: ChaiHttp.Response) => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;

                const json: object = JSON.parse( JSON.stringify(res.body) );
                const post: Post = json as Post;

                expect(post).to.be.an("object");
            });
    });

    it("should create and store a Post with correct values", async () => {
        const author = "Ole";
        const heading = "A heading";
        const body = "A body text here...";
        const res: ChaiHttp.Response = await chai.request(app)
            .post("/api/v1/posts")
            .send({
                author,
                body,
                heading,
            });

        const json: object = JSON.parse( JSON.stringify(res.body) );
        const post: Post = json as Post;

        expect(post.id).to.equal(4);
        expect(post.author).to.equal(author);
        expect(post.heading).to.equal(heading);
        expect(post.body).to.equal(body);
    });
});

describe("PUT api/v1/posts/", () => {

    it("should update a Post with id", async () => {
        const author = "Mister";
        const heading = "Change";
        const body = "Change also here";
        const id = 1;

        // do PUT
        await chai.request(app)
            .put("/api/v1/posts")
            .send({
                author,
                body,
                heading,
                id,
            });

        // do GET to test if updated
        const res: ChaiHttp.Response = await chai.request(app).get("/api/v1/posts/1");
        const json: object = JSON.parse( JSON.stringify(res.body) );
        const post: PostVM = json as PostVM;

        expect(post.id).to.equal(1);
        expect(post.author).to.equal(author);
        expect(post.text).to.equal(body); // PostVM
        // expect(post.heading).to.equal(heading);
        // expect(post.body).to.equal(body);
    });
});

describe("DELETE api/v1/posts/", () => {

    it("should delete a Post with id 1", async () => {

        // do DELETE
        await chai.request(app).del("/api/v1/posts/1");

        // do GET to see if deleted
        return chai.request(app).get("/api/v1/posts/1")
            .catch((res: Response) => {
                expect(res.status).to.equal(404);
            });
    });
});
