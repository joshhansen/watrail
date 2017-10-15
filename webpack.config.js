// http://jamesknelson.com/using-es6-in-the-browser-with-babel-6-and-webpack/

module.exports = {
    entry: './src/app.js',
    output: {
        filename: './dist/watrail.js'
    },
    module: {
        rules: [
            {
                test: /.js$/,
                include: /src/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015'],
                        plugins: ['transform-runtime']
                    }
                }
            }
        ]
    }
}
