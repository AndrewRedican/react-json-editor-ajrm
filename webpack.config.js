const
    webpack        = require('webpack'),
    UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
    pkg            = require('./package.json'),
    path           = require('path'),
    libraryName    = pkg.name;

module.exports = {
    entry : [
        './src/index.js'
    ],
    output: {
        path           : path.join(__dirname, './dist'), 
        filename       : 'index.js',
        library        : libraryName,
        libraryTarget  : 'umd',
        publicPath     : '/dist/',
        umdNamedDefine : true
    },
    plugins : [
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': 'true' }),
        new UglifyJSPlugin()
    ],
    node: {
        fs  : 'empty',
        net : 'empty',
        tls : 'empty',
        dns : 'empty'
    },
    module : {
        rules : [
            {
                test    : /\.(js|jsx)$/,
                use     : ['babel-loader'],
                include : path.resolve(__dirname, 'src'),
                exclude : /node_modules/
            }
        ]
    },
    resolve: {
        alias: {
            react      : path.resolve(__dirname, './node_modules/react'),
            'react-dom': path.resolve(__dirname, './node_modules/react-dom')
        }
    },
    externals: {
        react: {
            commonjs  : 'react',
            commonjs2 : 'react',
            amd       : 'React',
            root      : 'React'
        },
        'react-dom': {
            commonjs  : 'react-dom',
            commonjs2 : 'react-dom',
            amd       : 'ReactDOM',
            root      : 'ReactDOM'
        }
    }
}