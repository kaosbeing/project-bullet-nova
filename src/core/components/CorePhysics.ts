import { Vector2 } from '../class/Vector2.ts';
import Component from './Component.ts';

// DefaultMass = 100
export default class CorePhysics extends Component {
    velocity: Vector2;
    forces: Array<Vector2>;
    mass: number;

    constructor(
        velocity: Vector2 = new Vector2(0, 0),
        forces: Array<Vector2> = [],
        mass: number = 100
    ) {
        super();
        this.mass = mass;
        this.velocity = velocity;
        this.forces = forces;
    }
}
