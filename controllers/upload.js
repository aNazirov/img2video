const multer = require('../middleware/upload')
const path = require('path')
const videoshow = require('videoshow')
const fs = require('fs-extra')
const errorHandler = require('../utils/errorHandler')
const route = path.join(__dirname, '../uploads')

module.exports.upload = (req, res) => {
    const files = req.files
    multer(req, res, (err) => {
        if (err) return errorHandler(res, err, 400)
        if (!files?.length) return errorHandler(res, 'Файл не загружен, пожалуйста загрузите заного.', 400)
        const images = getPath(files)
        generateVideo(images)
            .then(videoUrl => {
                unlink('images')
                res.status(200).json({videoUrl})
            })
            .catch(err => {
                unlink('images')
                errorHandler(res, 'Что то пошло не так попробуйте заного.', 500)
            })
    })
}

function unlink(dirname) {
    return fs.emptyDirSync(`${route}/${dirname}`)
}

function getPath(files) {
    const imagePaths = files.reduce((paths, file, i) => {
        const path = {path: `${route}/images/${file.filename}`}
        return [...paths, path]
    }, [])
    return imagePaths
}

function generateVideo(images) {
    const videoOptions = {
        fps: 25,
        loop: 0.5, // seconds
        transition: false,
        // transitionDuration: 0.2, // seconds
        videoBitrate: 1024,
        videoCodec: 'libx264',
        size: '640x?',
        // audioBitrate: '128k',
        // audioChannels: 2,
        format: 'mp4',
        pixelFormat: 'yuv420p'
    }
    return new Promise((res, rej) => {
        videoshow(images, videoOptions)
            .save(`${route}/video/slideshow.mp4`)
            .on('start', function (command) {
                console.log('ffmpeg process started:', command)
            })
            .on('error', function (err, stdout, stderr) {
                console.error('Error:', err)
                rej(err)
            })
            .on('end', function (output) {
                const arr = output.split('/')
                const url = `${arr[arr.length - 2]}/${arr[arr.length - 1]}`
                res(url)
            })
    })
}