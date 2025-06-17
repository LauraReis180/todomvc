const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  // Ponto de entrada principal do app — o arquivo onde tudo começa
  entry: {
    app: path.resolve(__dirname, "src", "index.js"),
  },

  // Plugins usados para facilitar nosso build, tipo gerar o index.html com tudo certo
  plugins: [
    new HtmlWebpackPlugin({
      title: "TodoMVC: React", // título da página
      template: path.resolve(__dirname, "public", "index.html"), // base do HTML pra injetar o bundle
    }),
  ],

  // Configura onde o arquivo gerado vai ficar e o nome dele
  output: {
    filename: "[name].bundle.js", // nome do arquivo final, aqui 'app.bundle.js'
    path: path.resolve(__dirname, "dist"), // pasta onde tudo vai ser salvo no final
    clean: true, // limpa a pasta 'dist' antes de gerar os arquivos novos (pra não acumular lixo)
  },

  // Pra quando importarmos sem extensão, ele tenta esses tipos (js e jsx)
  resolve: {
    extensions: [".js", ".jsx"],
  },

  // Regras de como tratar os arquivos que o webpack encontrar
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // arquivos JS e JSX passam por aqui
        exclude: /node_modules/, // não processa o que está em node_modules (pra ser rápido)
        use: {
          loader: "babel-loader", // usa o Babel pra transformar código moderno em algo que todos navegadores entendem
          options: {
            presets: [
              ["@babel/preset-env", { targets: "defaults" }], // para compatibilidade com navegadores padrão
              ["@babel/preset-react", { runtime: "automatic" }], // pra usar React com a sintaxe JSX automática (React 17+)
            ],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // arquivos de imagem passam por aqui
        type: "asset/resource", // faz o webpack copiar essas imagens pra pasta de saída
      },
    ],
  },
};
