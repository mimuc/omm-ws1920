'use strict';



window.addEventListener('DOMContentLoaded', function () {
    const backButton = document.getElementById('backButton');
    const nextButton = document.getElementById('nextButton');
    const submitButton = document.getElementById('submitButton');

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
    submitButton.addEventListener('click', function () {
        captionImage();
    });

    /**
     (re)loads the images for the current filter config
     */
    function loadImageUrls() {
        // TODO load meme template images from the Imgflip API
        let url = 'https://api.imgflip.com/get_memes';
        let req = new XMLHttpRequest();
        req.onreadystatechange = function() {
            if (req.readyState === 4 && req.status === 200) {
                copyMemesToArray(JSON.parse(req.responseText));
            }
        };
        req.open('GET', url);
        req.send();
        showImage(0)
    }
    
    function copyMemesToArray(json) {
        memes = []; // clear memes array
        let length = json.data.memes.length;
        let rnd = Math.floor(Math.random()*(length-10)); // rnd num from 0 to length-10

        for(let i = rnd-10; i < rnd; i++) {
            memes.push(json.data.memes[i]);
        }
    }

    // TODO the imgflip API response does not contain a CORS header, so I can't test if the following works
    function captionImage() {
        let url = 'https://api.imgflip.com/caption_image';
        let req = new XMLHttpRequest();
        let text0 = document.querySelector('input[name=text0]').value;
        let text1 = document.querySelector('input[name=text1]').value;
        let params = JSON.stringify({
            template_id: memes[currentImageID].id,
            username: 'freeforall6',
            password: 'nsfw1234',
            text0: text0,
            text1: text1
        });

        req.open('POST', url);
        req.setRequestHeader('Content-type', 'application/json');

        req.onreadystatechange = function() {
            if (req.readyState === 4) {
                let json = JSON.parse(req.responseText);
                memes[currentImageID].url = json.data.url;
                showImage(currentImageID);
            }
        };
        req.send(params);
    }

    loadImageUrls();
});
