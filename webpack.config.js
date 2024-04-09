const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const BrotliPlugin = require('brotli-webpack-plugin')
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const glob = require ('glob')

module.exports = {
  entry: {
    'js/bundle': './js/app.js',
    'css/style': './styles/style.less',
    'css/vendor': [
      require.resolve('@fortawesome/fontawesome-free/less/fontawesome.less'),
      require.resolve('@fortawesome/fontawesome-free/less/brands.less'),
      require.resolve('@fortawesome/fontawesome-free/less/solid.less'),
      require.resolve('highlight.js/styles/obsidian.css')
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '_site'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [
          process.env.NODE_ENV === 'development'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name]-[hash].css' }),
    new BrotliPlugin(),
    new WebpackManifestPlugin()
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new ImageMinimizerPlugin({
        externalImages: {
          context: '.',
          sources: glob.sync('web/static/assets/*.jpg'),
          destination: 'priv/static'
        },
        minimizer: {
          implementation: ImageMinimizerPlugin.sharpMinify,
          options: {
            encodeOptions: {
              mozjpeg: {              
                quality: 75,
                progressive: true
              },
            }
          }
        }
      }),
    ]
  }
}
