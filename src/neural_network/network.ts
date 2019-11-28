import { Layer } from './layer';
export class Network {

  private layers: Layer[];
  private weights: number[];
  private neighbors: number[] = [];
  name: string;

  constructor(name: string, weights: number[]) {
    this.weights = weights;
    this.name = name;
    console.log(`================================ Create a Network ${this.name} = ${new Date().toLocaleTimeString()}================================`);
    console.log(`================================ with Weights [${this.weights}]================================`);
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
    // console.log("entryLayerOutput 1= ", entryLayerOutput);
    const hiddenLayerOutput = this.layers[1].run(entryLayerOutput);
    // console.log("hiddenLayerOutput 2= ", hiddenLayerOutput);
    const exitLayerOutput = this.layers[2].run(hiddenLayerOutput);
    // console.log("exitLayerOutput 3= ", exitLayerOutput);

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

    // console.log("THElargest", THElargest);
    // console.log("valor 0= ", exitLayerOutput[0]);
    // console.log("valor 1= ", exitLayerOutput[1]);
    // console.log("valor 2= ", exitLayerOutput[2]);
    // console.log("valor 3= ", exitLayerOutput[3]);
    return exitLayerOutput.indexOf(THElargest);
  }
}