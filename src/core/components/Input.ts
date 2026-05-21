import { Vector2 } from '../class/Vector2.ts';
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
    mousePosition = new Vector2();
    private pressedKeys = new Set<KeyCode>();

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
    }

    /**
     * Check si la touche associée à une action donnée est actuellement pressée
     * @param action
     */
    isActionDown(action: InputAction): boolean {
        const keys = this.bindings[action];
        return keys.some((key) => this.pressedKeys.has(key));
    }

    getMousePositionRelativeToCoordinates(coords: Vector2): Vector2 {
        return this.mousePosition.clone().sub(coords);
    }
}
