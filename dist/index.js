"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const labyrinth_loader_1 = require("./labyrinth-loader");
const evolution_simulator_1 = require("./evolution-simulator");
const network_1 = require("./neural_network/network");
const lab = labyrinth_loader_1.LabyrinthLoader.load('./data/labirinto1_10T2.txt');
const sim = new evolution_simulator_1.EvolutionSimulator(100, lab, 0.1, 1, 1000, true);
sim.run();
const ag_weights = [1, 2, 3, 4, 5, 6]; // 
const inputs = [1, 3, 4, 3]; // up, down, left, right
const multiLayerNetwork = new network_1.Network(ag_weights, inputs);
//# sourceMappingURL=index.js.map