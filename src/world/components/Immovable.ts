import Component from './Component.ts';

export default class Immovable extends Component {
    public isImmovable: boolean;

    constructor(isImmovable: boolean = true) {
        super();
        this.isImmovable = isImmovable;
    }
}
