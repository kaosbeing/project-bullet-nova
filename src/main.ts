import './reset.css';

import World from './world/world.ts';
import { Vector2 } from './core/class/Vector2.ts';
import Render from './world/components/Render.ts';
import CorePhysics from './world/components/CorePhysics.ts';
import Position from './world/components/Position.ts';
import Input from './world/components/Input.ts';
import BoundingBox from './world/components/BoundingBox.ts';
import PlayingState from './core/states/PlayingState.ts';
import GameStateManager from './core/GameStateManager.ts';

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
const player = world
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
        width: 100,
        height: 100,
    })
    .addComponent(
        world.getStore(CorePhysics),
        new CorePhysics(new Vector2(), [])
    )
    .addComponent(
        world.getStore(Position),
        new Position(canvas.width / 2, canvas.height / 2)
    )
    .addComponent(world.getStore(BoundingBox), { width: 100, height: 100 });

const gameStateManager = new GameStateManager(new PlayingState(player, world));

let lastTime: number = 0;
function gameLoop(time: number) {
    // - Canvas init - Mandatory stuff - do not touch
    const deltaTime = (time - lastTime) / 1000; // TODO - Passer ça en normalisé *60 (diff par rapport à 1)
    lastTime = time;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // - Game state
    gameStateManager.update(deltaTime);
    gameStateManager.render(canvas);

    // - Game loop
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
