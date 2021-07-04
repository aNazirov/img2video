module.exports = (res, error, status = 500) => {
    res.status(status).json({
        succes: false,
        message: error.message ? error.message : error
    })
}