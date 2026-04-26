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
 */
