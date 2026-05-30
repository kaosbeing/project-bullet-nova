import type GameState from './class/GameState.ts';

export default class GameStateManager {
    currentState: GameState;

    constructor(gameState: GameState) {
        this.currentState = gameState;
    }

    changeState(state: GameState) {
        // Close previous state
        this.currentState.onExit();

        this.currentState = state;

        // Init new current state
        this.currentState.onEnter();
    }

    update(deltaTime: number) {
        this.currentState.update(deltaTime);
    }

    render(canvas: HTMLCanvasElement) {
        this.currentState.render(canvas);
    }
}
