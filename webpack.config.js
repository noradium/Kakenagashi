module.exports = {
  context: __dirname + '/src/scripts',
  entry: {
    'top': './top.js',
    'users_edit': './users_edit.js',
    'background': './background.js'
  },
  output: {
    path: __dirname + '/dist/scripts',
    filename: "[name].js",
    chunkFilename: "[id].js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query:{
          presets: [
            ["env", {
              "targets": {
                "chrome": 59
              },
              "loose": true
            }],
            ['react']
          ],
          plugins: [
            // https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy#note-order-of-plugins-matters
            "transform-decorators-legacy",
            "transform-class-properties"
          ]
        }
      }
    ]
  }
};
