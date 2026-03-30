const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH || '/',
  lintOnSave: true,
  devServer: {
    // proxy: {
    // '/graphql': {
    //   target: 'https://apibeautyos.mlgroup.vip',
    //   changeOrigin: true,
    //   // https://apibeautyos.mlgroup.vip/graphql
    // },
    // },
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "@/assets/scss/app.scss";',
      },
      // css: {
      //   additionalData: '@import "@/static/style/main.css";',
      // }
    },
    sourceMap: false,
  },

  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        // eslint-disable-next-line
        args[0].title = 'Meimate 設計師';
        return args;
      });
  },
  configureWebpack: {
    plugins: [
      new ESLintPlugin({
        context: 'src',
        extensions: ['.vue', '.js'],
        fix: true,
      }),
    ],
  },
  pwa: {
    name: 'Meimate Stylist',
    themeColor: '#F1F0F7',
    msTileColor: '#000000',
  },
};
