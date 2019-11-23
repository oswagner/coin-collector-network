import * as fs from "fs";
import { Point, Labyrinth } from "./labyrinth"

export class LabyrinthLoader {

  // path: string
  // map: [][] = []
  // constructor(path: string) {
  //   this.path = path;
  // }


  // /**
  //  * readMap
  //  */
  // public readMap() {
  //   const lines = fs.readFileSync(this.path, 'utf-8').toLowerCase().split('\n');
  //   const mapSize = lines.slice(0, 1)[0];
  // }

  static load(path: string): Labyrinth {

    let lines = fs.readFileSync(path, 'utf-8').toLowerCase().split('\n');

    let map: number[][] = [];
    let x = 0;
    let y = -1;
    let entry: Point = { x: 0, y: 0 };
    let exit: Point = { x: 0, y: 0 };


    lines.forEach((line) => {
      if (y < 0) {
        // Inicializa a matriz do mapa
        for (let i = 0; i < +line; i++)
          map.push([]);
      } else {
        let lineArray = line.split(" ");
        x = 0;
        lineArray.forEach(value => {

          // Remove um caracter especial em fim de linha
          value = encodeURI(value).replace("%0D", "");

          if (value == 'e') {
            entry = { x, y };
            value = '0';
          } else if (value == 's') {
            exit = { x, y };
            value = '3';
          } else if (value == 'm') {
            value = '2';
          }

          map[y][x] = +value;

          x++;
        });
      }
      y++;
    });

    let lab = new Labyrinth(map, entry, exit);
    return lab;
  }
}