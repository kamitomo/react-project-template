const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: './client/index.html',
  filename: './index.html',
})

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: process.env.NODE_ENV,

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: './client/main.tsx',
  output: {
    path: path.resolve('public'),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        // 拡張子 .ts もしくは .tsx の場合
        test: /\.tsx?$/,
        exclude: /node_modules/,
        // TypeScript をコンパイルする
        use: 'ts-loader',
      },
    ],
  },
  // import 文で .ts や .tsx ファイルを解決するため
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  // ES5(IE11等)向けの指定（webpack 5以上で必要）
  target: ['web', 'es5'],

  plugins: [htmlWebpackPlugin],

  // ローカル開発用環境を立ち上げる
  // 実行時にブラウザが自動的に localhost を開く
  devServer: {
    contentBase: 'public',
    open: true,
  },
}
