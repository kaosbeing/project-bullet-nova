export default class Render {
    public color: string;
    public width: number;
    public height: number;

    constructor(color: string, width: number, height: number) {
        this.height = height;
        this.width = width;
        this.color = color;
    }
}
