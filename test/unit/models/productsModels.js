const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const ProductsModel = require('../../../models/productsModels');

const fakeProducts = [
  [
    {
      "id": 1,
      "name": "produto A",
      "quantity": 10
    },
    {
      "id": 2,
      "name": "produto B",
      "quantity": 20
    }
  ]
];

describe('PRODUCTS MODELS TESTS', () => {
  describe('Testa a função getAll', () => {
    describe('Quando há produtos no DB', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves(fakeProducts);
      });
  
      after(() => {
        connection.execute.restore();
      });
  
      it('É retornado um array não vazio', async () => {
        const result = await ProductsModel.getAll();
  
        expect(result).to.be.an('array');
        expect(result).to.be.not.empty;
      });
  
      it('É retornado um array de objetos', async () => {
        const result = await ProductsModel.getAll();
  
        expect(result[0]).to.be.an('object');
        expect(result[1]).to.be.an('object');
      });
  
      it('Os obejtos tem as propriedades "id", "name" e "quantity"', async () => {
        const result = await ProductsModel.getAll();
  
        expect(result[0]).to.include.all.keys('id', 'name', 'quantity');
        expect(result[1]).to.include.all.keys('id', 'name', 'quantity');
      });
    })
    
  });

  describe('Testa a função getById', () => {
    describe('Quando o produto existe no DB', () => {
      const id = 1;
      const getByIdFakeRes = [
        [
          {
            "id": 1,
            "name": "produtoFake",
            "quantity": 10
          },
        ]
      ];

      before(() => {
        sinon.stub(connection, 'execute').resolves(getByIdFakeRes);
      });

      after(() => {
        connection.execute.restore();
      });

      it('É retornado um objeto', async () => {
        const result = await ProductsModel.getById(id);

        expect(result).to.be.an('object');
      });

      it('Os obejtos tem as propriedades "id", "name" e "quantity"', async () => {
        const result = await ProductsModel.getById(id);

        expect(result).to.include.all.keys('id', 'name', 'quantity');
      });
    });

    describe('Quando o produto não existe no DB', () => {
      const id = 5;
      const notFoundGetByIdRes = [[]];

      before(() => {
        sinon.stub(connection, 'execute').resolves(notFoundGetByIdRes);
      });

      after(() => {
        connection.execute.restore();
      });

      it('É retornado undefined', async () => {
        const result = await ProductsModel.getById(id);

        expect(result).to.be.undefined;
      });
    });
  });

  describe('Testa a função createProduct', () => {
    describe('Quando um produto é criado', () => {
      const insertProduct = [
        {
          "id": 1,
          "name": 'produtoFake2',
          "quantity": 10,
        },
      ];

      const name = 'produtoFake2';
      const quantity = 10;

      before(() => {
        sinon.stub(connection, 'execute').resolves(insertProduct);
      });

      after(() => {
        connection.execute.restore();
      });

      it('É criado um novo produto e retornado as keys "id", "name" e "quantity"', async () => {
        const result = await ProductsModel.createProduct( name, quantity );

        expect(result).to.include.all.keys('id', 'name', 'quantity');
      });

      it('O produto criado deve ser igual ao passado no body', async () => {
        const result = await ProductsModel.createProduct( name, quantity );

        expect(result).to.be.deep.equal({ id: insertProduct[0].id, name, quantity});
      });
    });
  });

  describe('Testa a função updateProduct', () => {
    describe('Quando o update é realizado', () => {
      const id = 4;
      const name = 'batata';
      const quantity = 10;

      const updatedProd = [{
        "id": 4,
        "name": 'batata',
        "quantity": 10,
      }];

      before(() => {
        sinon.stub(connection, 'execute').resolves(updatedProd);
      });

      after(() => {
        connection.execute.restore();
      });

      it('O objeto deve ser igual ao passado como parametro', async () => {
        const result = await ProductsModel.updateProduct(id, name, quantity);

        expect(result).to.be.equal(updatedProd[0]);
      });
    });

  });

    describe('Testa a função de deleteProduct', () => {
    describe('O produto foi deletado com sucesso', () => {
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
        const result = await ProductsModel.deleteProduct(1);

        expect(result.affectedRows).to.be.equals(1);
      });
    });

    describe('Quando não foi possível deletar o produto', () => {
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
        const result = await ProductsModel.deleteProduct(1);

        expect(result.affectedRows).to.be.equals(0);
      });
    });
  });
});
