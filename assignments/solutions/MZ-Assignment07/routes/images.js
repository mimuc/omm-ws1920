var path = require('path');
var uuid = require('uuid/v4');
var urlLib = require('url');

var express = require('express');
var router = express.Router();
const fileUpload = require('express-fileupload');

var imageDb = require('./imagedatabase.json')

router.use(fileUpload());

/* GET images */
router.get('/:category?', function(req, res) {
  let images = imageDb

  const { category } = req.params
  if (category) {
    images = images.filter(el => el.categories.includes(category))
  }

  const { location } = req.query
  if (location) {
    regexp = new RegExp(location, 'i')
    images = images.filter(el => regexp.test(el.location))
  }

  res.json({ images })
});

router.post('/:category', async function(req, res) {
  let { url, location } = req.body

  if (!location) return res.status(400)

  if (!url) {
    if (!req.files || !req.files.image) return res.status(400);

    const file = req.files.image
    const filename = uuid() + path.extname(file.name)
    await file.mv(path.join('public', filename))
    url = urlLib.format({
      protocol: req.protocol,
      host: req.get('host'),
      pathname: filename
    }).toString()
  }

  imageDb.push({
    categories: [req.params.category],
    url,
    location
  });

  res.status(201)
});

module.exports = router;
