const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const excludedSvgoPluginsBecauseItCorruptImages = ['convertTransform'];

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
                  'cleanupAttrs',
                  'cleanupEnableBackground',
                  'cleanupIds',
                  'cleanupListOfValues',
                  'cleanupNumericValues',
                  'collapseGroups',
                  'convertColors',
                  'convertEllipseToCircle',
                  'convertPathData',
                  'convertShapeToPath',
                  'convertTransform',
                  'inlineStyles',
                  'mergePaths',
                  'mergeStyles',
                  'minifyStyles',
                  'moveElemsAttrsToGroup',
                  'moveGroupAttrsToElems',
                  'removeComments',
                  'removeDesc',
                  'removeDoctype',
                  'removeEditorsNSData',
                  'removeEmptyAttrs',
                  'removeEmptyContainers',
                  'removeEmptyText',
                  'removeHiddenElems',
                  'removeMetadata',
                  'removeNonInheritableGroupAttrs',
                  'removeTitle',
                  'removeUnknownsAndDefaults',
                  'removeUnusedNS',
                  'removeUselessDefs',
                  'removeUselessStrokeAndFill',
                  'removeViewBox',
                  'removeXMLProcInst',
                  'sortAttrs',
                  'sortDefsChildren',
                ].filter(item => !excludedSvgoPluginsBecauseItCorruptImages.includes(item)),
              },
            },
          },
        ],
      }),
    ],
  },
};
