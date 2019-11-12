"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
class LabyrinthLoader {
    constructor(path) {
        this.map = [];
        this.path = path;
    }
    /**
     * readMap
     */
    readMap() {
        const lines = fs.readFileSync(this.path, 'utf-8').toLowerCase().split('\n');
        const mapSize = lines.slice(0, 1)[0];
    }
}
exports.LabyrinthLoader = LabyrinthLoader;
//# sourceMappingURL=labyrinthLoader.js.map