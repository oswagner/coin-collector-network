import { Neuron } from './neuron';

export class Layer {

  inputs: number[] = [];
  neurons?: Neuron[];
  weights?: number[];
  name: string;


  constructor(name: string, weights?: number[]) {
    this.name = name;
    this.weights = weights;
    if (weights) {
      this.neurons = this.createNeurons(weights);
    }
  }

  private createNeurons(weights: number[]): Neuron[] {
    return [
      new Neuron("cima", weights.slice(0, 5)),
      new Neuron("baixo", weights.slice(5, 10)),
      new Neuron("esquerda", weights.slice(10, 15)),
      new Neuron("direita", weights.slice(15, 20))
    ]

  }

  /**
   * run
   */
  public run(inputs: number[]): number[] {

    let output: number[] = [];
    output = inputs
    if (this.weights) {
      for (let [index, neuron] of this.neurons!.entries()) {
        output[index] = neuron.run(inputs);
      }
    }
    return output;
  }
}