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
    .addComponent(world.getStore(CorePhysics), {
        velocity: new Vector2(),
        forces: [],
    })
    .addComponent(world.getStore(Position), {
        x: canvas.width / 2,
        y: canvas.height / 2,
    });

let lastTime: number = 0;
function gameLoop(time: number) {
    const delta = (time - lastTime) / 1000; // TODO - Passer ça en normalisé *60 (diff par rapport à 1)
    lastTime = time;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    inputSystem(world);
    physicsSystem(world, delta);

    renderSystem(world, ctx);
    debugSystem(world, ctx);

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
