import { Point, Labyrinth, SpaceType } from "./labyrinth"

export class Agent {
    private position: Point
    private labyrinth: Labyrinth

    constructor(labyrinth: Labyrinth) {
        this.labyrinth = labyrinth;
        this.position = labyrinth.entry;
    }

    public getNeighbors(): {point: Point, spaceType: SpaceType}[] {
        return this.labyrinth.getNeighbors(this.position);
    }

    public moveTo(position: Point) {
        this.position = position;
    }

    public getSpaceType(): SpaceType {
        return this.labyrinth.spaceTypeAt(this.position);
    }
}