const getParsedPassports = (input) =>
  input.split('\n\n').map((rawPassport) =>
    rawPassport.split(/\s/g).reduce((obj, field) => {
      const [key, value] = field.split(':');
      obj[key] = value;
      return obj;
    }, {})
  );

const validatePassportFields = (passport) => {
  const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  const passportFields = Object.keys(passport);
  return requiredFields.every((field) => passportFields.includes(field));
};

const validatePassportValues = (passport) => {
  const rules = {
    byr: (val) => /^\d{4}$/.test(val) && val >= 1920 && val <= 2002,
    iyr: (val) => /^\d{4}$/.test(val) && val >= 2010 && val <= 2020,
    eyr: (val) => /^\d{4}$/.test(val) && val >= 2020 && val <= 2030,
    hgt: (val) => {
      const test = /^(\d{2,3})(cm|in)$/.exec(val);
      if (test) {
        const [, height, unit] = test;
        if (unit === 'cm') return height >= 150 && height <= 193;
        if (unit === 'in') return height >= 59 && height <= 76;
        return false;
      }
      return false;
    },
    hcl: (val) => /^#[0-9a-f]{6}$/.test(val),
    ecl: (val) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(val),
    pid: (val) => /^\d{9}$/.test(val),
    cid: () => true,
  };

  return Object.entries(passport).every(([field, value]) => rules[field]?.(value));
};

const puzzle1 = (input) => getParsedPassports(input).filter(validatePassportFields).length;

const puzzle2 = (input) =>
  getParsedPassports(input).filter(validatePassportFields).filter(validatePassportValues).length;

module.exports = {
  puzzle1,
  puzzle2,
};
