module.exports = {
  entry: './app/app.jsx',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    modules: [__dirname, 'node_modules'],
    alias: {
      reducer: 'app/reducers/main.js',
      store: 'app/storeConf.js',
      List: 'app/components/List.jsx',
      Note: 'app/components/Note.jsx',
      NoteForm: 'app/components/NoteForm.jsx',
      actions: 'app/actions.js'
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
