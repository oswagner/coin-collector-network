export interface Point {
    x: number;
    y: number;
}

export enum SpaceType {
    Floor = 0,
    Wall = 1,
    CoinBag = 2,
    Exit = 3
}

export class Labyrinth {
    readonly map: number [][];
    readonly width: number
    readonly height: number
    readonly entry: Point;
    readonly exit: Point;
    private readonly coinBags: Point[];

    constructor(map: number[][], entry: Point, exit: Point, coinBags: Point[]) {
        this.map = map;
        this.width = map.length;
        this.height = map[0].length;
        this.entry = entry;
        this.exit = exit;
        this.coinBags = coinBags;
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
    public getNeighbors(position: Point): SpaceType[] {
        //Array de retorno
        let neighbors: SpaceType[] = [];

        let up: Point = {x: position.x, y: position.y - 1};
        let down: Point = {x: position.x, y: position.y + 1};
        let left: Point = {x: position.x - 1, y: position.y};
        let right: Point = {x: position.x + 1, y: position.y};

        neighbors.push(this.spaceTypeAt(up));
        neighbors.push(this.spaceTypeAt(down));
        neighbors.push(this.spaceTypeAt(left));
        neighbors.push(this.spaceTypeAt(right));

        return neighbors;
    }

    /**
     * Método para o agente "pegar" o saco de moedas. Uma vez que ele pega,
     * o espaço muda para tipo Floor
     * 
     * @param point Posição do saco de moedas
     * 
     * @returns true se o espaço realmente conter um saco de moedas, caso contrário
     * retorna false
     */
    public pickCoinBagAt(point: Point): boolean {
        if (this.spaceTypeAt(point) == SpaceType.CoinBag) {
            this.map[point.y][point.x] = SpaceType.Floor;
            return true;
        }
        return false;
    }

    /**
     * Reseta os sacos de moeda no labirinto
     */
    public resetCoinBags() {
        this.coinBags.forEach(coinBag => {
            this.map[coinBag.y][coinBag.x] = SpaceType.CoinBag;
        })
    }

    /**
     * @returns Distância de Manhattan entre 2 pontos
     */
    public manhattanDistance(p1: Point, p2: Point): number {
        return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
    }
}