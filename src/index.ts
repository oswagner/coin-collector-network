import { LabyrinthLoader } from "./labyrinth-loader";
import { EvolutionSimulator } from "./evolution-simulator";
import { Network } from "./neural_network/network";
import { Chromosome } from "./chromosome";

const lab = LabyrinthLoader.load('./data/labirinto1_10T2.txt');
const sim = new EvolutionSimulator(100, lab, 0.1, 1, 1000, true);
sim.run();


const weights = [
  1, 0, 1, 0, 1, 0, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 0, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 0, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 0, 0, 1, 0, 1
];
const inputs = [1, 3, 4, 3]; // up, down, left, right

const multiLayerNetwork = new Network(weights);

const nextStep = multiLayerNetwork.run(inputs);


