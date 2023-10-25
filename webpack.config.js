const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|avif|webp|svg|ttf|woff2?)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Svgo bug',
    }),
  ],
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: [
          {
            implementation: ImageMinimizerPlugin.svgoMinify,
            filter: (_, sourcePath) => !!sourcePath.match(/\.svg$/i),
            options: {
              encodeOptions: {
                multipass: true,
                plugins: [
                  {
                    // bug disappears
                    name: 'preset-default',
                    params: {
                      overrides: {
                        convertTransform: {
                          collapseIntoOne: false,
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      }),
    ],
  },
};
