const express = require('express')
const multer = require('../middleware/upload')
const { upload } = require('../controllers/upload')
const router = express.Router()

router.post('/upload', multer, upload)

module.exports = router