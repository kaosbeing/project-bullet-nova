/**
 * Définition de classe pour un Component pour le World.
 */
class ComponentStore<T> {
    private data = new Map<number, T>();

    add(id: number, component: T) {
        this.data.set(id, component);
    }

    get(id: number): T | null {
        return this.data.get(id) ?? null;
    }

    remove(id: number) {
        this.data.delete(id);
    }

    entries() {
        return this.data.entries();
    }

    size() {
        return this.data.size;
    }
}

export default ComponentStore;
