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
    console.log(`================================ Cria a neuronio ${this.name} ================================`);
  }

  /**
   * run
   */
  public run(inputs: number[]): number {
    console.log(`================================ Run a neuronio ${this.name} ================================`);
    let result: number = 0;
    const weightBias = this.weights[0];
    const biasWeight = this.bias * weightBias;
    for (var i = 1; i < inputs.length; i++) {
      const input = inputs[i - 1];
      const weight = this.weights[i];
      result += (input * weight);
    }
    return this.activateFunction((result + biasWeight));
  }

  private activateFunction(result: number): number {
    return (1 / (1 + Math.pow(this.euler, -result)));
  }
}