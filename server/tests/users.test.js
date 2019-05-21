import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

const { expect } = chai;
chai.use(chaiHttp);

describe('Signing up and signing in', () => {
  describe('API endpoint /api/v1/signup', () => {
    it('should create an account', (done) => {
      chai.request(app)
        .post('/api/v1/signup')
        .send({
          email: 'john.doe@gmail.com',
          firstName: 'John',
          lastName: 'Doe',
          password: 'avocados',
          address: 'KG 5 Avenue',
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res).to.be.an('object');
          expect(res.body.data.id).to.be.a('number');
          if (err) {
            return done();
          }
          done();
        });
    });

    it('should check for an existiing user', (done) => {
      chai.request(app)
        .post('/api/v1/signup')
        .send({
          email: 'john.doe@gmail.com',
          firstName: 'John',
          lastName: 'Doe',
          password: 'avocados',
          address: 'KG 5 Avenue',
        })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res).to.be.an('object');
          if (err) {
            return done();
          }
          done();
        });
    });
  });

  describe('API endpoint /api/v1/signin', () => {
    it('should check if account is available', (done) => {
      chai.request(app)
        .post('/api/v1/signin')
        .send({
          email: 'otherperson@gmail.com',
          password: 'avocados',
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res).to.be.an('object');
          if (err) {
            return done();
          }
          done();
        });
    });

    it('should check passwords match', (done) => {
      chai.request(app)
        .post('/api/v1/signin')
        .send({
          email: 'john.doe@gmail.com',
          password: 'notavocados',
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res).to.be.an('object');
          if (err) {
            return done();
          }
          done();
        });
    });
  });
});
