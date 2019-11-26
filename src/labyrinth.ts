export interface Point {
    x: number;
    y: number;
}

export enum SpaceType {
    Floor = 0,
    Wall = 1,
    CoinsBag = 2,
    Exit = 3
}

export class Labyrinth {
    readonly map: number [][];
    readonly width: number
    readonly height: number
    readonly entry: Point;
    readonly exit: Point;

    constructor(map: number[][], entry: Point, exit: Point) {
        this.map = map;
        this.width = map.length;
        this.height = map[0].length;
        this.entry = entry;
        this.exit = exit;
    }

    /**
     * 
     * @param point Ponto que se deseja saber o tipo de espaço no labirinto
     * 
     * @returns Tipo de espaço do ponto. Caso o ponto esteja fora do labirinto, retorna Wall
     */
    public spaceTypeAt(point: Point): SpaceType {
        if (point.x < 0 || point.x > this.width - 1 || point.y < 0 || point.y > this.height - 1)
            return SpaceType.Wall;
        return this.map[point.y][point.x];
    }

   /**
    * @returns Array no formato {Point, SpaceType} com vizinhos acima, abaixo, à esquerda e à direita da posição
    * informada
    */
    public getNeighbors(position: Point): {point: Point, spaceType: SpaceType}[] {
        //Array de retorno
        let neighbors:{point: Point, spaceType: SpaceType}[] = []

        let up: Point = {x: position.x, y: position.y - 1};
        let down: Point = {x: position.x, y: position.y + 1};
        let left: Point = {x: position.x - 1, y: position.y};
        let right: Point = {x: position.x + 1, y: position.y};

        neighbors.push({point: up, spaceType: this.spaceTypeAt(up)});
        neighbors.push({point: down, spaceType: this.spaceTypeAt(down)});
        neighbors.push({point: left, spaceType: this.spaceTypeAt(left)});
        neighbors.push({point: right, spaceType: this.spaceTypeAt(right)});

        return neighbors;
    }

    /**
     * @returns Distância de Manhattan entre 2 pontos
     */
    public manhattanDistance(p1: Point, p2: Point): number {
        return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
    }
}