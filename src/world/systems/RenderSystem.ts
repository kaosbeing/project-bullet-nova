import type World from '../world.ts';
import Position from '../components/Position.ts';
import Render from '../components/Render.ts';

export default function renderSystem(
    world: World,
    ctx: CanvasRenderingContext2D
) {
    for (const [_, render, pos] of world.query(Render, Position)) {
        ctx.fillStyle = render.color;
        ctx.fillRect(
            pos.x - render.width / 2,
            pos.y - render.width / 2,
            render.width,
            render.height
        );
    }
}
