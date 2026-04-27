import Component from './Component.ts';

export default class Position extends Component {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        super();
        this.y = y;
        this.x = x;
    }
}
