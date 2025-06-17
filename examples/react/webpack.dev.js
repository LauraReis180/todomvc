const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  // Modo dev: deixa o build mais rápido e com debug fácil
  mode: "development",

  // Source map inline pra facilitar debugar o código direto no navegador
  devtool: "inline-source-map",

  // Configuração do servidor de desenvolvimento que serve os arquivos da pasta dist
  devServer: {
    static: "./dist",
  },

  // Aqui adiciono regra pra lidar com CSS só no dev (pra injetar direto no JS)
  module: {
    rules: [
      {
        test: /\.css$/i, // pega todos os arquivos CSS
        use: ["style-loader", "css-loader"], // primeiro lê o CSS, depois injeta no DOM como style
      },
    ],
  },
});
