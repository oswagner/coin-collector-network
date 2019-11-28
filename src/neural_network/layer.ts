import { Neuron } from './neuron';

export class Layer {

  inputs: number[] = [];
  neurons?: Neuron[];
  weights?: number[];


  constructor(weights?: number[]) {
    this.weights = weights;
    if (weights) {
      this.neurons = this.createNeurons(weights);
    }
  }

  private createNeurons(weights: number[]): Neuron[] {
    let neurons: Neuron[] = [];
    for (var i = 5; i < weights.length - 5; i += 5) {
      neurons.push(new Neuron(weights.slice(i - 5, i)));
    }
    return neurons;
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