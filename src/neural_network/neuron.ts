export class Neuron {

  inputs: number[] = [];
  weights: number[];

  private bias: number = 1;
  private bias_weight: number = 1;
  private euler: number = 2.71828;


  /**
   * Primeira posição do array de pesos é a o peso do bias
   * */

  constructor(weights: number[] = []) {
    this.weights = weights;
  }

  /**
   * run
   */
  public run(inputs: number[]): number {
    let result: number = 0;
    const weightBias = this.weights.shift()!;
    const biasWeight = this.bias * weightBias;
    for (var i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      const weight = this.weights[i];
      result += (input * weight);
    }
    return this.activateFunction((result + biasWeight));
  }

  private activateFunction(result: number): number {
    return (1 / (1 + Math.pow(this.euler, -result)));
  }
}