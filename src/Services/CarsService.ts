import ICar from '../Interfaces/ICar';
import Car from '../Domains/Car';
import CarODM from '../Models/CarODM';

export default class CarsService {
  private createNewCar(car: ICar | null): Car | null {
    if (car) {
      return new Car(
        car,
      );
    }
    return null;
  }

  public async create(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return this.createNewCar(newCar);
  }
}