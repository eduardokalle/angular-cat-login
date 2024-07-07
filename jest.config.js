// jest.config.js
module.exports = {
   preset: 'jest-preset-angular',
   setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
   testEnvironment: 'jsdom',
   testPathIgnorePatterns: ['/node_modules/', '/dist/', '/e2e/'],
   transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
   globals: {
     'ts-jest': {
       tsconfig: '<rootDir>/tsconfig.spec.json',
       stringifyContentPathRegex: '\\.html$',
     },
   },
   moduleNameMapper: {
     '\\.(css|scss)$': 'identity-obj-proxy'
   }
 };