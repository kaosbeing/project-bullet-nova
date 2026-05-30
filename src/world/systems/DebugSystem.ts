import type World from '../world.ts';
import CorePhysics from '../components/CorePhysics.ts';
import Position from '../components/Position.ts';
import BoundingBox from '../components/BoundingBox.ts';
import type Camera from '../../core/class/Camera.ts';

export default class DebugSystem {
    private world: World;
    private camera: Camera;

    private fontSize = 16;

    private offsets: Map<number, number> = new Map();

    constructor(world: World, camera: Camera) {
        this.world = world;
        this.camera = camera;
    }

    /**
     * Fonction utilitaire pour écrire du texte. Pratique pour les entités notamment.
     */
    writeText(
        ctx: CanvasRenderingContext2D,
        id: number,
        text: string,
        x: number,
        y: number,
        offset: number = this.fontSize
    ): void {
        ctx.font = this.fontSize + 'px Arial';
        ctx.fillText(text, x + 5, y - 5 - this.offsets.get(id)!);
        this.offsets.set(id, this.offsets.get(id)! + offset);
    }

    /**
     * Init the debug system.
     */
    init() {
        this.offsets.set(0, 0); // Key 0 is just the "screen" key

        for (const entity of this.world.entities) {
            this.offsets.set(entity.id, 0);
        }
    }

    /**
     * Display positions of each entities, written near its center position
     */
    displayPosition(ctx: CanvasRenderingContext2D) {
        for (const [id, position] of this.world.query(Position)) {
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
            this.writeText(
                ctx,
                id,
                `x: ${Math.round(position.x)}, y: ${Math.round(position.y)}`,
                position.x,
                position.y
            );
        }
    }

    /**
     * Display the physics of an entity.
     * - Velocity vectors
     * - Mass
     */
    displayPhysics(ctx: CanvasRenderingContext2D) {
        for (const [id, physics, position] of this.world.query(
            CorePhysics,
            Position
        )) {
            ctx.fillStyle = 'black';
            // Display velocity vector
            ctx.beginPath();
            ctx.moveTo(position.x, position.y);
            ctx.lineTo(
                position.x + physics.velocity.x / 10,
                position.y + physics.velocity.y / 10
            );
            ctx.stroke();

            // WRITE VELOCITY
            this.writeText(
                ctx,
                id,
                `velocity : ${Math.round(physics.velocity.length())}`,
                position.x,
                position.y
            );

            // WRITE MASS
            this.writeText(
                ctx,
                id,
                `mass : ${physics.mass}`,
                position.x,
                position.y
            );
        }
    }

    /**
     * Display camera infos
     * - Camera coordinates
     * - Camera zoom
     */
    displayCameraInfos(ctx: CanvasRenderingContext2D) {
        const cameraX = Math.round(this.camera.position.x);
        const cameraY = Math.round(this.camera.position.y);

        // Coordinates
        this.writeText(
            ctx,
            0,
            `Camera x: ${cameraX}, y: ${cameraY}`,
            0,
            this.fontSize + 10,
            -this.fontSize
        );

        this.writeText(
            ctx,
            0,
            `Camera zoom : ${this.camera.zoom.toFixed(2)}`,
            0,
            this.fontSize + 10,
            -this.fontSize
        );
    }

    /**
     * Display the outline of the boudingBoxes of the entities
     */
    displayBoundingBox(ctx: CanvasRenderingContext2D) {
        // DISPLAY BOUNDING BOX
        for (const [_, boundingBox, position] of this.world.query(
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

    /**
     * Display a lil grid to see the world moving
     */
    displayBackgroundGrid(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = '#18181850';
        for (let x = 0; x < 10000; x += 64) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, 10000);
            ctx.stroke();
        }

        for (let y = 0; y < 10000; y += 64) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(10000, y);
            ctx.stroke();
        }

        ctx.strokeStyle = '#000';
    }
}
