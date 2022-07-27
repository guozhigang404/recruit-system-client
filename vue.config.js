const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // * 服务器代理
    proxy: {
        "/api": {
            target: "http://localhost:9001",
            changeOrigin: true
        },
        "/photo": {
            target: "http://localhost:9001",
            changeOrigin: true
        },
        "/pdf": {
            target: "http://localhost:9001",
            changeOrigin: true
        },
        "/excel": {
            target: "http://localhost:9001",
            changeOrigin: true
        }
    }
  }
})
