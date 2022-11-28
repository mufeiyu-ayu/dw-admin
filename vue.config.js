const path = require("path");
module.exports = {
  runtimeCompiler: true,
  devServer: {
    proxy: {
      "/api": {
        target: process.env.VUE_APP_BASEURL,
        changeOrigin: true,
      },
    },
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: "svg-sprite-loader",
          include: path.resolve(__dirname, "./src/svg"),
          options: { symbolId: "[name]" },
        },
      ],
    },
  },
  chainWebpack: function (config) {
    config.module
      .rule("svg")
      .exclude.add(path.resolve(__dirname, "./src/svg"))
      .end();
  },
};
