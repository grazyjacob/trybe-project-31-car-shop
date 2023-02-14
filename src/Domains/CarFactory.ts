import ICar from '../Interfaces/ICar';
import Car from './Car';

export default class CarFactory {
  public static create({ model, year, color, buyValue, doorsQty, seatsQty }: ICar) {
    return new Car(
      model,
      year,
      color,
      buyValue,
      doorsQty,
      seatsQty,
    );
  }
}