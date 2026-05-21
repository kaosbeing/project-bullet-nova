import Component from './Component.ts';
import type { Vector2 } from '../class/Vector2.ts';

export default class Position extends Component {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        super();
        this.y = y;
        this.x = x;
    }

    /**
     * Utilitaire pour déplacer les coordonnées selon les valeurs d'un vecteur.
     * @param v
     */
    applyVector(v: Vector2): Position {
        this.x = this.x + v.x;
        this.y = this.y + v.y;
        return this;
    }
}
