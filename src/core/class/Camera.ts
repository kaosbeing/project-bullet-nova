import type Entity from '../Entity.ts';
import type Coordinates from './Coordinates.ts';

export default class Camera {
    position: Coordinates;
    zoom: number;
    target: Entity;

    // Arbitrary numbers
    static maxZoomIn: number = 2.2;
    static maxZoomOut: number = 0.3;

    deadZone = {
        width: 0.1,
        height: 0.2,
    };

    constructor(
        target: Entity,
        position: Coordinates = { x: 0, y: 0 },
        zoom: number = 1
    ) {
        this.position = position;
        this.target = target;
        this.zoom = zoom;
    }
}
