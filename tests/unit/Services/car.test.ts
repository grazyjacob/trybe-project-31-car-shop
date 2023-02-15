import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarsService';

const ERROR_NOT_FOUND = 'Car not found';
const ERROR_INVALID_ID = 'Invalid mongo id';
const GOOD_CAR_ID = '63ebddeccb2b1922cffc2852';
const BAD_CAR_ID = '63ebddeccb2b1922cffc28XX';

describe('Deveria adicionar um carro', function () {
  it('Criando um carro com SUCESSO', async function () {
    const carInput: ICar = {
      model: 'Bugatti',
      year: 1956,
      color: 'Gray',
      status: true,
      buyValue: 154.990,
      doorsQty: 2,
      seatsQty: 2,
    };
    const carOutput: Car = new Car(
      {
        id: GOOD_CAR_ID,
        status: true,
        model: 'Bugatti',
        year: 1956,
        color: 'Gray',
        buyValue: 154.99,
        doorsQty: 2,
        seatsQty: 2,
      },
    );
    sinon.stub(Model, 'create').resolves(carOutput);

    const service = new CarService();
    const result = await service.create(carInput);

    expect(result).to.be.deep.equal(carOutput);
    sinon.restore();
  });
  it('Verifica se ao mandar um body invalido retorna null', async function () {
    const carInput: ICar = {
      model: '',
      year: 1956,
      color: 'Gray',
      status: true,
      buyValue: 154.990,
      doorsQty: 2,
      seatsQty: 2,
    };
    const carOutput = null;
    sinon.stub(Model, 'create').resolves(carOutput);

    const service = new CarService();
    const result = await service.create(carInput);

    expect(result).to.be.deep.equal(carOutput);
    sinon.restore();
  });
  it('Buscando um carro pelo ID com SUCESSO', async function () {
    const carOutput: Car = new Car(
      {
        id: GOOD_CAR_ID,
        status: true,
        model: 'Bugatti',
        year: 1956,
        color: 'Gray',
        buyValue: 154.99,
        doorsQty: 2,
        seatsQty: 2,
      },
    );
    sinon.stub(Model, 'findOne').resolves(carOutput);
  
    const service = new CarService();
    const result = await service.getOneCar(GOOD_CAR_ID);
  
    expect(result).to.be.deep.equal(carOutput);
    sinon.restore();
  });
  it('Buscando um carro pelo ID inexistente Not Found - ERRO', async function () {
    sinon.stub(Model, 'findOne').resolves({});

    try {
      const service = new CarService();
      await service.getOneCar(BAD_CAR_ID);
    } catch (error) {
      expect((error as Error).message).to.be.equal(ERROR_NOT_FOUND);
    }
    sinon.restore();
  });
  it('Buscando um carro sem passar um ID - ERRO', async function () {
    sinon.stub(Model, 'findOne').resolves({});

    try {
      const service = new CarService();
      await service.getOneCar('');
    } catch (error) {
      expect((error as Error).message).to.be.equal(ERROR_INVALID_ID);
    }
    sinon.restore();
  });
});