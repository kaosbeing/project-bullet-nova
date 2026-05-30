import type GameState from '../class/GameState.ts';
import type Entity from '../class/Entity.ts';
import type World from '../../world/world.ts';
import Camera from '../class/Camera.ts';
import DebugSystem from '../../world/systems/DebugSystem.ts';
import { CameraSystem } from '../../world/systems/CameraSystem.ts';
import renderSystem from '../../world/systems/RenderSystem.ts';
import Position from '../../world/components/Position.ts';
import Render from '../../world/components/Render.ts';
import BoundingBox from '../../world/components/BoundingBox.ts';
import CorePhysics from '../../world/components/CorePhysics.ts';
import { Vector2 } from '../class/Vector2.ts';
import Immovable from '../../world/components/Immovable.ts';

export default class PlayingState implements GameState {
    player: Entity;
    camera: Camera;
    world: World;
    debugSystem: DebugSystem;

    // TODO - Delete this shit
    deltaTime: number = 0;

    constructor(player: Entity, world: World) {
        this.player = player;
        this.camera = new Camera(player);
        this.world = world;

        // INIT DEBUG SYSTEM
        this.debugSystem = new DebugSystem(world, this.camera);

        // WALL
        world
            .createEntity()
            .addComponent(world.getStore(Position), new Position(150, 150))
            .addComponent(world.getStore(Render), {
                color: 'grey',
                width: 75,
                height: 75,
            })
            .addComponent(world.getStore(BoundingBox), {
                width: 75,
                height: 75,
            })
            .addComponent(
                world.getStore(CorePhysics),
                new CorePhysics(new Vector2(), [], 1000)
            )
            .addComponent(world.getStore(Immovable), new Immovable());
    }

    // Définit mais pas utilisé pour le moment
    onEnter() {}
    onExit() {}

    update(deltaTime: number) {
        this.deltaTime = deltaTime;
        this.world.update(deltaTime);
    }

    render(canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext('2d')!;

        // SYSTEM INITS
        this.debugSystem.init();
        CameraSystem.init(ctx, this.camera, canvas);
        this.debugSystem.displayBackgroundGrid(ctx);

        // "ACTUAL" WORLD RENDERING
        CameraSystem.update(this.world, this.camera, this.deltaTime); // Hack pour utiliser le deltaTime dans les mouvements de camera (à voir si on garde)
        renderSystem(this.world, ctx);

        // DEBUGS
        this.debugSystem.displayPosition(ctx);
        this.debugSystem.displayPhysics(ctx);
        this.debugSystem.displayBoundingBox(ctx);

        // POST CAMERA RESET
        CameraSystem.end(ctx);
        this.debugSystem.displayCameraInfos(ctx);
    }
}
