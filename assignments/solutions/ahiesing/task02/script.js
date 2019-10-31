'use strict';



window.addEventListener('DOMContentLoaded', function () {
    const backButton = document.getElementById('backButton');
    const nextButton = document.getElementById('nextButton');

    // TODO the memes array should be filled with the meme objects from the API
    let memes = [
        {
            url: 'https://www.naturalworldsafaris.com/media/3925/kamchatka-sophy-roberts.jpg',
            width: 1920,
            height: 1080,
            name: 'Kamchatka'
        },{
            url: 'https://www.explora.com/wp-content/uploads/2015/02/foto-1.jpg',
            width: 1440,
            height: 720,
            name: 'Patagonia'
        },{
            url: 'http://wallsdesk.com/wp-content/uploads/2016/05/Zhangjiajie-National-Forest-Park-China-Wallpaper-.jpg',
            width: 1920,
            height: 1200
        }
    ];
    const numberOfImages = () => memes.length;
    // this is a counter that holds the id/number of the currently displayed image.
    let currentImageID = 1;


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
        document.getElementById('slideShowImages').append(renderImage(meme.url, meme.width, meme.height, meme.name));

        console.log(`showing image ${number}`);
    }

    function renderImage(url, width, height, name){
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
        currentImageID = currentImageID === 0 ? numberOfImages()-1 : currentImageID - 1;
        showImage(currentImageID);
    });
    nextButton.addEventListener('click', function () {
        currentImageID = currentImageID === numberOfImages()-1 ? 0 : currentImageID + 1;
        showImage(currentImageID);
    });

    /**
     (re)loads the images for the current filter config
     */
    function loadImageUrls() {
        // TODO load meme template images from the Imgflip API
        showImage(0)
    }

    loadImageUrls();
});
