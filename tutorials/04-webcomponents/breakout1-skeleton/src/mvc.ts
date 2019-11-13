/**
 * The model holds all data plus accessors and mutators
 */
class Model {
  private c = 0;
  public observer: (_: Model) => void;

  // TODO: Trigger View update via Controller
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
      // TODO: Trigger Model update via Controller
      initalModel.inc();
    });

    document.getElementById('decBtn').addEventListener('click', () => {
      // TODO: Trigger Model update via Controller
      initalModel.dec();
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

    // TODO: Link Model notify to View update

    // TODO: Link View events to Model method calls
  }
}
