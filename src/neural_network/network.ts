import { Layer } from './layer';
export class Network {

  private layers: Layer[];
  private weights: number[];
  private neighbors: number[] = [];

  constructor(weights: number[]) {
    this.weights = weights;
    this.layers = [
      new Layer(),
      new Layer(weights.slice(0, 19)),
      new Layer(weights.slice(20, weights.length - 1))
    ];
  }


  /**
   * run
   */
  public run(inputs: number[]): number {
    const entryLayerOutput = this.layers[0].run(inputs)
    const hiddenLayerOutput = this.layers[1].run(entryLayerOutput);
    const exitLayerOutput = this.layers[2].run(hiddenLayerOutput);
    let max = Math.max(...exitLayerOutput);
    return exitLayerOutput.indexOf(max);
  }
}