var express = require('express');
var router = express.Router();

// Multer to handle multi-form data (like files)
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {cb(null, 'public/uploads/')},
    filename: function (req, file, cb) {cb(null, file.originalname)}
});
var upload = multer({ storage: storage });

let imagesDB = require('./imagedatabase');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.json({images: imagesDB});
});

router.get('/:category', function (req, res, next) {
    let images = imagesDB.filter(o => o.categories.includes(req.params.category));

    if (req.query.hasOwnProperty('location')) {
        images = images.filter(o => o.location.toLowerCase().includes(req.query.location.toLowerCase()));
    }
    res.json({images: images});
});

router.post('/:category', upload.single('image'), function (req, res, next) {
    // If multer has parsed file from form-data
    if(req.file) {
        req.body.url = 'http://localhost:3000/uploads/' + req.file.filename;
    }

    // Add image to DB (file upload and url upload)
    imagesDB.push({
        categories: [req.params.category],
        url: req.body.url,
        location: req.body.location
    });
    res.send();
});

module.exports = router;
