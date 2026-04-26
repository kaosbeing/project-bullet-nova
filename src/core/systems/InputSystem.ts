import type World from '../world.ts';
import CorePhysics from '../components/CorePhysics.ts';
import Input from '../components/Input.ts';
import { Vector2 } from '../utils/Vector2.ts';

export default function inputSystem(world: World) {
    const inputs = world.getStore(Input);
    const corePhysics = world.getStore(CorePhysics);

    for (const [entity, input] of inputs.entries()) {
        const physics = corePhysics.get(entity);
        if (!physics) continue;

        let moveDirection = new Vector2(0, 0);

        if (input.isActionDown('move_up')) moveDirection.y -= 1;
        if (input.isActionDown('move_down')) moveDirection.y += 1;
        if (input.isActionDown('move_left')) moveDirection.x -= 1;
        if (input.isActionDown('move_right')) moveDirection.x += 1;

        moveDirection.normalize();

        physics.forces.push(moveDirection.scale(205));
    }
}
