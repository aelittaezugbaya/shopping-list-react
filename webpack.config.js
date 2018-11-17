const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const PATHS = {
  frontend: path.join(__dirname, 'frontend'),
  build: path.join(__dirname, 'build'),
};


const commonConfig= {
  entry: {
    frontend: PATHS.frontend
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(PATHS.frontend, 'static_assets'),
        to: path.join(PATHS.build, '/static'),
      },
    ]),
    new HtmlWebpackPlugin({
      title: 'Shopping List',
      template: path.join(PATHS.frontend, 'template.html')
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast 
      // and not allow any straggling "old" SWs to hang around
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true,
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.js$/,
        exclude:/node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|)$/,
        loader: 'file-loader',
      },
    ],
  }
};

const productionConfig = () => commonConfig;

const developmentConfig = () => {
  const config = {
    devServer: {
      historyApiFallback: true,
      stats: 'errors-only',
      host: process.env.HOST, // Defaults to `localhost`
      port: process.env.PORT, // Defaults to 8080
      proxy: {
        '/api/**': "http://localhost:3000/",
        // '/socket.io/**':  "ws://localhost:8000/",
      }
    },
  };

  return Object.assign(
    {},
    commonConfig,
    config
  );
};

module.exports=(env)=> {
  if (env === 'production') {
    return productionConfig();
  }

  return developmentConfig()
}