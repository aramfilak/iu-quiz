import { isEmpty, isIuEmail, isValidPassword } from '../utils/validators';

const emptyValues = ['   ', ' ', undefined, null, []];
const notEmptyValues = ['d', 'dd3d'];
const validIUEmails = ['alex.smith@iu-study.org', 'alex.smith@iubh-fernstudium.de'];
const invalidIUEmails = [
  '',
  '$@iu-study.org',
  '@iubh-fernstudium.de',
  'alex.smith@iubh-fernstudium.org',
  '@iubh-fernstudium.org',
  'alex.smith@gmail.com',
  'alex.smith@iu-study.de',
  'alex.smith@gmail.com',
  'alex.smith@iu-study.de'
];
const validPasswords = ['1111111a', 'aaaaaaa2', 'aaaa111$$', '32kljsd€$1'];
const inValidPasswords = ['1', ' ', '1111', '123456789', 'qweasdrf', 'aaa'];

test.each(emptyValues)('is Empty String', (emptyValue) => {
  // @ts-ignore
  expect(() => isEmpty('value', emptyValue)).toThrow();
});

test.each(notEmptyValues)('is Empty String', (emptyValue) => {
  // @ts-ignore
  expect(() => isEmpty('value', emptyValue)).not.toThrow();
});

test.each(validIUEmails)('Valid IU Email', (email) => {
  expect(() => isIuEmail(email)).not.toThrow();
});

test.each(invalidIUEmails)('Invalid IU Email', (email) => {
  expect(() => isIuEmail(email)).toThrow();
});

test.each(validPasswords)('Valid Password', (password) => {
  expect(() => isValidPassword(password)).not.toThrow();
});

test.each(inValidPasswords)('Invalid Password', (password) => {
  expect(() => isValidPassword(password)).toThrow();
});
