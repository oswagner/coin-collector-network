export class Neuron {

  private _inputs: number[];
  private _weights: number[];

  private bias: number = 1;
  private euler: number = 2.71828;


  constructor(inputs: number[], weights: number[] = []) {
    this._inputs = inputs;
    this._weights = weights;
  }

  public get weights(): number[] {
    return this._weights;
  }
  public set weights(v: number[]) {
    this._weights = v;
  }

  public get inputs(): number[] {
    return this._inputs;
  }

  public set inputs(v: number[]) {
    this._inputs = v;
  }


  private activateFunction(result: number) {
    (1 / (1 + Math.pow(this.euler, -result)));
  }

}