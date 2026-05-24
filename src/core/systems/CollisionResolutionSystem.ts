import type World from '../class/world.ts';
import Position from '../components/Position.ts';
import CorePhysics from '../components/CorePhysics.ts';

export default function collisionResolutionSystem(world: World) {
    const positions = world.getStore(Position);
    const physics = world.getStore(CorePhysics);

    for (const contact of world.collisions) {
        // On récup les positions & physics des entités qui collide
        const posA = positions.get(contact.a);
        const posB = positions.get(contact.b);

        if (!posA || !posB) {
            console.error(
                `Position non trouvée pour l' entité ${contact.a} ou l'entité ${contact.b} lors d'une collision.`
            );
            continue;
        }

        const physA = physics.get(contact.a);
        const physB = physics.get(contact.b);

        if (!physA || !physB) {
            console.error(
                `Collision détectée entre deux entités sans CorePhysics. (${contact.a} et ${contact.b})`
            );
            continue;
        }

        /**
         * RESOLUTION DE LA COLLISION :
         * - Calcul d'une collision physique -> ptet ça posera de gros problèmes de perf plus tard mais azy
         * - Calcul des forces
         * - Application des forces
         * - TODO : Collision Physic-Immovable
         * - TODO : Collision "event" (Entity-Projectile)
         */

        // Coefficient de restitution. En gros : à quel point ça rebondit.
        // TODO - Faire genre une constante globale ig / OU ALORS gérer par entités (genre des slimes ils sont plus bouncy uwu)
        const restitutionCoeff = 0.3;

        const relativeVelocity = physB.velocity.clone().sub(physA.velocity);
        contact.normal.normalize();

        // Produit scalaire
        const velocityAlongNormal = relativeVelocity.dot(contact.normal);

        // Do not resolve if objects are separating
        if (velocityAlongNormal >= 0) continue;

        // Compute impulse scalar (invMass bc its more computationally efficient 🤓)
        const invMassA = 1 / physA.mass;
        const invMassB = 1 / physB.mass;

        const impulseMagnitude =
            (-(1 + restitutionCoeff) * velocityAlongNormal) /
            (invMassA + invMassB);

        // Apply impulse
        const impulse = contact.normal.clone().scale(impulseMagnitude);
        physA.velocity.sub(impulse.clone().scale(invMassA));
        physB.velocity.add(impulse.clone().scale(invMassB));

        // Velocity correction
        const correctionMagnitude =
            Math.max(contact.penetration, 0) / (invMassA + invMassB);

        const correction = contact.normal.clone().scale(correctionMagnitude);

        // Apply in opposite directions
        posA.applyVector(correction.clone().scale(-invMassA));
        posB.applyVector(correction.clone().scale(invMassB));
    }
}
