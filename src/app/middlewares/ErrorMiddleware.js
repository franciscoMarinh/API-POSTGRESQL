module.exports = (err, req, res, next) => {
    if (!err.statusCode) err.statusCode = 500;
    const { statusCode, message } = err;
    return res.status(statusCode).send({
        error: "error",
        statusCode,
        message
    });
}