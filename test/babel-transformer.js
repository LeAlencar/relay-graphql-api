const config = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
}

const { createTransformer } = require('babel-jest').default;

module.exports = createTransformer({
  ...config,
});
