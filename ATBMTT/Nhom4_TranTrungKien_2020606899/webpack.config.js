const path = require('path');

module.exports = {
    mode: 'development',
    entry: './main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        fallback: {
            fs: false,
            util: false,
            path: false,
        },
    },
    module: {
        rules: [
          {
            test: /\.(docx)$/i,
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/docx/', // Thay đổi đường dẫn đầu ra theo nhu cầu của bạn
            },
          },
        ],
      },
};