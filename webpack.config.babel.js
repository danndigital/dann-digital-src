const AutoPrefixCSSPlugin = require("less-plugin-autoprefix");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ImageMinPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const ExtractLESS = new ExtractTextPlugin('css/[name].[hash:8].css');
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = (env = {}) => {
  if (!env.environment) {
    env.environment = 'local'
  }
  const isProduction = env.environment === 'production';
  console.log(env.environment);
  console.log('isProdutaction: ', isProduction);

  return {
    entry: [
      __dirname + "/source/_assets/js/app.js",
      __dirname + "/source/_assets/less/main.less",
    ],
    output: {
      path: __dirname + "/source",
      filename: "js/all.[hash:8].js"
    },
    devtool: (() => {
      if (isProduction) return false
      else return 'cheap-module-eval-source-map'
    })(),
    module: {
      rules: [
        {
          test: /\.(html)$/,
          use: {
            loader: 'html-loader'
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        },
        {
          test: /\.less$/,
          exclude: /node_modules/,
          use: ExtractLESS.extract([
            {
              loader: 'css-loader',
              options: {
                sourceMap: false,
                url: false
              }
            },
            {
              loader: 'less-loader',
              options: {
                plugins: [
                  new AutoPrefixCSSPlugin({browsers: ["last 2 versions"]})
                ],
                sourceMap: false,
              }
            }
          ])
        },
      ]
    },
    plugins: [
      ExtractLESS,
      new ManifestPlugin(),
      new WebpackShellPlugin({
        onBuildExit: ['php ./vendor/tapestry-cloud/tapestry/bin/tapestry.php build --clear --quiet --env=' + env.environment ]
      }),
      new CopyWebpackPlugin([{
        from: __dirname + "/source/_assets/img/",
        to: __dirname + "/source/img/"
      }]),
      new ImageMinPlugin({
        test: /\.(jpe?g|png|gif|svg)$/i
      }),
      new CleanWebpackPlugin(['source/img', 'source/css', 'source/js']),
    ]
  };
}