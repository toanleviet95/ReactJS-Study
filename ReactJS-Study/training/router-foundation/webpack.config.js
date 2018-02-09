var webpack = require('webpack');

module.exports = {
  entry: [
    'script!jquery/dist/jquery.min.js',
    'script!foundation-sites/dist/js/foundation.min.js',
    './app/app.jsx'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery'
    })
  ],
  resolve: {
    root: __dirname,
    alias: {
      HomePage: 'app/components/HomePage.jsx',
      Main: 'app/components/Main.jsx',
      Account: 'app/components/Account.jsx',
      Nav: 'app/components/Nav.jsx',
      Transaction: 'app/components/Transaction.jsx',
      SignIn: 'app/components/SignIn.jsx',
      AccountInfo: 'app/components/AccountInfo.jsx',
      Notification: 'app/components/Notification.jsx'
    }
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /node_modules/
      }
    ]
  }
};
