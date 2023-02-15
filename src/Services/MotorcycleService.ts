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
}