export class Neuron {

  inputs: number[] = [];
  weights: number[];
  name: string;

  private bias: number = 1;
  private bias_weight: number = 1;
  private euler: number = 2.71828;


  /**
   * Primeira posição do array de pesos é a o peso do bias
   * */

  constructor(name: string, weights: number[] = []) {
    this.weights = weights;
    this.name = name;
  }

  /**
   * run
   */
  public run(inputs: number[]): number {
    let result: number = 0;
    const weightBias = this.weights[0];
    const biasWeight = this.bias * weightBias;
    // const biasWeight = 1;
    for (var i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      const weight = this.weights[i+1];
      result += (input * weight);
    }
    return this.activateFunction((result + biasWeight));
  }

  private activateFunction(result: number): number {
    return (1 / (1 + Math.pow(this.euler, -result)));
  }
}