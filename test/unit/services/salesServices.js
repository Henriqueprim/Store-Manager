const sinon = require('sinon');
const { expect } = require('chai');

const salesModels = require('../../../models/salesModels');
const salesServices = require('../../../services/salesServices');

const fakeSales = [[
  {
      "saleId": 1,
      "productId": 1,
      "quantity": 5,
      "date": "2022-03-22T12:25:54.000Z"
  },
  {
      "saleId": 1,
      "productId": 2,
      "quantity": 10,
      "date": "2022-03-22T12:25:54.000Z"
  },
  {
      "saleId": 2,
      "productId": 3,
      "quantity": 15,
      "date": "2022-03-22T12:25:54.000Z"
  }
]];

describe('SALES SERVICES TESTS', () => {
  describe('Testa a função getAll', () => {
    describe('Quando não existem sales', () => {

      before(() => {
        sinon.stub(salesModels, 'getAll').resolves([]);
      });

      after(() => {
        salesModels.getAll.restore();
      });
      it('É retornado um array vazio', async () => {
        const result = await salesServices.getAll();
        expect(result).to.be.an('array');
        expect(result).to.be.empty;
      });
    });

    describe('Quando retorna todas as sales', () => {

      before(() => {
        sinon.stub(salesModels, 'getAll').resolves(fakeSales);
      });

      after(() => {
        salesModels.getAll.restore();
      });

      it('É retornado um array', async () => {
        const result = await salesServices.getAll();
        expect(result).to.be.an('array');
        expect(result).to.be.not.empty;
      });
      it('É retornado um array com objetos', async () => {
        const result = await salesServices.getAll();
        console.log(result);

        expect(result[0][0]).to.be.an('object');
        expect(result[0][1]).to.be.an('object');
      });
      it('Os obejtos tem as propriedades "saleId", "productId", "quantity" e "date"', async () => {
        const result = await salesServices.getAll();
        expect(result[0][0]).to.include.all.keys('saleId', 'productId', 'quantity','date');
        expect(result[0][1]).to.include.all.keys('saleId', 'productId', 'quantity','date');
      });
    });
  });
  describe('Testa a função getById', () => {

    const id = 1;

    before(() => {
      sinon.stub(salesServices, 'getById').resolves(fakeSales);
    });

    after(() => {
      salesServices.getById.restore();
    });

    it('É retonado o produto', async () => {
      const result = await salesServices.getById(id);
      expect(result[0]).to.be.equal(fakeSales[0]);
    });
    // it('É retornado um array com um único produto', async () => {
    //   const result = await productService.getById(id);
    //   expect(result).to.be.an('array');
    //   expect(result).to.have.length(1);
    // });
    // it('É retornado um array com um objeto', async () => {
    //   const result = await productService.getById(id);
    //   expect(result[0]).to.be.an('object');
    // });
  });
});