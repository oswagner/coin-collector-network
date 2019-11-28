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
    // console.log("run da rede-----------------");
    
    // console.log("entrada " + inputs.toString());
    const entryLayerOutput = this.layers[0].run(inputs)
    // console.log("input " + entryLayerOutput.toString());
    const hiddenLayerOutput = this.layers[1].run(entryLayerOutput);
    // console.log("hidden " + hiddenLayerOutput);
    const exitLayerOutput = this.layers[2].run(hiddenLayerOutput);
    // console.log("output " + exitLayerOutput);

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

    // console.log("res " + THElargest);

    return exitLayerOutput.indexOf(THElargest);
  }
}