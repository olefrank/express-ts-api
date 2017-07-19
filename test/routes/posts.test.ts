/* tslint:disable:no-unused-expression */
/* tslint:disable:only-arrow-functions */

import {Response} from "express";
import * as chai from "chai";
import chaiHttp = require("chai-http");

import app from "../../src/App";
import {Post} from "../../src/model/Post";

import {IDao, Dao} from "../../src/dao/Dao";

import * as sinon from "sinon";
import * as sinonTest from "sinon-test";

const test = sinonTest.configureTest(sinon);

chai.use(chaiHttp);
const expect = chai.expect;

const instance: IDao = Dao.getInstance();

const data = [
    {
        author: "A1",
        body: "Body1",
        heading: "Heading1",
        id: 1,
    },
    {
        author: "A2",
        body: "Body2",
        heading: "Heading2",
        id: 2,
    },
    {
        author: "A3",
        body: "Body3",
        heading: "Heading3",
        id: 3,
    },
];

describe("GET api/v1/posts", test(function() {

    sinon.stub(instance, "getAllPosts").returns(data);

    it("responds with json array of Posts", () => {
        return chai.request(app).get("/api/v1/posts")
            .then((res: ChaiHttp.Response) => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;

                // convert to Post
                const posts: Post = res.body as Post;

                expect(posts).to.be.an("array");
                expect(posts).to.have.length(3);
            });
    });

    it("posts should have the correct keys", () => {
        return chai.request(app).get("/api/v1/posts")
            .then((res: ChaiHttp.Response) => {
                const post: Post = res.body[0];
                const numKeys = Object.keys(post).length;
                expect(numKeys).to.equal(3);
                expect(post).to.have.all.keys([
                    "id",
                    "author",
                    "text",
                ]);
            });
    });
}));

describe("GET api/v1/posts/:id", test(function() {

    const stub: sinon.SinonStub = sinon.stub(instance, "getPostById").returns(data);
    stub.withArgs(1).returns(data[0]);
    stub.withArgs(99999).callThrough();

    it("responds with single Post with id: 1", test(function() {
        return chai.request(app).get("/api/v1/posts/1")
            .then((res: ChaiHttp.Response) => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;

                const post: Post = res.body as Post;

                expect(post.id).to.equal(1);
            });
    }));

    it("should not have a Post with id 99999", () => {
        return chai.request(app).get("/api/v1/posts/99999")
            .catch((res: ChaiHttp.Response) => {
                expect(res.status).to.equal(404);
            });
    });
}));

describe("POST api/v1/posts/:id", () => {

    it("should create and store a Post", () => {
        return chai.request(app)
            .post("/api/v1/posts")
            .send({})
            .then((res: ChaiHttp.Response) => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;

                const post: Post = res.body as Post;

                expect(post).to.be.an("object");
            });
    });

    it("should create and store a Post with correct values", async () => {
        const author = "Ole";
        const heading = "A heading";
        const body = "A body text here...";
        const data = {author, heading, body};

        const res: ChaiHttp.Response = await chai.request(app)
            .post("/api/v1/posts")
            .send(data);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.key("message");
        expect(res.body.message).to.equal("Post Saved");
    });
});

describe("PUT api/v1/posts/", () => {

    it("should update a Post with id", async () => {
        const author = "Mister";
        const heading = "Change";
        const body = "Change also here";
        const id = 1;
        const data = {author, heading, body, id};

        // do PUT
        const res: ChaiHttp.Response = await chai.request(app)
            .put("/api/v1/posts")
            .send(data);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.key("message");
        expect(res.body.message).to.equal("Post Updated");
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
