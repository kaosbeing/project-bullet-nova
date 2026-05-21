import Entity from './Entity.ts';
import ComponentStore from './ComponentStore.ts';
import type Component from './components/Component.ts';
import type { CollisionEvent } from './utils/CollisionEvent.ts';

// C'est un hack ce truc mais azy ça marche
// Dit à TS que c'est pour init la-dite classe T
type ComponentClass<T extends Component> = new (...args: any[]) => T;

export default class World {
    nextId = 0;
    entities: Entity[] = [];
    collisions: CollisionEvent[] = [];

    private stores = new Map<Component, ComponentStore<Component>>();

    /**
     * Crées une nouvelle entité.
     */
    createEntity(): Entity {
        const e = new Entity(this.nextId++);
        this.entities.push(e);
        return e;
    }

    /**
     * Récupère un ComponentStore
     * @param type
     */
    getStore<T extends Component>(type: ComponentClass<T>): ComponentStore<T> {
        if (!this.stores.has(type)) {
            this.stores.set(type, new ComponentStore<T>());
        }
        // TS est pas sûr que le map garde la correspondance exacte du type mais y'a pas de raisons
        return this.stores.get(type)! as ComponentStore<T>;
    }

    /**
     * Query all the entities with its associated data, that have all the queried Components
     * -> J'pense ça sera un des premiers trucs à optimiser quand y'aura davantage d'entités
     *
     * @param components List of Components to query
     * @return Array of entities with data from components
     */
    query<T extends Component[]>(
        ...components: { [K in keyof T]: ComponentClass<T[K]> }
    ): Array<[number, ...T]> {
        if (components.length === 0) return []; // Skip si pas d'arg

        let stores = components.map((c) => this.getStore(c));

        // On récup le plus petit store pour avoir le moins d'opérations
        const baseStore = stores.reduce((a, b) =>
            a.size() < b.size() ? a : b
        );

        // Pour re-trier le résultat
        const indexOfBaseStore = stores.indexOf(baseStore);
        stores.splice(indexOfBaseStore, 1);

        const result: Array<[number, ...T]> = [];

        /**
         * Boucle sur les entités pour regarder si elles ont les autres composants demandés.
         */
        for (const [entity, firstComponent] of baseStore.entries()) {
            const tuple: [number, ...Array<Component>] = [entity];
            let valid = true;

            for (let i = 0; i < stores.length; i++) {
                const component = stores[i].get(entity);
                if (!component) {
                    valid = false;
                    break;
                }
                tuple.push(component);
            }

            // +1 parce qu'on a l'id de l'entité à 0
            tuple.splice(indexOfBaseStore + 1, 0, firstComponent);

            if (valid) {
                result.push(tuple as [number, ...T]);
            }
        }

        return result;
    }
}
