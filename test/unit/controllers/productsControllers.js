const sinon = require('sinon');
const { expect } = require('chai');
const productsServices = require('../../../services/productsServices');
const productsController = require('../../../controllers/productsController');

const fakeProducts = [{
  'id': 1,
  'name': 'produtoFake',
  'quantity': 15,
}];

describe('PRODUCTS CONTROLLER TESTS', () => {
  describe('Testa função getAll', () => {
    let request = {}, response = {}, next = {};
  
    describe('Quando não existem produtos ', () => {
  
      before(() => {
        sinon.stub(productsServices, 'getAll').resolves([]);
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
      });
  
      after(() => {
        productsServices.getAll.restore();
      });
  
      it('É retornado um status 200', async () => {
        await productsController.getAll(request, response, next);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
      it('É retornado um array vazio', async () => {
        await productsController.getAll(request, response, next);
        expect(response.json.calledWith([])).to.be.equal(true);
      });
    });
  
    describe('Quando existem produtos ', () => {
  
      before(() => {
        sinon.stub(productsServices, 'getAll').resolves(fakeProducts);
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
      })
  
      after(() => {
        productsServices.getAll.restore();
      });
  
      it('É retornado um status 200', async () => {
        await productsController.getAll(request, response, next);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
      it('É retornado um array de objetos com os produtos', async () => {
        await productsController.getAll(request, response, next);
        console.log(response.json);
        expect(response.json.calledWith(fakeProducts)).to.be.equal(true);
      });
    });
  });
  
  describe('Testa a função getById', () => {
    let response = {}, request = {}, next = {};
  
    describe('Quando o produto não existe no DB', () => {
  
      before(() => {
        sinon.stub(productsServices, 'getById').resolves(false);
        request.params = { id: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
      });
    
      after(() => {
        productsServices.getById.restore();
      });
  
      it('É retornado um status 404', async () => {
        await productsController.getById(request, response, next);
        expect(response.status.calledWith(404)).to.be.equal(true);
      });
      it('É retornado uma mensagem contendo "Product not found"', async () => {
        await productsController.getById(request, response, next);
        expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true); 
      });
    });
  
    describe('Quando o produto existe no DB', () => {
      before(() => {
        sinon.stub(productsServices, 'getById').resolves(fakeProducts[0]);
        request.params = { id: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
      });
    
      after(() => {
        productsServices.getById.restore();
      });
  
      it('É retornado um status 200', async () => {
        await productsController.getById(request, response, next);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
      it('É retornado um JSON com as informações do produto', async () => {
        await productsController.getById(request, response, next);
        expect(response.json.calledWith(fakeProducts[0])).to.be.equal(true); 
      });
    });
  
  });
    describe('Quando o produto foi criado', () => {
      
      let response = {}, request = {}, next = {};
  
      before(() => {
        sinon.stub(productsServices, 'createProduct').resolves(fakeProducts[0]);
        request.body = {
          name: fakeProducts[0].name,
          quantity: fakeProducts[0].quantity,
        };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
      });
    
      after(() => {
        productsServices.createProduct.restore();
      });
  
      it('É retornado um status 201', async () => {
        await productsController.createProduct(request, response, next);
        expect(response.status.calledWith(201)).to.be.equal(true);
      });
      it('É retornado um JSON com as informações do produto', async () => {
        await productsController.createProduct(request, response, next);
        expect(response.json.calledWith(fakeProducts[0])).to.be.equal(true); 
      });
    });
  });

