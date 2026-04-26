import { Vector2 } from '../utils/Vector2.ts';

export default class CorePhysics {
    velocity: Vector2;
    forces: Array<Vector2>;

    constructor(
        velocity: Vector2 = new Vector2(0, 0),
        forces: Array<Vector2> = []
    ) {
        this.velocity = velocity;
        this.forces = forces;
    }
}
