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
    agentPosition: Point;

    constructor(map: number[][], entry: Point, exit: Point) {
        this.map = map;
        this.width = map.length;
        this.height = map[0].length;
        this.entry = entry;
        this.agentPosition = entry;
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
    * @returns Array no formato {Point, SpaceType} com vizinhos acima, abaixo, à esquerda e à direita do agente
    */
    public currentNeighbors(): {point: Point, spaceType: SpaceType}[] {
        //Array de retorno
        let neighbors:{point: Point, spaceType: SpaceType}[] = []

        //Posição atual
        let cp = this.agentPosition;

        let up: Point = {x: cp.x, y: cp.y - 1};
        let down: Point = {x: cp.x, y: cp.y + 1};
        let left: Point = {x: cp.x - 1, y: cp.y};
        let right: Point = {x: cp.x + 1, y: cp.y};

        neighbors.push({point: up, spaceType: this.spaceTypeAt(up)});
        neighbors.push({point: down, spaceType: this.spaceTypeAt(down)});
        neighbors.push({point: left, spaceType: this.spaceTypeAt(left)});
        neighbors.push({point: right, spaceType: this.spaceTypeAt(right)});

        return neighbors;
    }

    /**
     * 
     * @param point Move o agente para o ponto especificado
     */
    public moveTo(point: Point) {
        this.agentPosition = point;
    }

    /**
     * @returns Tipo de espaço que o agente se encontra
     */
    public agentSpaceType(): SpaceType {
        return this.spaceTypeAt(this.agentPosition);
    }

}