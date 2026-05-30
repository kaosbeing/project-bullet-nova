import { Vector2 } from '../../core/class/Vector2.ts';
import Component from './Component.ts';

type KeyCode = string;

type InputAction =
    | 'move_up'
    | 'move_down'
    | 'move_left'
    | 'move_right'
    | 'dash'
    | 'primary_fire';

export default class Input extends Component {
    // Position de la souris DANS L'ECRAN = aka bounding box, PAS DANS LE MONDE
    private mousePosition = new Vector2();
    private pressedKeys = new Set<KeyCode>();

    // Le deltaY des évènements de scroll encore non résolu
    private scrollBuffer: number = 0;

    /**
     * Bindings par défaut
     * @private
     */
    private bindings: Record<InputAction, KeyCode[]>;

    /**
     * Init les event listener relatifs aux touches
     */
    constructor(bindings: Record<InputAction, KeyCode[]>) {
        super();
        this.bindings = bindings;

        window.addEventListener('keydown', (e) => {
            this.pressedKeys.add(e.code);
        });

        window.addEventListener('keyup', (e) => {
            this.pressedKeys.delete(e.code);
        });

        // MOUSE MOVE
        window.addEventListener('mousemove', (e) => {
            const rect = window.document.body.getBoundingClientRect();

            this.mousePosition.x = e.clientX - rect.left;
            this.mousePosition.y = e.clientY - rect.top;
        });

        // MOUSE DOWN
        window.addEventListener('mousedown', (e) => {
            this.pressedKeys.add('Mouse' + e.button);
        });

        // MOUSE UP
        window.addEventListener('mouseup', (e) => {
            this.pressedKeys.delete('Mouse' + e.button);
        });

        // SCROLL
        window.addEventListener('wheel', (e) => {
            this.scrollBuffer += e.deltaY;
        });
    }

    /**
     * Check si la touche associée à une action donnée est actuellement pressée
     * @param action
     */
    public isActionDown(action: InputAction): boolean {
        const keys = this.bindings[action];
        return keys.some((key) => this.pressedKeys.has(key));
    }

    public resolveScroll(deltaY: number) {
        this.scrollBuffer -= deltaY;
    }

    public getMousePosition() {
        return this.mousePosition;
    }

    public getScrollBuffer() {
        return this.scrollBuffer;
    }
}
