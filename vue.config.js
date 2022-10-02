module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/apiDev': {
        target: 'https://api.pexels.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/apiDev': ''
        }
      },
      '/api': {
        // target: 'http://localhost:9090',
        target: 'https://my-json-server.typicode.com/doublesung/photoshare',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};

