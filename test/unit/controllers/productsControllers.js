const sinon = require('sinon');
const { expect } = require('chai');
const productsServices = require('../../../services/productsServices');
const productsController = require('../../../controllers/productsController')

const fakeProducts = [{
  'id': 1,
  'name': 'produtoFake',
  'quantity': 15,
}];

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

describe('Testa a função createProduct', () => {
  let response = {}, request = {}, next = {};

  // before(() => {
  //   sinon.stub(productsServices, 'createProduct').resolves(fakeProducts[0]);
  //   request.body = {};
  //   response.status = sinon.stub().returns(response);
  //   response.json = sinon.stub().returns();
  // });

  // after(() => {
  //   productsServices.createProduct.restore();
  // });

  // describe('Quando o "name" não é passado via body', () => {
  //   it('É retornado um status 400', async () => {
  //     await productsController.createProduct(request, response, next);
  //     expect(response.status.calledWith(400)).to.be.equal(true);
  //   });
  //   it('É retornado uma mensagem contendo ""name" is required"', async () => {
  //     await productsController.createProduct(request, response);
  //     expect(response.json.calledWith({ message: '"name" is required' })).to.be.equal(true); 
  //   });
  // });

  // describe('Quando o "name" tem menos do que 5 caracteres', () => {
    
  //   it('É retornado um status 422', async () => {
  //     await productsController.createProduct(request, response, next);
  //     expect(response.status.calledWith(422)).to.be.equal(true);
  //   });
  //   it('É retornado uma mensagem contendo ""name" length must be at least 5 characters long"', async () => {
  //     await productsController.createProduct(request, response, next);
  //     expect(response.json.calledWith({ message: '"name" length must be at least 5 characters long' })).to.be.equal(true); 
  //   });
  // });
  
  // describe('Quando o "quantity" não é passado no body', () => {
    
  //   it('É retornado um status 400', async () => {
  //     await productsController.createProduct(request, response, next);
  //     expect(response.status.calledWith(400)).to.be.equal(true);
  //   });
  //   it('É retornado uma mensagem contendo ""quantity" is required"', async () => {
  //     await productsController.createProduct(request, response, next);
  //     expect(response.json.calledWith({ message: '"quantity" is required' })).to.be.equal(true); 
  //   });
  // });
  
  // describe('Quando o "quantity" não é um número INT ou é 0', () => {
    
  //   it('É retornado um status 422', async () => {
  //     await productsController.createProduct(request, response, next);
  //     expect(response.status.calledWith(422)).to.be.equal(true);
  //   });
  //   it('É retornado uma mensagem contendo ""quantity" must be greater than or equal to 1"', async () => {
  //     await productsController.createProduct(request, response, next);
  //     expect(response.json.calledWith({ message: '"quantity" must be greater than or equal to 1' })).to.be.equal(true); 
  //   });
  // });

  // describe('Quando o produto já existe', () => {
    
  //   const productAlreadyExists = {
  //     status: 409,
  //     message: 'Product already exists',
  //   };

  //   before(() => {
  //     sinon.stub(productsServices, 'createProduct').resolves(productAlreadyExists);
  //     request.body = {
  //       name: 'produtoFake',
  //       quantity: 15,
  //     };
  //     response.status = sinon.stub().returns(response);
  //     response.json = sinon.stub().returns();
  //   });
  
  //   after(() => {
  //     productsServices.createProduct.restore();
  //   });

  //   it('É retornado um status 409', async () => {
  //     await productsController.createProduct(request, response, next);
  //     // expect(response.status.calledWith(409)).to.be.equal(true);
  //     expect(response.status.calledWith(409)).to.be.equal(true);
  //   });
  //   it('É retornado uma mensagem contendo "Product already exists"', async () => {
  //     await productsController.createProduct(request, response, next);
  //     expect(response.json.calledWith({ message: 'Product already exists' })).to.be.equal(true); 
  //   });
  // });

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

