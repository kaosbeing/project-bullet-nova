import type { Vector2 } from './Vector2.ts';

// Évènement de collision, entre A et B
export type CollisionEvent = {
    a: number;
    b: number;

    normal: Vector2;
    penetration: number;
};
