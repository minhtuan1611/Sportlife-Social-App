module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
  plugins: [
    ...(process.env.NODE_ENV === 'test'
      ? ['babel-plugin-transform-import-meta']
      : []),
  ],
}
