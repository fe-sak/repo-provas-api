export function Unauthorized() {
  return {
    statusCode: '401',
    message: '',
  };
}

export function Forbidden(message: string) {
  return {
    statusCode: '403',
    message: message,
  };
}

export function NotFound() {
  return {
    statusCode: '404',
  };
}

export function Conflict() {
  return {
    statusCode: '409',
  };
}

export function UnprocessableEntity(message: string | string[]) {
  return {
    statusCode: '422',
    message,
  };
}
