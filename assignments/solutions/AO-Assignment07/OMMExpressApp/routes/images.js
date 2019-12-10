var express = require('express');
var router = express.Router();

let imagesDB = require('./imagedatabase');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.json({images: imagesDB});
});

router.get('/:category', function (req, res, next) {
    let images = imagesDB.filter(o => o.categories.includes(req.params.category));

    if (req.query.hasOwnProperty('location')) {
        images = images.filter(o => o.location.includes(req.query.location));
    }
    res.json({images: images});
});

router.post('/:category', function (req, res, next) {
    imagesDB.push({
        categories: [req.params.category],
        url: req.body.url,
        location: req.body.location
    });
    res.send();

});

module.exports = router;
