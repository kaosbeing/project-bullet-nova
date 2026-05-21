import Component from './Component.ts';

export default class BoundingBox extends Component {
    width: number;
    height: number;

    constructor(width: number, height: number) {
        super();
        this.width = width;
        this.height = height;
    }
}
