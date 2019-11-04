/**
 * The model holds all data plus accessors and mutators
 */
class Model {
    private c = 0;

    public observer: (_: Model) => void;

    private notify () {
        this.observer(this);
    }

    /** Current counter value */
    public get count (): number {
        return this.c;
    }

    /** Increment the counter */
    public inc (): void {
        this.c++;
        this.notify();
    }

    /** Decrement the counter */
    public dec (): void {
        this.c--;
        this.notify();
    }
}


/**
 * The view manages all interaction with the DOM:
 * - Attaching event listeners
 * - Updating outputs
 */
class View {
    private output: HTMLSpanElement;

    constructor (initalModel: Model) {
        this.output = document.getElementById('output');

        document.getElementById('incBtn').addEventListener('click', () => {
            window.dispatchEvent(new Event('increment counter'));
        });

        document.getElementById('decBtn').addEventListener('click', () => {
            window.dispatchEvent(new Event('decrement counter'));
        });
    }

    update (model: Model) {
        this.output.innerText = model.count.toString(10);
    }
}


/**
 * The controller is the bridge between model and view,
 * passing around updates and events.
 */
class Controller {
    constructor () {
        const model = new Model();
        const view = new View(model);

        model.observer = (m) => view.update(m);

        window.addEventListener('increment counter', () => model.inc());
        window.addEventListener('decrement counter', () => model.dec());
    }
}