import { LabyrinthLoader } from "./labyrinth-loader";
import { EvolutionSimulator } from "./evolution-simulator";
import { Network } from "./neural_network/network";
import { Chromosome } from "./chromosome";

const lab = LabyrinthLoader.load('./data/labirinto1_10T2.txt');
const sim = new EvolutionSimulator(200, lab, 0.05, 100, 10000, false);

sim.run();

const weights = [
  1, 0, 1, 0, 1, 1, 0, 0, 0.3, 0.5,
  1, 1, 1, 0, 1, 1, 0, 0, 0.3, 0.3,
  1, 0.3, 1, 0, 1, 1, 0, 0, 0.3, 0.2,
  1, 0, 1, 0.3, 1, 1, 0, 0, 0.3, 0.7
];

const inputs = [1, 2, 3, 2]; // up, down, left, right

// const multiLayerNetwork = new Network(weights);
// const nextStep = multiLayerNetwork.run(inputs);

// //console.log(nextStep);



// # "start-dev": "nodemon --config \"./config/nodemon.json\"/"