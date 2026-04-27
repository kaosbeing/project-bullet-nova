import Component from './Component.ts';

export default class Render extends Component {
    public color: string;
    public width: number;
    public height: number;

    constructor(color: string, width: number, height: number) {
        super();
        this.height = height;
        this.width = width;
        this.color = color;
    }
}
