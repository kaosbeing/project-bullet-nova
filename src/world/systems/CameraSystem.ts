import Camera from '../../core/class/Camera.ts';
import type World from '../world.ts';
import Position from '../components/Position.ts';
import Input from '../components/Input.ts';

export class CameraSystem {
    static update(world: World, camera: Camera, delta: number) {
        // TODO : Cam preshot déplacement + influé par curseur
        const targetPosition = world.getStore(Position).get(camera.target.id);
        const targetInput = world.getStore(Input).get(camera.target.id);
        if (!targetPosition || !targetInput) return;

        const smoothnessFactor = 0.9; // Smoothing. Lower is slower, higher is faster
        const lerpFactor = 1 - Math.pow(smoothnessFactor, delta * 60);

        camera.position.x +=
            (targetPosition.x - camera.position.x) * lerpFactor;
        camera.position.y +=
            (targetPosition.y - camera.position.y) * lerpFactor;

        /**
         * Resolve scroll buffer for the camera
         */
        if (targetInput.getScrollBuffer() !== 0) {
            // TODO - Que le scroll fasse un pourcentage du scroll total plutôt qu'une valeur fixe genre (que chaque tick de souris scroll autant que le précédent) (c'est juste une équation j'pense)
            const scrollResolved = targetInput.getScrollBuffer() * lerpFactor;
            camera.zoom -= scrollResolved * 0.001;

            // Clamp zoom between the zooms
            camera.zoom =
                camera.zoom < Camera.maxZoomOut
                    ? Camera.maxZoomOut
                    : camera.zoom;
            camera.zoom =
                camera.zoom > Camera.maxZoomIn ? Camera.maxZoomIn : camera.zoom;

            targetInput.resolveScroll(scrollResolved);
        }
    }

    static init(
        ctx: CanvasRenderingContext2D,
        camera: Camera,
        canvas: HTMLCanvasElement
    ) {
        ctx.save();

        // Que la "position" de la cam soit au centre, pas en haut à gauche
        ctx.translate(canvas.width * 0.5, canvas.height * 0.5);

        // Scale par rapport au zoom
        ctx.scale(camera.zoom, camera.zoom);

        // Pose la cam au bon endroit
        ctx.translate(-camera.position.x, -camera.position.y);
    }

    static end(ctx: CanvasRenderingContext2D) {
        ctx.restore();
    }
}
