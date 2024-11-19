export default {
  transform: {
    '^.+\\.js$': 'babel-jest', // Transpile JavaScript files using Babel
  },
  testEnvironment: 'node', // Use Node.js environment
}
