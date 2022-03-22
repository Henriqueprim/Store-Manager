const sinon = require('sinon');
const { expect } = require('chai');

const salesServices = require('../../../services/salesServices');
const salesController = require('../../../controllers/salesController');

const fakeSales =   [
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }
];

const fakeSalesResponse = {
  "id": 1,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 3
    }
  ]
};

describe('Testa função getAll', () => {
  let request = {}, response = {}, next = {};

  describe('Quando não existem sales ', () => {

    before(() => {
      sinon.stub(salesServices, 'getAll').resolves([]);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      salesServices.getAll.restore();
    });

    it('É retornado um status 200', async () => {
      await salesController.getAll(request, response, next);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('É retornado um array vazio', async () => {
      await salesController.getAll(request, response, next);
      expect(response.json.calledWith([])).to.be.equal(true);
    });
  });

  describe('Quando existem sales ', () => {

    before(() => {
      sinon.stub(salesServices, 'getAll').resolves(fakeSales);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    })

    after(() => {
      salesServices.getAll.restore();
    });

    it('É retornado um status 200', async () => {
      await salesController.getAll(request, response, next);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('É retornado um array de objetos com as sales', async () => {
      await salesController.getAll(request, response, next);
      console.log(response.json);
      expect(response.json.calledWith(fakeSales)).to.be.equal(true);
    });
  });
});

describe('Testa a função getById', () => {
  let response = {}, request = {}, next = {};

  describe('Quando a sale não existe no DB', () => {

    before(() => {
      sinon.stub(salesServices, 'getById').resolves([]);
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });
  
    after(() => {
      salesServices.getById.restore();
    });

    it('É retornado um status 404', async () => {
      await salesController.getById(request, response, next);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });
    it('É retornado uma mensagem contendo "Sale not found"', async () => {
      await salesController.getById(request, response, next);
      expect(response.json.calledWith({ message: 'Sale not found' })).to.be.equal(true); 
    });
  });

  describe('Quando a sale existe no DB', () => {
    before(() => {
      sinon.stub(salesServices, 'getById').resolves(fakeSales[0]);
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });
  
    after(() => {
      salesServices.getById.restore();
    });

    it('É retornado um status 200', async () => {
      await salesController.getById(request, response, next);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('É retornado um JSON com as informações da sale', async () => {
      await salesController.getById(request, response, next);
      expect(response.json.calledWith(fakeSales[0])).to.be.equal(true); 
    });
  });
});

describe('Testa a função createSale', () => {
  
  describe('Quando o produto foi criado', () => {
    
    let response = {}, request = {}, next = {};

    before(() => {
      sinon.stub(salesServices, 'createSale').resolves(fakeSalesResponse);
      request.body = [];
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });
  
    after(() => {
      salesServices.createSale.restore();
    });

    it('É retornado um status 201', async () => {
      await salesController.createSale(request, response, next);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });
    it('É retornado um JSON com as informações do produto', async () => {
      await salesController.createSale(request, response, next);
      expect(response.json.calledWith(fakeSalesResponse)).to.be.equal(true); 
    });
  });
});