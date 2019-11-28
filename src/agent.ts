import { Point, Labyrinth, SpaceType } from "./labyrinth"

export enum Direction {
    Up,
    Down,
    Left,
    Right
}

export class Agent {
    private position: Point
    private labyrinth: Labyrinth

    constructor(labyrinth: Labyrinth) {
        this.labyrinth = labyrinth;
        this.position = { x: labyrinth.entry.x, y: labyrinth.entry.y }
    }

    public getNeighbors(): { point: Point, spaceType: SpaceType }[] {
        return this.labyrinth.getNeighbors(this.position);
    }

    public move(direction: Direction) {
        switch (direction) {
            case Direction.Up:
                this.position.y -= 1;
                break;
            case Direction.Down:
                this.position.y += 1;
                break;
            case Direction.Left:
                this.position.x -= 1;
                break;
            case Direction.Right:
                this.position.x += 1;
                break;
        }
    }

    public getSpaceType(): SpaceType {
        return this.labyrinth.spaceTypeAt(this.position);
    }

    public getPosition(): Point {
        return this.position;
    }
}