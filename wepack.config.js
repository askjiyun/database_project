const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      "zlib": require.resolve("browserify-zlib"),
      "querystring": require.resolve("querystring-es3"),
      "stream": require.resolve("stream-browserify"),
      "fs": false,
      "path": require.resolve("path-browserify"),
      "buffer": require.resolve("buffer/")
    }
  },
  // 다른 webpack 설정 옵션들...
};
