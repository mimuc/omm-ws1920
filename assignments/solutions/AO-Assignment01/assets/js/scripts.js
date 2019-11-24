const bgImagePaths = [
    'https://app-layout-assets.appspot.com/assets/bg1.jpg',
    'https://app-layout-assets.appspot.com/assets/bg2.jpg',
    'https://app-layout-assets.appspot.com/assets/bg3.jpg',
    'https://app-layout-assets.appspot.com/assets/bg4.jpg',
];

const sliderPrevious = document.getElementById('slider-previous');
const sliderNext = document.getElementById('slider-next');
const sliderSlideImage = document.getElementById('slider-slide-image');
const sliderSlideCount = document.getElementById('slider-slide-count');
const sliderSlideName = document.getElementById('slider-slide-name');

/**
 * Define if slides can be viewed as loop.
 * @type {boolean}
 */
let isLoop = false;
let imgIndex = 0;
updateSliderImage(imgIndex);

sliderPrevious.onclick = function () {
    updateSliderImage(imgIndex - 1);
};

sliderNext.onclick = function () {
    updateSliderImage(imgIndex + 1);
};

/**
 * Set the slider image with given index.
 * If loop is disabled, hide the previous/next button on first/last slide.
 *
 * @param newIndex the new image index
 */
function updateSliderImage(newIndex) {
    if (isLoop)
        imgIndex = (newIndex + bgImagePaths.length) % bgImagePaths.length;
    else {
        if (newIndex <= 0) {
            imgIndex = 0;
            sliderPrevious.style.display = 'none';
        } else if (newIndex >= bgImagePaths.length - 1) {
            imgIndex = bgImagePaths.length - 1;
            sliderNext.style.display = 'none';
        } else {
            imgIndex = newIndex;
            sliderPrevious.style.display = 'block';
            sliderNext.style.display = 'block';
        }
    }
    sliderSlideImage.src = bgImagePaths[imgIndex];
    sliderSlideCount.textContent = (imgIndex + 1);
}