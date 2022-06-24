const sinon = require('sinon');
const { expect } = require('chai');

const productsModels = require('../../../models/productsModels');
const productService = require('../../../services/productsServices');

const fakeProducts = [{
  'id': 1,
  'name': 'produtoFake',
  'quantity': 15,
}];

describe('PRODUCTS SERVICES TESTS', () => {
  describe('Testa a função getAll', () => {
    describe('Quando não existem produtos', () => {

      before(() => {
        sinon.stub(productsModels, 'getAll').resolves([]);
      });

      after(() => {
        productsModels.getAll.restore();
      });
      it('É retornado um array vazio', async () => {
        const result = await productService.getAll();
        expect(result).to.be.an('array');
        expect(result).to.be.empty;
      });
    });

    describe('Quando retorna todos os produtos', () => {

      before(() => {
        sinon.stub(productsModels, 'getAll').resolves(fakeProducts);
      });

      after(() => {
        productsModels.getAll.restore();
      });

      it('É retornado um array', async () => {
        const result = await productService.getAll();
        expect(result).to.be.an('array');
        expect(result).to.be.not.empty;
      });
      it('É retornado um array com objetos', async () => {
        const result = await productService.getAll();
        expect(result[0]).to.be.an('object');
        // expect(result[1]).to.be.an('object');
      });
      it('É retornado uma array que contém objetos com as keys "id", "name" e "quantity"', async () => {
        const result = await productService.getAll();
        expect(result[0]).to.include.all.keys('id', 'name', 'quantity');
      });
    });
  });
  describe('Testa a função getById', () => {

    const id = 1;

    before(() => {
      sinon.stub(productService, 'getById').resolves(fakeProducts[0]);
    });

    after(() => {
      productService.getById.restore();
    });

    it('É retonado o produto', async () => {
      const result = await productService.getById(id);
      expect(result).to.be.equal(fakeProducts[0]);
    });
  });
});
