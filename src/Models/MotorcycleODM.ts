import {
  Model,
  Schema,
  model,
  models,
} from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
    
class MotorcycleODM {
  private schema: Schema;
  protected model: Model<IMotorcycle>;
    
  constructor() {
    this.schema = new Schema<IMotorcycle>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: true, default: false },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true },
    });
    this.model = models.Motorcycle || model('Motorcycle', this.schema);
  }
    
  public async create(motorcycle: IMotorcycle): Promise<IMotorcycle> {
    return this.model.create({ ...motorcycle });
  }

  public async findAll() {
    return this.model.find();
  }

  public async getOne(id: string) {
    return this.model.findById(id);
  }
}
    
export default MotorcycleODM;