module.exports = {
  configureWebpack: () => {
    if (process.env.NODE_ENV !== 'production') {
      return {
        devServer: {
          proxy: {
            '/analysis/*': {
              target: 'http://127.0.0.1:8000',
              changeOrigin: true,
              secure: false
            },
            '/iprs/*': {
              target: 'http://127.0.0.1:8081',
              changeOrigin: true,
              secure: false
            }
          }
        }
      };
    }
    return null;
  }
};
