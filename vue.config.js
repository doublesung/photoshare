module.exports = {
  pages: {
    index: {
      // entry for the page
      entry: 'src/main.js'
    }
  },
  devServer: {
    proxy: {
      '/apiDev': {
        target: 'https://api.pexels.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/apiDev': ''
        },
        logLevel: 'debug'
      },
      '/api': {
        target: 'http://localhost:9090',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       prepenData:
  //     }
  //   }
  // }
};

