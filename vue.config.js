const path = require('path');
const resolve = (dir) => {
  return path.join(__dirname, './', dir);
}
const webpack = require('webpack');
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const cdn = [
  "https://cdn.bootcss.com/vue/2.6.10/vue.min.js",
  "https://cdn.bootcss.com/vue-router/3.0.2/vue-router.min.js",
  "https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js",
  "https://cdn.bootcss.com/element-ui/2.4.11/index.js",
  "https://cdn.bootcss.com/axios/0.18.0/axios.min.js",
  "https://cdn.bootcss.com/vue-i18n/5.0.3/vue-i18n.min.js",
  "https://cdn.bootcss.com/echarts/4.2.1/echarts.min.js",
]

const externals = {
  'vuex': 'Vuex',
  'vue-router': 'VueRouter',
  'vue-i18n': 'VueI18n',
  'echarts': 'echarts',
  "Vue": 'Vue',
  "element-ui": 'element',
  "axios": 'axios'
}

let plugins = [];
IS_PRODUCTION ? plugins = [
  new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 50, // 由于项目过大必须大于或等于30不然加载不出来
    minChunkSize: 1000
  }),
  new webpack.optimize.OccurrenceOrderPlugin()
] : plugins = [];

module.exports = {
  lintOnSave: false,
  devServer: {
    host: 'localhost',
    port: 3333,
    proxy: {
      '/api': {
        target: 'http://localhost:5555'
      }
    }
  },
  // 打包时不生成.map文件 避免看到源码
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        'image': resolve('src/assets'),
      },
      extensions: ['.js', '.vue', '.css', '.json', '.ts']
    },
    plugins: plugins
  },
  chainWebpack: config => {
    if (IS_PRODUCTION) {
      config.plugin('html')
        .tap(args => {
          args[0].cdn = cdn;
          return args;
        })
        .end()
      config.externals(externals);
    }
  }
}
