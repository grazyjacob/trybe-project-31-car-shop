// import ICar from '../Interfaces/ICar';

import ICar from '../Interfaces/ICar';

class Car {
  protected id?: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status?: boolean;
  protected buyValue: number;
  private doorsQty: number;
  private seatsQty: number;

  constructor({
    status,
    id,
    model,
    year,
    color,
    buyValue,
    doorsQty,
    seatsQty,
  }: ICar) {
    this.id = id;
    this.status = status;
    this.model = model;
    this.year = year;
    this.color = color;
    this.buyValue = buyValue;
    this.doorsQty = doorsQty;
    this.seatsQty = seatsQty;
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
  public getDoorsQty(): number {
    return this.doorsQty;
  }
  public getSeatsQty(): number {
    return this.seatsQty;
  }
}

export default Car;