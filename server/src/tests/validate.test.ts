import { validate } from '../utils/validate';

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
const inValidLinkInUrl = ['http://www.linkedin.com/feed/', 'https://www.linkedin/feed/'];
const validLinkInUrl = [
  'https://www.linkedin.com/feed/',
  'https://www.linkedin.com/mynetwork/'
];
const inValidXingUrl = [
  'http:/www.xing.com/discover/updates',
  'https://www.xing.de/discover/'
];
const validXing = [
  'https://www.xing.com/notifications',
  'https://www.xing.com/discover/updates'
];

const validMinLength = ['1234', '12345', [1, 2, 3, 4, 5, 6]];
const InvalidMinLength = ['1', '123', ['1', '2'], [1, 2, 3]];

const validMaxLength = ['1', '123', ['1', '2'], [1, 2, 3]];
const InvalidMaxLength = ['1234', '12345', [1, 2, 3, 4, 5, 6]];

test.each(emptyValues)('is Empty String', (emptyValue) => {
  // @ts-ignore
  expect(() => validate.isEmpty('value', emptyValue)).toThrow();
});

test.each(notEmptyValues)('is Empty String', (emptyValue) => {
  // @ts-ignore
  expect(() => validate.isEmpty('value', emptyValue)).not.toThrow();
});

test.each(validIUEmails)('Valid IU Email', (email) => {
  expect(() => validate.isIuEmail(email)).not.toThrow();
});

test.each(invalidIUEmails)('Invalid IU Email', (email) => {
  expect(() => validate.isIuEmail(email)).toThrow();
});

test.each(validPasswords)('Valid Password', (password) => {
  expect(() => validate.isValidPassword(password)).not.toThrow();
});

test.each(inValidPasswords)('Invalid Password', (password) => {
  expect(() => validate.isValidPassword(password)).toThrow();
});

test.each(inValidLinkInUrl)('Invalid LinkedIn URL', (url) => {
  expect(() => validate.url('linkedin', url)).toThrow();
});

test.each(validLinkInUrl)('valid LinkedIn URL', (url) => {
  expect(() => validate.url('linkedin', url)).not.toThrow();
});

test.each(inValidXingUrl)('Invalid LinkedIn URL', (url) => {
  expect(() => validate.url('xing', url)).toThrow();
});

test.each(validXing)('valid LinkedIn URL', (url) => {
  expect(() => validate.url('xing', url)).not.toThrow();
});

test.each(InvalidMinLength)('Min Length 4', (value) => {
  expect(() => validate.min('value', value, 4)).toThrow();
});

test.each(validMinLength)('Min Length 4', (value) => {
  expect(() => validate.min('value', value, 4)).not.toThrow();
});

test.each(InvalidMaxLength)('Max Length 3', (value) => {
  expect(() => validate.max('value', value, 3)).toThrow();
});

test.each(validMaxLength)('Max Length 3', (value) => {
  expect(() => validate.max('value', value, 3)).not.toThrow();
});
