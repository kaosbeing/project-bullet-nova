import type World from '../world.ts';
import Position from '../components/Position.ts';
import Render from '../components/Render.ts';

export default function renderSystem(
    world: World,
    ctx: CanvasRenderingContext2D
) {
    const positions = world.getStore(Position);
    const renderables = world.getStore(Render);

    for (const [entity, render] of renderables.entries()) {
        const pos = positions.get(entity);
        if (!pos) continue;

        ctx.fillStyle = render.color;
        ctx.fillRect(
            pos.x - render.width / 2,
            pos.y - render.width / 2,
            render.width,
            render.height
        );
    }
}
