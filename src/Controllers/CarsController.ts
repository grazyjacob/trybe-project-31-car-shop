import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarsService from '../Services/CarsService';

const CAR_NOT_FOUND = 'Car not found';
const INVALID_MONGO_ID = 'Invalid mongo id';

export default class CarsController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarsService;
  
  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarsService();
  }

  public async create() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      buyValue: this.req.body.buyValue,
      status: this.req.body.status || false,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };
    try {
      const newCar = await this.service.create(car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async findAll() {
    const allCars = await this.service.getAllCars();
    return this.res.status(200).json(allCars);
  }

  public async findOne() {
    const carId = this.req.params.id;
    try {
      const car = await this.service.getOneCar(carId);
      if (!car) return this.res.status(404).json({ message: CAR_NOT_FOUND });
      return this.res.status(200).json(car);
    } catch (error) {
      this.res.status(422).json({ message: INVALID_MONGO_ID });
    }
  }

  public async updateOne() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      buyValue: this.req.body.buyValue,
      status: this.req.body.status || false,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };
    const carId = this.req.params.id;

    try {
      const result = await this.service.updateCar(carId, car);
      if (!result) return this.res.status(404).json({ message: CAR_NOT_FOUND });
      return this.res.status(200).json(result);
    } catch (error) {
      this.res.status(422).json({ message: INVALID_MONGO_ID });
    }
  }
}
