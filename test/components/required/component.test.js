/* global test, expect */
const func = require('../../../lib/generator');

test(__dirname.split('/').pop(), () => {
  expect(func(`${__dirname}/component.js`)).toEqual([
    {
      boolProp: true,
      stringProp: 'Fringilla Sit Amet',
    },
    {
      boolProp: false,
      stringProp: 'Fringilla Sit Amet',
    },
  ]);
});
