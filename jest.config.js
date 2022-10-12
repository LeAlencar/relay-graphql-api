/* eslint-disable no-undef */
module.exports = {
  testEnvironment: '<rootDir>/test/environment/mongodb',
  testPathIgnorePatterns: ['/node_modules/', './dist'],
  transform: {
    '^.+\\.(js|ts|tsx)?$': '<rootDir>/test/babel-transformer',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts|tsx)?$',
  moduleFileExtensions: ['ts', 'js', 'tsx', 'json'],
};
