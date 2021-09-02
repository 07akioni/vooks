module.exports = {
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts'
  ],
  coveragePathIgnorePatterns: [
    'src/__tests__'
  ],
  testMatch: [
    '**/__tests__/**/*.spec.ts'
  ]
}
