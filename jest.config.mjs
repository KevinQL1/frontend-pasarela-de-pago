export default {
  testEnvironment: 'jsdom',

  testMatch: [
    // Setup testing environment for React DOM
  ],

  setupFilesAfterEnv: [
    '<rootDir>/tests/setupTests.js'
  ],

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest'
  },

  // Treat .jsx as ESM files when needed
  extensionsToTreatAsEsm: ['.jsx'],

  testMatch: [
    '**/tests/**/*.test.js',
    '**/tests/**/*.int.js'
  ],

  collectCoverageFrom: [
    'src/**/*.js',
    '!src/styles/**'
  ],

  testPathIgnorePatterns: [
    '/node_modules/',
    '/coverage/'
  ],

  moduleNameMapper: {
    '^#/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss)$': 'identity-obj-proxy'
  },

  clearMocks: true,

  displayName: {
    name: 'Frontend-Wompi-Test',
    color: 'blue'
  }
}
