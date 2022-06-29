export function Unauthorized() {
    return {
        statusCode: '401'
    };
}
export function Forbidden(message) {
    return {
        statusCode: '403',
        message: message
    };
}
export function NotFound() {
    return {
        statusCode: '404'
    };
}
export function Conflict() {
    return {
        statusCode: '409'
    };
}
export function UnprocessableEntity(message) {
    return {
        statusCode: '422',
        message: message
    };
}
