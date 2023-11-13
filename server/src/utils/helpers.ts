import jwt from 'jsonwebtoken';

function generateJWT(payload: Object) {
  return `Bearer ${jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_LIFETIME
  })}`;
}

function excludeObjectProperty(propertyName: string, obj: { [key: string]: any }) {
  const cleanedObject: { [key: string]: any } = {};

  for (const prop in obj) {
    if (prop !== propertyName) {
      cleanedObject[prop] = obj[prop];
    }
  }

  return cleanedObject;
}

export { excludeObjectProperty, generateJWT };
