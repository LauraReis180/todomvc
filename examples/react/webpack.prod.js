const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = merge(common, {
  // Modo produção: build otimizado e pronto pra publicar
  mode: "production",

  // Source map pra facilitar debugar caso precise, mas separado do código
  devtool: "source-map",

  plugins: [
    // Plugin que extrai o CSS pra arquivos separados (não fica inline no JS)
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),

    // Plugin pra copiar arquivos que a gente precisa no build, tipo esse base.js que o TodoMVC usa
    new CopyPlugin({
      patterns: [
        { from: "./node_modules/todomvc-common/base.js", to: "base.js" },
      ],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        // Aqui no prod a gente extrai o CSS ao invés de jogar inline no JS
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },

  optimization: {
    minimize: true, // ativa a minimização do código pra deixar menor

    // Plugins que minificam CSS e JS pra deixar tudo bem enxuto
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
});
