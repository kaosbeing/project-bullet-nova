import type World from '../world.ts';
import BoundingBox from '../components/BoundingBox.ts';
import Position from '../components/Position.ts';
import { Vector2 } from '../../core/class/Vector2.ts';

/**
 * DU COUP des notes pour le futur :
 * - BROADPHASE pour opti les collisions https://research.ncl.ac.uk/game/mastersdegree/gametechnologies/physicstutorials/6accelerationstructures/Physics%20-%20Spatial%20Acceleration%20Structures.pdf
 * - Collision matrix (qui collide avec quoi) (genre Projectile collide avec Player, Enemy et Wall, mais Wall collide avec rien genre ? jsp a voir)
 *
 * PIEGES :
 * - Séparer les entités via des tags, layer ou bitmasks (quoi que ça veuille dire)
 * - Jamais allouer dans une boucle
 * - Collision APRÈS mouvement
 * - Résoudre les collisions PAR PAIRES (A ET B, pas juste A puis B sinon explosion)
 * - Les entités très rapides nsm (raycast plus tard)
 *
 * Système de détection de collision. Fais un array et balance tout.
 */
export default function collisionSystem(world: World) {
    const entities = world.query(BoundingBox, Position);

    world.collisions.length = 0; // reset

    for (let i = 0; i < entities.length; i++) {
        const [idA, boxA, posA] = entities[i];

        for (let j = i + 1; j < entities.length; j++) {
            const [idB, boxB, posB] = entities[j];

            const dx = posB.x - posA.x;
            const dy = posB.y - posA.y;

            const overlapX = boxA.width / 2 + boxB.width / 2 - Math.abs(dx);
            const overlapY = boxA.height / 2 + boxB.height / 2 - Math.abs(dy);

            if (overlapX <= 0 || overlapY <= 0) continue;

            // Collision détectée
            if (overlapX < overlapY) {
                // collision horizontale
                const normalX = new Vector2(Math.sign(dx), 0);

                world.collisions.push({
                    a: idA,
                    b: idB,
                    normal: normalX.normalize(),
                    penetration: overlapX,
                });
            } else {
                // collision verticale
                const normalY = new Vector2(0, Math.sign(dy));

                world.collisions.push({
                    a: idA,
                    b: idB,
                    normal: normalY.normalize(),
                    penetration: overlapY,
                });
            }
        }
    }
}
