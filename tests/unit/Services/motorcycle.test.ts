import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

// const ERROR_NOT_FOUND = 'Car not found';
// const ERROR_INVALID_ID = 'Invalid mongo id';
const GOOD_MOTORCYCLE_ID = '6348513f34c397abcad040b2';
// const BAD_MOTORCYCLE_ID = '63ebddeccb2b1922cffc28XX';

describe('Deveria adicionar uma moto', function () {
  it('Criando uma moto com SUCESSO', async function () {
    const motorcycleInput: IMotorcycle = {
      model: 'Honda Cb 600f Hornet',
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
        model: 'Honda Cb 600f Hornet',
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
  it('Retorna null ao tentar cadastrar uma moto sem passar nada no body', async function () {
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
});