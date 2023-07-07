const { merge } = require("webpack-merge");
// const singleSpaDefaults = require("webpack-config-single-spa-vue");

const path = require('path');

module.exports = {
  entry: './src/main.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.vue', '.html'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
// module.exports = (webpackConfigEnv, argv) => {
//   const defaultConfig = singleSpaDefaults({
//     orgName: "svelte-vue-vue-angular-spa",
//     projectName: "genearators",
//     webpackConfigEnv,
//     argv,
//   });

//   return merge(defaultConfig, {
//     // modify the webpack config however you'd like to by adding to this object
//     performance: {
//       hints: false,
//       maxAssetSize: 512000,
//       maxEntrypointSize: 512000,
//     },
//   });
// };
