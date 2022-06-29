export function validateSchemaMiddleware(schema) {
    return function (req, res, next) {
        var validation = schema.validate(req.body, { abortEarly: false });
        if (validation.error) {
            return res
                .status(422)
                .send(validation.error.details.map(function (detail) {
                return detail.message.replace(/"/g, '');
            }));
        }
        next();
    };
}
