'use strict';

window.addEventListener('DOMContentLoaded', function () {
    let memes = [];
    const backButton = document.getElementById('backButton');
    const nextButton = document.getElementById('nextButton');
    const genMemeButton = document.getElementById('genMemeButton');
    const memeTopInput = document.getElementById('memeTopInput');
    const memeBottomInput = document.getElementById('memeBottomInput');


    const numberOfImages = () => memes.length;
    // this is a counter that holds the id/number of the currently displayed image.
    let currentImageID = 0;

    /**
     * Fetch the data from specified url and forward results to callback.
     */
    function fetchData(url, data = {}, callback = null) {
        fetch(url, data)
            .then((res) => res.json())
            .then((value) => callback(value));
    }

    /**
     * shows the image by giving it the 'current' class
     * the CSS in the <style> block above specifies that only the slides
     * with the .current class are shown, the rest has display: none
     *
     * @param number {Number} id of the image.
     */
    function showImage(number) {
        let meme = memes[number];
        document.getElementById('slideShowImages').innerHTML = '';
        document.getElementById('slideShowImages')
            .append(renderImage(meme.url, meme.width, meme.height, meme.name));

        //console.log(`showing image ${number}`);
    }

    /**
     * Generate meme with the imgflip API.
     */
    function genMeme(number, topText, bottomText) {
        const formData = new FormData();
        const body = {
            template_id: memes[number].id,
            username: 'USERNAME',
            password: 'PASSWORD',
            text0: topText,
            text1: bottomText,
        };
        for (let key in body) {
            formData.append(key, body[key]);
        }
        fetchData('https://api.imgflip.com/caption_image',
            {
                method: 'POST',
                body: formData,
            }, (res) => {
                memes[number].url = res.data.url;
                showImage(number);
            });
    }

    function renderImage(url, width, height, name) {
        const figure = document.createElement('figure');
        figure.className = "slidecurrent";
        const newImage = document.createElement('img');
        newImage.src = url;
        newImage.width = width;
        newImage.height = height;
        const figCaption = document.createElement('figcaption');
        figCaption.innerHTML = `${name}   ${url}`;

        figure.appendChild(newImage);
        figure.appendChild(figCaption);

        return figure
    }


    backButton.addEventListener('click', function () {
        currentImageID = currentImageID == 0 ? numberOfImages() - 1 : currentImageID - 1;
        showImage(currentImageID);
    });
    nextButton.addEventListener('click', function () {
        currentImageID = currentImageID == numberOfImages() - 1 ? 0 : currentImageID + 1;
        showImage(currentImageID);
    });
    genMemeButton.addEventListener('click', function () {
        genMeme(currentImageID, memeTopInput.value, memeBottomInput.value);
    });

    /**
     (re)loads the images for the current filter config
     */
    function loadImageUrls() {
        fetchData('https://api.imgflip.com/get_memes', {}, (res) => {
            memes = res.data.memes;
            showImage(currentImageID);
        });
    }

    loadImageUrls();
});