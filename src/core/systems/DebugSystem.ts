import type World from '../world.ts';
import CorePhysics from '../components/CorePhysics.ts';
import Position from '../components/Position.ts';
import BoundingBox from '../components/BoundingBox.ts';

export default function debugSystem(
    world: World,
    ctx: CanvasRenderingContext2D
) {
    const offsets: number[] = [];

    for (const [id, position] of world.query(Position)) {
        ctx.fillStyle = 'black';

        // DISPLAY CROSS AT ENTITY'S POSITION
        ctx.beginPath();
        ctx.moveTo(position.x - 5, position.y);
        ctx.lineTo(position.x + 5, position.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(position.x, position.y - 5);
        ctx.lineTo(position.x, position.y + 5);
        ctx.stroke();

        // DISPLAY COORDINATES
        ctx.strokeText(
            `x: ${Math.round(position.x)}, y: ${Math.round(position.y)}`,
            position.x + 5,
            position.y - 5 - (offsets[id] ?? 0)
        );
        offsets[id] = (offsets[id] ?? 0) + 10;
    }

    // DISPLAY VELOCITY
    for (const [id, physics, position] of world.query(CorePhysics, Position)) {
        ctx.fillStyle = 'black';
        // -- Display velocity
        ctx.beginPath();
        ctx.moveTo(position.x, position.y);
        ctx.lineTo(
            position.x + physics.velocity.x / 10,
            position.y + physics.velocity.y / 10
        );
        ctx.stroke();

        // DISPLAY MATHS
        ctx.strokeText(
            `mass : ${physics.mass}`,
            position.x + 5,
            position.y - 5 - offsets[id]
        );
        offsets[id] = (offsets[id] ?? 0) + 10;
    }

    // DISPLAY BOUNDING BOX
    for (const [_, boundingBox, position] of world.query(
        BoundingBox,
        Position
    )) {
        ctx.fillStyle = 'black';

        ctx.rect(
            position.x - boundingBox.width / 2,
            position.y - boundingBox.height / 2,
            boundingBox.width,
            boundingBox.height
        );
        ctx.stroke();
    }
}
