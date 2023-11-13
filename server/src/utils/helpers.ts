import jwt from 'jsonwebtoken';

function generateJWT(payload: Object) {
  return `Bearer ${jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_LIFETIME
  })}`;
}

function excludeSensitiveProperties(
  propertiesToExclude: string[],
  obj: { [key: string]: any }
): { [key: string]: any } {
  function cleanObject(object: { [key: string]: any }): { [key: string]: any } {
    const cleanedObject: { [key: string]: any } = Array.isArray(object) ? [] : {};

    for (const prop in object) {
      if (object.hasOwnProperty(prop)) {
        if (!propertiesToExclude.includes(prop)) {
          if (typeof object[prop] === 'object' && object[prop] !== null) {
            cleanedObject[prop] = cleanObject(object[prop]);
          } else {
            cleanedObject[prop] = object[prop];
          }
        }
      }
    }

    return cleanedObject;
  }

  return cleanObject(obj);
}

export { excludeSensitiveProperties, generateJWT };
