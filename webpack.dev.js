const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    watchFiles: ['src/pages/**/*.html', 'src/pages/**/*.js', 'src/pages/**/*.scss', 'src/partials/*.html'],
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
    port: 3000,
    liveReload: true,
  },
});
