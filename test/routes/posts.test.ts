/* tslint:disable:no-unused-expression */
/* tslint:disable:only-arrow-functions */

import {Application, Response} from "express";
import * as chai from "chai";
import chaiHttp = require("chai-http");

import App from "../../src/App";

import {Post} from "../../src/model/Post";
import {IDao, Dao} from "../../src/dao/Dao";

import * as sinon from "sinon";
import * as sinonTest from "sinon-test";
import {Connection, getConnectionManager} from "typeorm";

const test = sinonTest.configureTest(sinon);

chai.use(chaiHttp);
const expect = chai.expect;

const instance: IDao = Dao.Instance;

let express: Application;
const app: App = new App();

app.ready
    .then(() => {
        express = app.express;
    })
    .catch((err) => {
        console.error(err);
    });

setTimeout(() => {

    after((done) => {
        const conn: Connection = getConnectionManager().get();
        conn.close();
        done();
    })

    describe("Posts tests", () => {

        beforeEach((done) => {
            instance.setupTestPosts().then(done);
        });

        /**
         *  GET all posts
         */
        describe("GET api/v1/posts", () => {

            it("responds with array of 2 json objects", () => {
                return chai.request(express).get("/api/v1/posts")
                    .then((res: ChaiHttp.Response) => {
                        expect(res.status).to.equal(200);
                        expect(res).to.be.json;
                        expect(res.body).to.be.an("array");
                        expect(res.body.length).to.equal(2);
                    });
            });
        });

        /**
         *  GET single posts
         */
        describe("GET api/v1/posts/:id", () => {

            it("responds with single Post with id: 1", () => {
                return chai.request(express).get("/api/v1/posts/1")
                    .then((res: ChaiHttp.Response) => {
                        expect(res.status).to.equal(200);
                        const post: Post = res.body as Post;
                        expect(post.id).to.equal(1);
                    });
            });

            it("json object has correct shape", () => {
                return chai.request(express).get("/api/v1/posts/1")
                    .then((res: ChaiHttp.Response) => {
                        expect(res.status).to.equal(200);
                        expect(res).to.be.json;
                        expect(res.body).to.have.all.keys(["id", "author", "text"]);
                    });
            });

            it("should not have a Post with id 3", () => {
                return chai.request(express).get("/api/v1/posts/3")
                    .catch((err: any) => {
                        expect(err.status).to.equal(404);
                        expect(err.response.error.text).to.equal("Post with id: 3 not found");
                    });
            });
        });

    });

    run();
}, 500);

















//
// describe("POST api/v1/posts/:id", () => {
//
//     it("should create and store a Post", () => {
//         return chai.request(app)
//             .post("/api/v1/posts")
//             .send({})
//             .then((res: ChaiHttp.Response) => {
//                 expect(res.status).to.equal(200);
//                 expect(res).to.be.json;
//
//                 const post: Post = res.body as Post;
//
//                 expect(post).to.be.an("object");
//             });
//     });
//
//     it("should create and store a Post with correct values", async () => {
//         const author = "Ole";
//         const heading = "A heading";
//         const body = "A body text here...";
//         const data = {author, heading, body};
//
//         const res: ChaiHttp.Response = await chai.request(app)
//             .post("/api/v1/posts")
//             .send(data);
//
//         expect(res.status).to.equal(200);
//         expect(res.body).to.have.key("message");
//         expect(res.body.message).to.equal("Post Saved");
//     });
// });
//
// describe("PUT api/v1/posts/", () => {
//
//     it("should update a Post with id", async () => {
//         const author = "Mister";
//         const heading = "Change";
//         const body = "Change also here";
//         const id = 1;
//         const data = {author, heading, body, id};
//
//         // do PUT
//         const res: ChaiHttp.Response = await chai.request(app)
//             .put("/api/v1/posts")
//             .send(data);
//
//         expect(res.status).to.equal(200);
//         expect(res.body).to.have.key("message");
//         expect(res.body.message).to.equal("Post Updated");
//     });
// });
//
// describe("DELETE api/v1/posts/", () => {
//
//     it("should delete a Post with id 1", async () => {
//
//         // do DELETE
//         await chai.request(app).del("/api/v1/posts/1");
//
//         // do GET to see if deleted
//         return chai.request(app).get("/api/v1/posts/1")
//             .catch((res: Response) => {
//                 expect(res.status).to.equal(404);
//             });
//     });
// });
