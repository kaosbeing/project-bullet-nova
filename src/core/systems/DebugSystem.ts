import type World from '../world.ts';
import CorePhysics from '../components/CorePhysics.ts';
import Position from '../components/Position.ts';

export default function debugSystem(
    world: World,
    ctx: CanvasRenderingContext2D
) {
    const corePhysics = world.getStore(CorePhysics);
    const positions = world.getStore(Position);

    for (const [entity, physics] of corePhysics.entries()) {
        const position = positions.get(entity);
        if (!position) continue;

        ctx.fillStyle = 'black';

        // CROSS AT ENTITY'S POSITION
        ctx.beginPath();
        ctx.moveTo(position.x - 5, position.y);
        ctx.lineTo(position.x + 5, position.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(position.x, position.y - 5);
        ctx.lineTo(position.x, position.y + 5);
        ctx.stroke();

        // -- Display velocity
        ctx.beginPath();
        ctx.moveTo(position.x, position.y);
        ctx.lineTo(
            position.x + physics.velocity.x / 10,
            position.y + physics.velocity.y / 10
        );
        ctx.stroke();
    }
}
