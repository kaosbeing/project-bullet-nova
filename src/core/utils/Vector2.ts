/**
 * Vector 2D pour utilisation custom. Utilisé dans les mouvements.
 */
export class Vector2 {
    public x = 0;
    public y = 0;

    constructor(x = 0, y = 0) {
        this.y = y;
        this.x = x;
    }

    /**
     * Set la valeur du vecteur courant.
     * @param x
     * @param y
     */
    set(x: number, y: number) {
        this.x = x;
        this.y = y;
        return this;
    }

    /**
     * Applique une rotation au vecteur
     * @param angle en radians
     */
    rotate(angle: number): this {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        const x = this.x * cos - this.y * sin;
        const y = this.x * sin + this.y * cos;

        this.x = x;
        this.y = y;

        return this;
    }

    /**
     * Ajoute le vecteur V au vecteur courant.
     * @param v
     */
    add(v: Vector2) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    /**
     * Soustrait le vecteur V au vecteur courant.
     * @param v
     */
    sub(v: Vector2): Vector2 {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    /**
     * Scale le vecteur par la scale S
     * @param s
     */
    scale(s: number) {
        this.x *= s;
        this.y *= s;
        return this;
    }

    /**
     * Scale le vecteur V, et l'ajoute au vecteur courant.
     * @param v
     * @param scale
     */
    addScaled(v: Vector2, scale: number) {
        this.x += v.x * scale;
        this.y += v.y * scale;
        return this;
    }

    /**
     * Retourne la longueur du vecteur
     */
    length() {
        return Math.hypot(this.x, this.y);
    }

    clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    /**
     * Normalise le vecteur.
     * Garde la même direction, mais lui donne une longueur de 1.
     */
    normalize() {
        const len = this.length();
        if (len > 0) {
            this.x /= len;
            this.y /= len;
        }
        return this;
    }
}
