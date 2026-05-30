export default abstract class GameState {
    abstract onEnter(): void;
    abstract onExit(): void;
    abstract render(canvas: HTMLCanvasElement): void;
    abstract update(deltaTime: number): void;
}
