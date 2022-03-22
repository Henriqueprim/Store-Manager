const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const salesModels = require('../../../models/salesModels');

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

describe('SALES MODELS TESTS', () => {
  describe('Testa a função getAll', () => {
    describe('Quando há sales no DB', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves(fakeSales);
      });
  
      after(() => {
        connection.execute.restore();
      });
  
      it('É retornado um array não vazio', async () => {
        const result = await salesModels.getAll();
        console.log('aqui');
        expect(result).to.be.an('array');
        expect(result).to.be.not.empty;
      });
  
      it('É retornado um array de objetos', async () => {
        const result = await salesModels.getAll();
  
        expect(result[0]).to.be.an('object');
        expect(result[1]).to.be.an('object');
      });
  
      it('Os obejtos tem as propriedades "saleId", "productId", "quantity" e "date"', async () => {
        const result = await salesModels.getAll();
  
        expect(result[0]).to.include.all.keys('saleId', 'productId', 'quantity','date');
        expect(result[1]).to.include.all.keys('saleId', 'productId', 'quantity','date');
      });
    })
    
  });

  describe('Testa a função getById', () => {
    describe('Quando a sale existe no DB', () => {
      const saleId = 1;

      before(() => {
        sinon.stub(connection, 'execute').resolves(fakeSales[0]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('É retornado um objeto', async () => {
        const result = await salesModels.getById(saleId);

        expect(result).to.be.an('object');
      });

      it('Os obejtos tem as propriedades "saleId", "productId" e "quantity" e "date"', async () => {
        const result = await salesModels.getById(saleId);

        expect(result).to.include.all.keys('saleId', 'productId', 'quantity','date');
      });
    });

    describe('Quando a sale não existe no DB', () => {
      const saleId = 5;
      const notFoundGetByIdRes = [[]];

      before(() => {
        sinon.stub(connection, 'execute').resolves(notFoundGetByIdRes);
      });

      after(() => {
        connection.execute.restore();
      });

      it('É retornado undefined', async () => {
        const result = await salesModels.getById(saleId);

        expect(result).to.be.an('array');
        expect(result).to.be.empty;
      });
    });
  });

  describe('Testa a função createSale', () => {
    describe('Quando uma saleId é criada', () => {
      const insertSaleId = [{ insertId: 1 }];

      before(() => {
        sinon.stub(connection, 'execute').resolves(insertSaleId);
      });

      after(() => {
        connection.execute.restore();
      });

      it('É criado uma nova saleId', async () => {
        const result = await salesModels.createSale();

        expect(result.insertId).to.be.equal(1);
        expect(typeof result.insertId).to.be.equal('number');
      });
    });
  });

  describe('Testa a função createProductSale', () => {
    describe('Quando uma sale é criada', () => {
      const insertSale = [[{
        "id": 1,
        "itemsSold": [
          {
            "productId": 1,
            "quantity": 3
          }
        ]
      }]];

      const productId = 1;
      const quantity = 3;

      before(() => {
        sinon.stub(connection, 'execute').resolves(insertSale);
      });

      after(() => {
        connection.execute.restore();
      });

      it('É criado uma nova sale e retornado as keys "id" e "itemsSold" e dentro de "itemsSold" as keys "productId" e"quantity"', async () => {
        const result = await salesModels.createProductSale( productId, quantity );
        expect(result[0]).to.include.all.keys('id', 'itemsSold');
        expect(result[0].itemsSold[0]).to.include.all.keys('productId', 'quantity');
      });
      
      it('A sale criada deve ser igual a passada no body', async () => {
        const result = await salesModels.createProductSale( productId, quantity );

        expect(result[0]).to.be.deep.equal({ id: insertSale[0][0].id, itemsSold: insertSale[0][0].itemsSold});
      });
    });
  });

  describe('Testa a função updateSale', () => {
    describe('Quando o update é realizado', () => {
      const updateSale = [[{
        "id": 1,
        "itemsSold": [
          {
            "productId": 1,
            "quantity": 3
          }
        ]
      }]];

      const productId = 1;
      const quantity = 3;

      before(() => {
        sinon.stub(connection, 'execute').resolves(updateSale[0]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('O objeto deve ser igual ao passado como parametro', async () => {
        const result = await salesModels.updateSale(productId, quantity);

        expect(result).to.be.equal(updateSale[0][0]);
      });
    });

  });

    describe('Testa a função de deleteSale', () => {
    describe('A sale foi deletada com sucesso', () => {
      const deleteRes = [
        {
          "affectedRows": 1,
        },
      ];

      before(() => {
        sinon.stub(connection, 'execute').resolves(deleteRes);
      });

      after(() => {
        connection.execute.restore();
      });

      it('É esperado que apenas 1 row tenha sido afetada', async () => {
        const result = await salesModels.deleteSale(1);

        expect(result.affectedRows).to.be.equals(1);
      });
    });

    describe('Quando não foi possível deletar a sale', () => {
      const deleteResFail = [
        {
          "affectedRows": 0,
        },
      ];

      before(() => {
        sinon.stub(connection, 'execute').resolves(deleteResFail);
      });

      after(() => {
        connection.execute.restore();
      });

      it('É esperado que nenhuma row tenha sido afetada', async () => {
        const result = await salesModels.deleteSale(1);

        expect(result.affectedRows).to.be.equals(0);
      });
    });
  });
});
