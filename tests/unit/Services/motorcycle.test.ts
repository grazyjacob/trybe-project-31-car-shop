import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

const ERROR_NOT_FOUND = 'Motorcycle not found';
const GOOD_MOTORCYCLE_MODEL = 'Honda Cb 600f Hornet';
const ERROR_INVALID_ID = 'Invalid mongo id';
const GOOD_MOTORCYCLE_ID = '6348513f34c397abcad040b2';
const BAD_MOTORCYCLE_ID = '63ebddeccb2b1922cffc28XX';

describe('Rota motorcycle', function () {
  it('Criando uma moto com SUCESSO', async function () {
    const motorcycleInput: IMotorcycle = {
      model: GOOD_MOTORCYCLE_MODEL,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    const motorcycleOutput: Motorcycle = new Motorcycle(
      {
        id: GOOD_MOTORCYCLE_ID,
        status: true,
        model: GOOD_MOTORCYCLE_MODEL,
        year: 2005,
        color: 'Yellow',
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      },
    );
    sinon.stub(Model, 'create').resolves(motorcycleOutput);

    const service = new MotorcycleService();
    const result = await service.create(motorcycleInput);

    expect(result).to.be.deep.equal(motorcycleOutput);
    sinon.restore();
  });
  it('Verifica se ao mandar um body invalido retorna null', async function () {
    const motorcycleInput = {
      model: '',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    sinon.stub(Model, 'create').resolves(null);

    const service = new MotorcycleService();
    const result = await service.create(motorcycleInput);

    expect(result).to.be.deep.equal(null);
    sinon.restore();
  });
  it('Buscando uma moto pelo ID com SUCESSO', async function () {
    const motorcycleOutput: Motorcycle = new Motorcycle(
      {
        id: GOOD_MOTORCYCLE_ID,
        status: true,
        model: GOOD_MOTORCYCLE_MODEL,
        year: 2005,
        color: 'Yellow',
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      },
    );
    sinon.stub(Model, 'findOne').resolves(motorcycleOutput);
  
    const service = new MotorcycleService();
    const result = await service.getOneMotorcycle(GOOD_MOTORCYCLE_ID);
  
    expect(result).to.be.deep.equal(motorcycleOutput);
    sinon.restore();
  });
  it('Buscando uma moto pelo ID inexistente Not Found - ERRO', async function () {
    sinon.stub(Model, 'findOne').resolves({});

    try {
      const service = new MotorcycleService();
      await service.getOneMotorcycle(BAD_MOTORCYCLE_ID);
    } catch (error) {
      expect((error as Error).message).to.be.equal(ERROR_NOT_FOUND);
    }
    sinon.restore();
  });
  it('Buscando uma moto sem passar um ID - ERRO', async function () {
    sinon.stub(Model, 'findOne').resolves({});

    try {
      const service = new MotorcycleService();
      await service.getOneMotorcycle('');
    } catch (error) {
      expect((error as Error).message).to.be.equal(ERROR_INVALID_ID);
    }
    sinon.restore();
  });
  it('Buscando todas motos com SUCESSO', async function () {
    const motorcycleOutput = [
      {
        id: GOOD_MOTORCYCLE_ID,
        status: true,
        model: GOOD_MOTORCYCLE_MODEL,
        year: 2005,
        color: 'Yellow',
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      },
    ];

    const motorcycleResponse = [
      {
        id: GOOD_MOTORCYCLE_ID,
        status: true,
        model: GOOD_MOTORCYCLE_MODEL,
        year: 2005,
        color: 'Yellow',
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      },
    ];

    sinon.stub(Model, 'find').resolves(motorcycleOutput);
    const service = new MotorcycleService();
    const result = await service.getAllMotorcycles();
  
    await service.getAllMotorcycles();
    expect(result).to.be.deep.equal(motorcycleResponse);
    sinon.restore();
  });
  it('Alterando uma moto pelo ID com SUCESSO', async function () {
    const motorcycleOutput: Motorcycle = new Motorcycle(
      {
        id: GOOD_MOTORCYCLE_ID,
        status: true,
        model: GOOD_MOTORCYCLE_MODEL,
        year: 2005,
        color: 'Yellow',
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      },
    );
    const update = {
      id: GOOD_MOTORCYCLE_ID,
      status: true,
      model: GOOD_MOTORCYCLE_MODEL,
      year: 2005,
      color: 'Yellow',
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleOutput);
  
    const service = new MotorcycleService();
    const result = await service.updateMotorcycle(GOOD_MOTORCYCLE_ID, update);
  
    expect(result).to.be.deep.equal(motorcycleOutput);
    sinon.restore();
  });
  it('Alterando uma moto pelo ID - ERRO', async function () {
    const update = {
      id: BAD_MOTORCYCLE_ID,
      status: true,
      model: GOOD_MOTORCYCLE_MODEL,
      year: 2005,
      color: 'Blue',
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    sinon.stub(Model, 'findByIdAndUpdate').resolves();
  
    try {
      const service = new MotorcycleService();
      await service.updateMotorcycle(BAD_MOTORCYCLE_ID, update);
    } catch (error) {
      expect((error as Error).message).to.be.equal(ERROR_NOT_FOUND);
    }
    sinon.restore();
  });
});