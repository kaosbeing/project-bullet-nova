import Entity from './Entity.ts';
import ComponentStore from './ComponentStore.ts';

// Dit à TS que c'est pour init la-dite classe T
type ComponentClass<T> = new (...args: any[]) => T;

export default class World {
    nextId = 0;
    entities: Entity[] = [];

    private stores = new Map<any, ComponentStore<any>>();

    createEntity() {
        const e = new Entity(this.nextId++);
        this.entities.push(e);
        return e;
    }

    getStore<T>(type: ComponentClass<T>): ComponentStore<T> {
        if (!this.stores.has(type)) {
            this.stores.set(type, new ComponentStore<T>());
        }
        return this.stores.get(type)!;
    }
}
