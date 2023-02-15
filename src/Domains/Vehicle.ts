import IVehicle from '../Interfaces/IVehicle';

class Vehicle {
  protected id?: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status?: boolean;
  protected buyValue: number;

  constructor({
    status,
    id,
    model,
    year,
    color,
    buyValue,
  }: IVehicle) {
    this.id = id;
    this.status = status;
    this.model = model;
    this.year = year;
    this.color = color;
    this.buyValue = buyValue;
  }
  public getId(): string | undefined {
    return this.id;
  }
  public setId(value: string | undefined) {
    this.id = value;
  }
  public getModel(): string {
    return this.model;
  }
  public setModel(value: string) {
    this.model = value;
  }

  public getYear(): number {
    return this.year;
  }
  public setYear(value: number) {
    this.year = value;
  }
  public getColor(): string {
    return this.color;
  }
  public setColor(value: string) {
    this.color = value;
  }
  public getStatus(): boolean | undefined {
    return this.status;
  }
  public setStatus(value: boolean | undefined) {
    this.status = value;
  }
  public getBuyValue(): number {
    return this.buyValue;
  }
  public setBuyValue(value: number) {
    this.buyValue = value;
  }
}

export default Vehicle;