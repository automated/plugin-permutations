const fs = require('fs');
const { parse } = require('react-docgen');

const fill = {
  bool: [true, false],
  string: 'Fringilla Sit Amet',
};

const deriveValue = (prop) => {
  const {
    defaultValue,
    private: { shouldVariate } = {},
    type: { name },
  } = prop;
  const { value } = defaultValue || {};
  const shouldVariateLocal = shouldVariate || 0;
  let shouldVariateNext;
  let newValue;
  switch (name) {
    case 'bool':
      if (defaultValue) {
        newValue = value === !'true';
      } else {
        newValue = fill.bool[shouldVariateLocal];
        shouldVariateNext =
          shouldVariateLocal === fill.bool.length - 1
            ? 0
            : shouldVariateLocal + 1;
      }
      break;
    case 'string':
      newValue = defaultValue
        ? value.replace(/^["']/, '').replace(/["']$/, '')
        : fill.string;
      break;
    default:
      newValue = value;
  }
  return {
    ...prop,
    private: {
      shouldVariate: shouldVariateNext,
      value: newValue,
    },
  };
};

const generateUseCases = (props, useCases) => {
  if (!props) {
    useCases.unshift({});
  } else {
    useCases.unshift(Object.keys(props).reduce((accum, key) => {
      const prop = props[key];
      const value = deriveValue(prop);
      if (value.private.shouldVariate) {
        generateUseCases(
          {
            ...props,
            [key]: deriveValue(prop),
          },
          useCases,
        );
      }
      return Object.assign(accum, { [key]: value.private.value });
    }, {}));
  }
  return useCases;
};

const generatePermutations = (props) => {
  const useCases = generateUseCases(props, []);
  return useCases;
};

module.exports = path =>
  generatePermutations(parse(fs.readFileSync(path, 'utf8')).props);
