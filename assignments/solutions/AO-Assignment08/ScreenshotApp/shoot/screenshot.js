(function () {

    /**
     * generates an element that displays a CSS loading animation
     *
     * @return {jQuery|HTMLElement} can be appended anywhere in the DOM.
     */
    function makeCSSLoader() {
        var loaderEl = $('<div class="cssload-container">');
        var wheelEl = $('<div class="cssload-speeding-wheel">');
        loaderEl.append(wheelEl);
        return loaderEl;
    }

    // TODO: insert your code here to generate the screenshot.
    // how? make an Ajax POST request to 'screenshots/create?url={insert-url-here}'
    // show a loading animation while the request is loading

    const form = document.getElementById("urlForm");
    form.onsubmit = () => {
        const url = document.getElementById('urlInput').value;
        if(url) {
            // Animation
            const resultElement = document.getElementById('result');
            const loader = makeCSSLoader();
            resultElement.innerHTML = "";
            resultElement.appendChild(loader.get(0)); // Convert jQuery element to DOM element

            // Load screenshot asynchronously
            (async () => {
                let res = await fetch(`/shoot/screenshots/create?url=${url}`);
                res = await res.json();
                const img = document.createElement('img');
                img.src = res.path;
                img.style.width = "100%";
                resultElement.innerHTML = "";
                resultElement.appendChild(img);
            })();
        } else {
            alert("No URL given");
        }

        // Prevent from submitting
        return false;
    }

})();