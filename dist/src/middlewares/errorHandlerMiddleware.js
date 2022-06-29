// eslint-disable-next-line @typescript-eslint/no-unused-vars
var errorHandler = function (error, _req, res, _next) {
    if (error.statusCode) {
        return res.sendStatus(error.statusCode);
    }
    return res.sendStatus(500);
};
export default errorHandler;
