process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
const User = require('./models/user');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./server');
const { expect } = require("chai");
let should = chai.should();

chai.use(chaiHttp);

// describe('Login API', () => {
// beforeEach((done) => {
//     Book.remove({}, (err) => {
//         done();
//     });
// });

// describe('/GET book', () => {
//     it('it should GET all the books', (done) => {
//         chai.request(server)
//             .get('/book')
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a('array');
//                 res.body.length.should.be.eql(0);
//                 done();
//             });
//     });
// });
/*
 * Test the /POST route
 */
describe('/POST login', () => {

    it('Check if login API is fired properly', (done) => {
        let userObj = {
            email: "",
            password: ""
        }
        chai.request(server)
            .post('/api/accounts/login')
            .send(userObj)
            .end((err, res) => {
                // console.log(res);

                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.should.have.property('message');

                done();
            });
    });


    it('Check if login API validates test username and password', (done) => {

        //Create user object with already available user.
        let testUserObject = {
            email: "nethug19@gmail.com",
            password: "support123"
        }

        chai.request(server)
            .post('/api/accounts/login')
            .send(testUserObject)
            .end((err, res) => {
                // console.log(res);

                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.should.have.property('message');
                expect(res.body.success).to.be.true;
                expect(res.body.message).to.not.be.null;

                done();
            });

    });

    it('Check if login API validates test username and password and returns a token and the logged in email', (done) => {

        //Create user object with known valid credentials.
        let testUserObjectValid = {
            email: "nethug19@gmail.com",
            password: "support123"
        }

        //Create user object with known invalid credentials.
        let testUserObjectInvalid = {
            email: "nethug19@gmail.com",
            password: "support123"
        }

        chai.request(server)
            .post('/api/accounts/login')
            .send(testUserObjectValid)
            .end((err, res) => {
                // console.log(res.body.token);

                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.should.have.property('token');
                res.body.should.have.property('message');
                expect(res.body.success).to.be.true;
                expect(res.body.token).to.be.not.null;
                expect(res.body.email).to.be.not.null;
                expect(res.body.email).to.be.equal(testUserObjectValid.email);

                done();
            });
    });

});


describe('/POST signup', () => {

    it('Check if signup API is fired properly', (done) => {
        let userObj = {
            email: "",
            password: "",
            name: "",
            picture: "",
            isSeller: false
        }
        chai.request(server)
            .post('/api/accounts/signup')
            .send(userObj)
            .end((err, res) => {
                // console.log(res);

                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.should.have.property('message');

                done();
            });
    });


    it('Check if signup API validates existing username', (done) => {

        //Create user object with already available user.
        let testUserObject = {
            email: "nethug19@gmail.com",
            password: "",
            name: "",
            picture: "",
            isSeller: false
        }
        chai.request(server)
            .post('/api/accounts/signup')
            .send(testUserObject)
            .end((err, res) => {
                console.log(res.message);

                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.should.have.property('message');
                expect(res.body.success).to.be.false;
                expect(res.body.message).to.not.be.null;

                done();
            });

    });

    it('Check if signup API inserts valid record.', (done) => {

        //Create user object with known valid credentials.
        let testUserObject = {
            email: "digicolabslk2@gmail.com",
            password: "123456",
            name: "Digico Test",
            picture: "",
            isSeller: false
        }

        chai.request(server)
            .post('/api/accounts/signup')
            .send(testUserObject)
            .end((err, res) => {
                // console.log(res.body.token);

                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.should.have.property('token');
                res.body.should.have.property('message');
                expect(res.body.success).to.be.true;
                expect(res.body.token).to.be.not.null;
                expect(res.body.message).to.be.not.null;

                done();
            });
    });

});