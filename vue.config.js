const path = require('path')

const { defineConfig } = require('@vue/cli-service')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    experiments: {
      asyncWebAssembly: true
    },
    resolve: {
      fallback: {
        path: require.resolve('path-browserify')
        // 其他需要的核心模块
      }
    }
  },
  chainWebpack(config) {
    config.plugin('define').tap((args) => {
      args[0] = Object.assign(args[0], {
        // __VUE_I18N_FULL_INSTALL__: true,
        // __VUE_I18N_LEGACY_API__: true,
        // __INTLIFY_PROD_DEVTOOLS__: false,
        // __VUE_OPTIONS_API__: 'true',
        // __VUE_PROD_DEVTOOLS__: false,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
      })
      return args
    })
    // 设置 svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    // 创建一个新的规则，用于处理 element-plus 2 的错误
    config.module
      .rule('element-plus-2')
      .test(/\.mjs$/)
      // https://webpack.docschina.org/configuration/module/#ruletype
      .type('javascript/auto')
      .include.add(/node_modules/)
      .end()

    config.output.webassemblyModuleFilename = 'static/wasm/[modulehash].wasm'
    config.plugin('monaco').use(new MonacoWebpackPlugin())
  },
  devServer: {
    // 配置反向代理
    proxy: {
      // 当地址中有/api的时候会触发代理机制
      '/api': {
        // 要代理的服务器地址  这里不用写 api
        target: 'https://api.imooc-admin.lgdsunday.club/',
        changeOrigin: true // 是否跨域
      }
    }
  }
})
