import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

const { expect } = chai;
chai.use(chaiHttp);

describe('API endpoint /api/v1/loans', () => {
  it('should return all users', () => {
    return chai.request(app)
      .get('/api/v1/loans')
      .then(function (res) {
        expect(res).to.have.status(200);
      });
  });
});
