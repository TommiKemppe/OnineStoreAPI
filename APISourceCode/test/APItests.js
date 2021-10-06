//this file is used for Mocha and Chai tests
const chai = require('chai');
//var assert = require('assert');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('OnlineStoriAPI tests', function() {

    describe('GET /posting', function() {
        it('Should return all postings', function() {
            // send http request to server
            chai.request('http://localhost:3000')
                .get('/posting')
                .end(function(err, res) {
                    expect(err).to.be.null;
                    //check repsonse status
                    expect(res).to.have.status(200);
                })
        })
    })

    describe('GET /posting/:id', function() {
        it('Should return posting by id', function() {
            // send http request to server
            chai.request('http://localhost:3000')
                .get('/posting/63e24f86-f685-4315-8f93-56bfda29a6a5')
                .end(function(err, res) {
                    expect(err).to.be.null;
                    //check repsonse status
                    expect(res).to.have.status(200);
                })
        })
    })

    describe('GET /posting/category/:id', function() {
        it('Should return postings by category', function() {
            // send http request to server
            chai.request('http://localhost:3000')
                .get('/posting/category/Shoes')
                .end(function(err, res) {
                    expect(err).to.be.null;
                    //check repsonse status
                    expect(res).to.have.status(200);
                })
        })
    })

    describe('GET /posting/location/:location', function() {
        it('Should return postings by category', function() {
            // send http request to server
            chai.request('http://localhost:3000')
                .get('/posting/location/Oulu')
                .end(function(err, res) {
                    expect(err).to.be.null;
                    //check repsonse status
                    expect(res).to.have.status(200);
                })
        })
    })

    describe('GET /posting/date/:date', function() {
        it('Should return postings by category', function() {
            // send http request to server
            var d = new Date();
            var dateOfPostingString ='/posting/date/' + d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
            chai.request('http://localhost:3000')
                .get(dateOfPostingString)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    //check repsonse status
                    expect(res).to.have.status(200);
                })
        })
    })

    describe('POST /posting', function() {
        it('Should add a new posting', function() {
            // send http request to server
            var d = new Date();
            var dateOfPosting = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
            chai.request('http://localhost:3000')
                .post('/posting')
                .send({
                    postingId: '63e24f86-f685-4315-8f93-56bfda29a6b6', title: 'TestTitle', description: 'TestDesc', 
                    category: 'TestCategory', location: 'TestLocation', 
                    price: 23.00, postingDate: dateOfPosting, deliveryType: 1, 
                    firstName: 'TestFN', lastName: 'TestLN', email: 'Test@email.com',
                    phoneNumber: '04012333333', userId: 'test-user-id'
                })
                .end(function(err, res) {
                    expect(err).to.be.null;
                    //check repsonse status
                    expect(res).to.have.status(201);
                })
        })
    })
})

// describe('Array', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal([1, 2, 3].indexOf(4), -1);
//     });
//   });
// });
