const multer = require('multer')
const path = require('path')
const moment = require('moment')

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/images/')
    },
    filename(req, file, cb) {
        const [date, ext] = [moment().format('DDMMYYYY-HHmmss_SSS'), path.extname(file.originalname)]
        cb(null, `image${date}${ext}`)
    }
})
function fileFilter(req, file, cb) {
	const filetypes = /jpeg|jpg|png/
	const mimetype = filetypes.test(file.mimetype)

	if (!mimetype) {
		return cb('Вы можете загрузить изображения формата jpeg/jpg/png', false)
	}

	return cb(null, true)
}
const limits = {
    fileSize: 1024 * 1024 * 2
}

module.exports = multer({
    storage,
    fileFilter,
    limits,
}).array('images', 10)