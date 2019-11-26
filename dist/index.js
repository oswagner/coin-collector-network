"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const labyrinth_loader_1 = require("./labyrinth-loader");
const evolution_simulator_1 = require("./evolution-simulator");
const lab = labyrinth_loader_1.LabyrinthLoader.load('./data/labirinto1_10T2.txt');
const sim = new evolution_simulator_1.EvolutionSimulator(1000, lab, 1.0, 1, 1000, true);
sim.run();
//# sourceMappingURL=index.js.map