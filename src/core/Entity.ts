import type ComponentStore from './ComponentStore.ts';

class Entity {
    public id: number;

    constructor(id: number) {
        this.id = id;
    }

    addComponent<T>(store: ComponentStore<T>, component: T) {
        store.add(this.id, component);
        return this;
    }

    getComponent<T>(store: ComponentStore<T>): T | null {
        return store.get(this.id) ?? null;
    }

    removeComponent<T>(store: ComponentStore<T>) {
        store.remove(this.id);
    }
}

export default Entity;
