const { defineConfig } = require('@vue/cli-service');
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        'src': path.resolve(__dirname, 'src'),
        'components': path.resolve(__dirname, 'src/components'),
        'icons': path.resolve(__dirname, 'src/assets/svg'),
        'api': path.resolve(__dirname, 'src/api'),
      },
      extensions: ['*', '.tsx', '.ts', '.js', '.vue', '.json']
    },
  },
})
