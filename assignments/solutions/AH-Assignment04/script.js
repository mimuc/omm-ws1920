class AjaxEchoElement extends HTMLElement {
    constructor () {
        super();
        this.addEventListener('x-ajax-success', (e) => {
            e.stopPropagation();
            const pre = document.createElement('pre');
            pre.appendChild(document.createTextNode(JSON.stringify(e.detail, null, 4)))
            this.appendChild(pre);
            // TODO make the Google Chart display the response's data
        }, true);
    }
}
customElements.define('x-ajax-echo', AjaxEchoElement);

class AjaxElement extends HTMLElement {
    connectedCallback () {
        if (this.hasAttribute('url')) {
            const method = this.hasAttribute('method') ? this.getAttribute('method') : 'get';
            fetch(this.getAttribute('url'), { method })
                .then((res) => res.json())
                .then((res) => {
                    this.dispatchEvent(new CustomEvent('x-ajax-success', { bubbles: true, detail: res }), true);
                });
        }
    }
}
customElements.define('x-ajax', AjaxElement);
