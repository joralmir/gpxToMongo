'use strict';
var express = require('express'),
router = express.Router(),
controller = require('../controllers/controller'),
multer  = require('multer');

// File is saved locally in the specified destination
var upload = multer({ dest: 'uploads/' });

module.exports = router
.get('/', controller.get)
.post('/', upload.single('file'), controller.post);
