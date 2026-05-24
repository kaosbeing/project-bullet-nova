import type World from '../class/world.ts';
import CorePhysics from '../components/CorePhysics.ts';
import Position from '../components/Position.ts';
import BoundingBox from '../components/BoundingBox.ts';
import type Camera from '../class/Camera.ts';

export default class DebugSystem {
    private static world: World;
    private static canvas: HTMLCanvasElement;
    private static camera: Camera;
    private static ctx: CanvasRenderingContext2D;

    private static fontSize = 16;

    private static offsets: Map<number, number> = new Map();

    constructor(world: World, canvas: HTMLCanvasElement, camera: Camera) {
        DebugSystem.world = world;
        DebugSystem.canvas = canvas;
        DebugSystem.ctx = DebugSystem.canvas.getContext('2d')!;
        DebugSystem.camera = camera;

        DebugSystem.ctx.font = DebugSystem.fontSize + 'px Arial';
    }

    /**
     * Fonction utilitaire pour écrire du texte. Pratique pour les entités noramment.
     * @param id
     * @param text
     * @param x
     * @param y
     * @param offset
     */
    static writeText(
        id: number,
        text: string,
        x: number,
        y: number,
        offset: number = this.fontSize
    ): void {
        this.ctx.fillText(text, x + 5, y - 5 - this.offsets.get(id)!);
        this.offsets.set(id, this.offsets.get(id)! + offset);
    }

    /**
     * Init the debug system.
     */
    static init() {
        this.offsets.set(0, 0); // Key 0 is just the "screen" key

        for (const entity of this.world.entities) {
            this.offsets.set(entity.id, 0);
        }
    }

    /**
     * Display positions of each entities, written near its center position
     */
    static displayPosition() {
        for (const [id, position] of this.world.query(Position)) {
            this.ctx.fillStyle = 'black';

            // DISPLAY CROSS AT ENTITY'S POSITION
            this.ctx.beginPath();
            this.ctx.moveTo(position.x - 5, position.y);
            this.ctx.lineTo(position.x + 5, position.y);
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.moveTo(position.x, position.y - 5);
            this.ctx.lineTo(position.x, position.y + 5);
            this.ctx.stroke();

            // DISPLAY COORDINATES
            this.writeText(
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
    static displayPhysics() {
        for (const [id, physics, position] of this.world.query(
            CorePhysics,
            Position
        )) {
            this.ctx.fillStyle = 'black';
            // Display velocity vector
            this.ctx.beginPath();
            this.ctx.moveTo(position.x, position.y);
            this.ctx.lineTo(
                position.x + physics.velocity.x / 10,
                position.y + physics.velocity.y / 10
            );
            this.ctx.stroke();

            // WRITE VELOCITY
            this.writeText(
                id,
                `velocity : ${Math.round(physics.velocity.length())}`,
                position.x,
                position.y
            );

            // WRITE MASS
            this.writeText(
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
    static displayCameraInfos() {
        const cameraX = Math.round(this.camera.position.x);
        const cameraY = Math.round(this.camera.position.y);

        // Coordinates
        this.writeText(
            0,
            `Camera x: ${cameraX}, y: ${cameraY}`,
            0,
            75,
            -this.fontSize
        );

        this.writeText(
            0,
            `Camera zoom : ${this.camera.zoom}`,
            0,
            75,
            -this.fontSize
        );
    }

    /**
     * Display the outline of the boudingBoxes of the entities
     */
    static displayBoundingBox() {
        // DISPLAY BOUNDING BOX
        for (const [_, boundingBox, position] of this.world.query(
            BoundingBox,
            Position
        )) {
            this.ctx.fillStyle = 'black';

            this.ctx.rect(
                position.x - boundingBox.width / 2,
                position.y - boundingBox.height / 2,
                boundingBox.width,
                boundingBox.height
            );
            this.ctx.stroke();
        }
    }

    /**
     * Display a lil grid to see the world moving
     */
    static displayBackgroundGrid() {
        this.ctx.strokeStyle = '#18181850';
        for (let x = 0; x < 10000; x += 64) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, 10000);
            this.ctx.stroke();
        }

        for (let y = 0; y < 10000; y += 64) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(10000, y);
            this.ctx.stroke();
        }

        this.ctx.strokeStyle = '#000';
    }
}
