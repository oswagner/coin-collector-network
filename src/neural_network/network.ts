import { Layer } from './layer';
export class Network {

  private layers: Layer[];
  private weights: number[];
  private neighbors: number[] = [];
  name: string;

  constructor(name: string, weights: number[]) {
    this.weights = weights;
    this.name = name;
    this.layers = [
      new Layer("input"),
      new Layer("hidden", this.weights.slice(0, 20)),
      new Layer("output", this.weights.slice(20, this.weights.length))
    ];
  }


  /**
   * run
   */
  public run(inputs: number[]): number {
    const entryLayerOutput = this.layers[0].run(inputs)
    const hiddenLayerOutput = this.layers[1].run(entryLayerOutput);
    const exitLayerOutput = this.layers[2].run(hiddenLayerOutput);

    let THElargest = exitLayerOutput[0];
    if (exitLayerOutput[1] > THElargest) {
      THElargest = exitLayerOutput[1];
    }
    if (exitLayerOutput[2] > THElargest) {
      THElargest = exitLayerOutput[2];
    }
    if (exitLayerOutput[3] > THElargest) {
      THElargest = exitLayerOutput[3];
    }

    return exitLayerOutput.indexOf(THElargest);
  }
}