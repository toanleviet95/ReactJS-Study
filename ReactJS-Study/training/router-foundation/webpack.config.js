module.exports = {
  entry: './app/app.jsx',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    root: __dirname,
    alias: {
      HomePage: 'app/components/HomePage.jsx',
      Main: 'app/components/Main.jsx',
      Account: 'app/components/Account.jsx',
      Nav: 'app/components/Nav.jsx',
      Transaction: 'app/components/Transaction.jsx'
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
