module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/.vercel/',
    '/cypress/',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/emptyModule.js',
  },
  moduleDirectories: ['node_modules', 'src'],
};
