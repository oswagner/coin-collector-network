import { LabyrinthLoader } from "./labyrinth-loader";
import { EvolutionSimulator } from "./evolution-simulator";
import { Chromosome } from "./chromosome";

const lab = LabyrinthLoader.load('./data/labirinto1_10T2.txt');
const sim = new EvolutionSimulator(1000, lab, 0.1, 1, 1000, true);
sim.run();
