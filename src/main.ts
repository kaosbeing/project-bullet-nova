import './reset.css';

import World from './core/world.ts';
import renderSystem from './core/systems/RenderSystem.ts';
import physicsSystem from './core/systems/PhysicsSystem.ts';
import { Vector2 } from './core/utils/Vector2.ts';
import Render from './core/components/Render.ts';
import CorePhysics from './core/components/CorePhysics.ts';
import Position from './core/components/Position.ts';
import inputSystem from './core/systems/InputSystem.ts';
import Input from './core/components/Input.ts';
import debugSystem from './core/systems/DebugSystem.ts';
import BoundingBox from './core/components/BoundingBox.ts';
import collisionDetectionSystem from './core/systems/CollisionDetectionSystem.ts';
import Immovable from './core/components/Immovable.ts';
import collisionResolutionSystem from './core/systems/CollisionResolutionSystem.ts';

/**
 * CANVAS INIT
 */
const canvas = document.querySelector('canvas')!;
const ctx = canvas.getContext('2d')!;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/**
 * Gère le resize de la fenêtre
 */
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const world = new World();

// PLAYER
world
    .createEntity()
    .addComponent(
        world.getStore(Input),
        new Input({
            move_up: ['KeyW', 'ArrowUp'],
            move_down: ['KeyS', 'ArrowDown'],
            move_left: ['KeyA', 'ArrowLeft'],
            move_right: ['KeyD', 'ArrowRight'],
            dash: ['Space'],
            primary_fire: ['Mouse0'],
        })
    )
    .addComponent(world.getStore(Render), {
        color: 'red',
        width: 32,
        height: 32,
    })
    .addComponent(
        world.getStore(CorePhysics),
        new CorePhysics(new Vector2(), [])
    )
    .addComponent(
        world.getStore(Position),
        new Position(canvas.width / 2, canvas.height / 2)
    )
    .addComponent(world.getStore(BoundingBox), { width: 32, height: 32 });

// WALL
world
    .createEntity()
    .addComponent(
        world.getStore(Position),
        new Position(canvas.width / 3, canvas.height / 3)
    )
    .addComponent(world.getStore(Render), {
        color: 'grey',
        width: 75,
        height: 75,
    })
    .addComponent(world.getStore(BoundingBox), { width: 75, height: 75 })
    .addComponent(
        world.getStore(CorePhysics),
        new CorePhysics(new Vector2(), [], 1000)
    )
    .addComponent(world.getStore(Immovable), new Immovable());

let lastTime: number = 0;
function gameLoop(time: number) {
    const delta = (time - lastTime) / 1000; // TODO - Passer ça en normalisé *60 (diff par rapport à 1)
    lastTime = time;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    inputSystem(world);
    physicsSystem(world, delta);
    collisionDetectionSystem(world);
    collisionResolutionSystem(world);

    renderSystem(world, ctx);
    debugSystem(world, ctx);

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
