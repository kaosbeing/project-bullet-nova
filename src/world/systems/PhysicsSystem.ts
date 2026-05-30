import type World from '../world.ts';
import CorePhysics from '../components/CorePhysics.ts';
import Position from '../components/Position.ts';

export default function physicsSystem(world: World, delta: number) {
    for (const [_, physic, pos] of world.query(CorePhysics, Position)) {
        for (const force of physic.forces) {
            physic.velocity.add(force);
        }

        // drag
        const drag = 8;
        const dragFactor = Math.max(0, 1 - drag * delta);
        physic.velocity.scale(dragFactor);

        // mouvement
        let velocityScaled = physic.velocity.clone().scale(delta);
        pos.x += velocityScaled.x;
        pos.y += velocityScaled.y;

        // reset forces
        physic.forces.length = 0;
    }
}
