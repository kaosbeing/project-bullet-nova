import { Vector2 } from '../utils/Vector2.ts';
import Component from './Component.ts';

export default class CorePhysics extends Component {
    velocity: Vector2;
    forces: Array<Vector2>;

    constructor(
        velocity: Vector2 = new Vector2(0, 0),
        forces: Array<Vector2> = []
    ) {
        super();
        this.velocity = velocity;
        this.forces = forces;
    }
}
