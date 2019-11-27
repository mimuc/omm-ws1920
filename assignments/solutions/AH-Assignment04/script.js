const urlPrefix = 'https://github.com/mimuc/omm-ws1920/blob/master/assignments/04-webcomponents/assignment-statistics-api/';
const googleChart = document.getElementsByTagName('google-chart')[0];


class AjaxEchoElement extends HTMLElement {
    constructor () {
        super();
        this.addEventListener('x-ajax-success', (e) => {
            console.log(e);
            e.stopPropagation();
            const pre = document.createElement('pre');
            pre.appendChild(document.createTextNode(JSON.stringify(e.detail, null, 4)));
            this.appendChild(pre);
            // TODO make the Google Chart display the response's data
            const key = Object.keys(e.detail)[0];
            googleChart.setAttribute('options', `{"title": "${key}"}`);
            googleChart.setAttribute('data', JSON.stringify(e.detail[key]));
        }, true);
    }
}
customElements.define('x-ajax-echo', AjaxEchoElement);

/*class AjaxElement extends HTMLElement {
    connectedCallback () {
        if (this.hasAttribute(url)) {
            const method = this.hasAttribute('method') ? this.getAttribute('method') : 'get';
            fetch(this.getAttribute(url), { method })
                .then((res) => res.json())
                .then((res) => {
                    this.dispatchEvent(new CustomEvent('x-ajax-success', { bubbles: true, detail: res }), true);
                });
        }
    }
}
customElements.define('x-ajax', AjaxElement);*/

class AjaxElement extends HTMLElement {

    static observedAttributes = ['url'];

    connectedCallback() {
        if (this.hasAttribute('url') && this.getAttribute('url')) {
            // Not triggered as no default url is given any more
            this.handleUrl();
        }
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        if (attr === 'url' && newVal) {
            this.handleUrl();
        }
    }

    handleUrl() {
        const method = this.hasAttribute('method') ? this.getAttribute('method') : 'get';
        fetch(this.getAttribute('url'), {method})
            .then((res) => res.json())
            .then((res) => {
                this.dispatchEvent(new CustomEvent('x-ajax-success', {
                    bubbles: true,
                    detail: res
                }));
            });
    }
}

function loadSemester(value) {
    chartAjaxWrapper.setAttribute('url', urlPrefix + value + ".json");
}

selectSemester.addEventListener("change", function () {
    loadSemester(this.value);
});

customElements.define('x-ajax', AjaxElement);

loadSemester(selectSemester.value);
