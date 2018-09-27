module.exports = {
    entry: './src/index.js',
    output: {
      path: __dirname + '/public',
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          loader: ["babel-loader"],
          query: {
              presets: ["latest", "stage-0", "react"]
          }
        }
      ]
    }
  };
  