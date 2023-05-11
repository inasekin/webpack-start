const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = (env)=> {
  const isDev = env.mode === 'development';

  return merge(common, {
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? "inline-source-map" : undefined,
  });
}
