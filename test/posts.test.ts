import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';
import {Post} from '../src/model/Post';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET api/v1/posts', () => {
    /**
     * GET all posts
     */
    it('responds with array of Posts', () => {
        return chai.request(app).get('/api/v1/posts')
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                const posts = res.body as Post[];
                expect(posts).to.be.an('array');
                expect(posts).to.have.length(2);
            });
    });
    it('should include a Post with id 2', () => {
        return chai.request(app).get('/api/v1/posts')
            .then(res => {
                const post: Post = res.body.find((post: Post) => post.id === 2);
                expect(post).to.exist;
                expect(post).to.have.all.keys([
                    'id',
                    'author',
                    'heading',
                    'body'
                ]);
            });
    });

    /**
     * GET one post
     */
    describe('GET api/v1/posts/:id', () => {
        it('responds with single Post', () => {
            return chai.request(app).get('/api/v1/posts/1')
                .then(res => {
                    expect(res.status).to.equal(200);
                    expect(res).to.be.json;

                    const post = res.body as Post;
                    expect(post).to.be.an('object');
                });
        });
        it('should return Post with id 1', () => {
            return chai.request(app).get('/api/v1/posts/1')
                .then(res => {
                    const post = res.body as Post;
                    expect(post.id).to.equal(1);
                });
        });
        it('should not have a Post with id 3', () => {
            return chai.request(app).get('/api/v1/posts/3')
                .catch(res => {
                    expect(res.status).to.equal(404);
                });
        });
    });

    /**
     * CREATE a post
     */
    describe('POST api/v1/posts/:id', () => {
        it('should create and store a Post', () => {
            return chai.request(app)
                .post('/api/v1/posts')
                .send({})
                .then(res => {
                    expect(res.status).to.equal(200);
                    expect(res).to.be.json;

                    const post = res.body as Post;
                    expect(post).to.be.an('object');
                });
        });
        it('should create and store a Post with correct values', async () => {
            const author = "Ole";
            const heading = "A heading";
            const body = "A body text here...";
            const res = await chai.request(app)
                .post('/api/v1/posts')
                .send({
                    author,
                    heading,
                    body
                });
            const post = res.body as Post;
            expect(post.id).to.equal(4);
            expect(post.author).to.equal(author);
            expect(post.heading).to.equal(heading);
            expect(post.body).to.equal(body);
        });
    });

    /**
     * UPDATE a post
     */
    describe('PUT api/v1/posts/', () => {
        it('should update a Post with id', async () => {
            const author = "Mister";
            const heading = "Change";
            const body = "Change also here";
            const id = 1;

            // do PUT
            await chai.request(app)
                .put('/api/v1/posts')
                .send({
                    author,
                    heading,
                    body,
                    id
                });

            // do GET to test if updated
            const res = await chai.request(app).get('/api/v1/posts/1');
            const post = res.body as Post;
            expect(post.id).to.equal(1);
            expect(post.author).to.equal(author);
            expect(post.heading).to.equal(heading);
            expect(post.body).to.equal(body);
        });
    });

    /**
     * DELETE a post
     */
    describe('DELETE api/v1/posts/', () => {
        it('should delete a Post with id 1', async () => {

            // do DELETE
            await chai.request(app).del('/api/v1/posts/1');

            // do GET to see if deleted
            return chai.request(app).get('/api/v1/posts/1')
                .catch(res => {
                    expect(res.status).to.equal(404);
                });
        });
    });
});
