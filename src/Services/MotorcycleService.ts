import IMotorcicle from '../Interfaces/IMotorcycle';
import Motorcycle from '../Domains/Motorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

export default class MotorcyclesService {
  private createNewMotorcycle(motorcycle: IMotorcicle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(
        motorcycle,
      );
    }
    return null;
  }

  public async create(motorcycle: IMotorcicle) {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.create(motorcycle);
    return this.createNewMotorcycle(newMotorcycle);
  }

  public async getAllMotorcycles() {
    const motorcycleODM = new MotorcycleODM();
    const allMotorcycles = await motorcycleODM.findAll();
    const createDom = allMotorcycles.map((motorcycle) => this.createNewMotorcycle(motorcycle));
    return createDom;
  }

  public async getOneMotorcycle(id: string) {
    const motorcycleODM = new MotorcycleODM();
    const motorcycle = await motorcycleODM.getOne(id);
    const createDom = this.createNewMotorcycle(motorcycle);
    return createDom;
  }
}