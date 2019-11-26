export class Network {

  private ag_weights: number[];
  private neighbors: number[];

  constructor(ag_weights: number[], neighbors: number[]) {
    this.ag_weights = ag_weights;
    this.neighbors = neighbors;
  }
}