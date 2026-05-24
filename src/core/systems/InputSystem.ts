import type World from '../class/world.ts';
import CorePhysics from '../components/CorePhysics.ts';
import Input from '../components/Input.ts';
import { Vector2 } from '../class/Vector2.ts';

export default function inputSystem(world: World) {
    for (const [_, input, physics] of world.query(Input, CorePhysics)) {
        let moveDirection = new Vector2(0, 0);

        if (input.isActionDown('move_up')) moveDirection.y -= 1;
        if (input.isActionDown('move_down')) moveDirection.y += 1;
        if (input.isActionDown('move_left')) moveDirection.x -= 1;
        if (input.isActionDown('move_right')) moveDirection.x += 1;

        moveDirection.normalize();

        // TODO - Gérer la MS différemment
        physics.forces.push(moveDirection.scale(100));
    }
}
