import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

const { expect } = chai;
chai.use(chaiHttp);

describe('API endpoint /api/v1/signup', () => {
  it('should create a user account with 201 status', () => chai.request(app)
    .post('/api/v1/signup')
    .send({
      email: 'john.doe@gmail.com',
      firstName: 'John',
      LastName: 'Doe',
      password: 'avocados',
      address: 'KG 5 Avenue',
    })
    .then((res) => {
      expect(res).to.have.status(201);
      expect(res).to.be.json;
      expect(res.body.data.id).to.be.a('number');
      expect(res.body.data).to.be.an('object');
    }));
});
