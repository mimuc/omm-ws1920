/**
 * The model holds all data plus accessors and mutators
 */
var Model = /** @class */ (function () {
    function Model() {
        this.c = 0;
    }
    Model.prototype.notify = function () {
        this.observer(this);
    };
    Object.defineProperty(Model.prototype, "count", {
        /** Current counter value */
        get: function () {
            return this.c;
        },
        enumerable: true,
        configurable: true
    });
    /** Increment the counter */
    Model.prototype.inc = function () {
        this.c++;
        this.notify();
    };
    /** Decrement the counter */
    Model.prototype.dec = function () {
        this.c--;
        this.notify();
    };
    return Model;
}());
/**
 * The view manages all interaction with the DOM:
 * - Attaching event listeners
 * - Updating outputs
 */
var View = /** @class */ (function () {
    function View(initalModel, shadowRoot) {
        this.output = shadowRoot.getElementById('output');
        shadowRoot.getElementById('incBtn').addEventListener('click', function () {
            window.dispatchEvent(new Event('increment counter'));
        });
        shadowRoot.getElementById('decBtn').addEventListener('click', function () {
            window.dispatchEvent(new Event('decrement counter'));
        });
    }
    View.prototype.update = function (model) {
        this.output.innerText = model.count.toString(10);
    };
    return View;
}());
/**
 * The controller is the bridge between model and view,
 * passing around updates and events.
 */
var Controller = /** @class */ (function () {
    function Controller(shadowRoot) {
        var model = new Model();
        var view = new View(model, shadowRoot);
        model.observer = function (m) { return view.update(m); };
        window.addEventListener('increment counter', function () { return model.inc(); });
        window.addEventListener('decrement counter', function () { return model.dec(); });
    }
    return Controller;
}());
