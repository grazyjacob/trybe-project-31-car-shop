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

  public async getAllCars() {
    const carODM = new CarODM();
    const allCars = await carODM.findAll();
    const createDom = allCars.map((car) => this.createNewCar(car));
    return createDom;
  }

  public async getOneCar(carId: string) {
    const carODM = new CarODM();
    const car = await carODM.getOne(carId);
    const createDom = this.createNewCar(car);
    return createDom;
  }
}