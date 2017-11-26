/* global test, expect */
const func = require('../../../lib/runner');

test(__dirname.split('/').pop(), () => {
  expect(func(`${__dirname}/component.js`)).toEqual([
    {
      boolProp: false,
      stringProp: 'foo',
    },
  ]);
});
