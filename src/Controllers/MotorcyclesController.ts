import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

const MOTORCYCLE_NOT_FOUND = 'Motorcycle not found';
const INVALID_MONGO_ID = 'Invalid mongo id';

export default class MotorcyclesController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;
  
  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const motorcycle: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      buyValue: this.req.body.buyValue,
      status: this.req.body.status || false,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };
    try {
      const newMotorcycle = await this.service.create(motorcycle);
      return this.res.status(201).json(newMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async findAll() {
    const allMotorcycles = await this.service.getAllMotorcycles();
    return this.res.status(200).json(allMotorcycles);
  }

  public async findOne() {
    const motorcycleId = this.req.params.id;
    try {
      const motorcycle = await this.service.getOneMotorcycle(motorcycleId);
      if (!motorcycle) return this.res.status(404).json({ message: MOTORCYCLE_NOT_FOUND });
      this.res.status(200).json(motorcycle);
    } catch (error) {
      this.res.status(422).json({ message: INVALID_MONGO_ID });
    }
  }

  public async updateOne() {
    const motorcycle: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      buyValue: this.req.body.buyValue,
      status: this.req.body.status || false,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };
    const motorcycleId = this.req.params.id;

    try {
      const result = await this.service.updateMotorcycle(motorcycleId, motorcycle);
      if (!result) return this.res.status(404).json({ message: MOTORCYCLE_NOT_FOUND });
      return this.res.status(200).json(result);
    } catch (error) {
      this.res.status(422).json({ message: INVALID_MONGO_ID });
    }
  }
}
