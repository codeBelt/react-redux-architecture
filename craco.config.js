const path = require('path');

module.exports = function({ env, paths }) {
  return {
    babel: {
      presets: [],
      plugins: ['@babel/plugin-proposal-optional-chaining', '@babel/plugin-proposal-nullish-coalescing-operator'],
      // loaderOptions: { /* Any babel-loader configuration options: https://github.com/babel/babel-loader. */ },
      // loaderOptions: (babelLoaderOptions, { env, paths }) => { return babelLoaderOptions; }
    },
    webpack: {
      alias: {
        environment: path.join(__dirname, 'src', 'environments', process.env.CLIENT_ENV),
      },
    },
    jest: {
      configure: {
        modulePathIgnorePatterns: ['<rootDir>/src/environments'],
        moduleNameMapper: {
          environment: '<rootDir>/src/environments/test',
        },
      },
    },
  };
};
