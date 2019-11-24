# Counter App

## Install TypeScript, if you didn't so far

```bash
npm install -g typescript
```

## Transpilation

To transpile the TypeScript file to plain Javascript, run

```bash
npm run build
```

## Hints to get from breakout1-solution to this version with custom elements

* create `my-counter.html` straightforward like in the <my-meme> example. Mind the html import and the polyfill.
* in `my-counter.html`, add a second script that importing the transpiled mvc.js file
* in `mvc.ts` the view has to call `shadowRoot.getElementById...`  instead of `document.getElementById...` ! You have to pass `shadowRoot` as variable through Controller to View.
* call `new Controller(shadowRoot)` in `my-counter.html`'s createdCallback