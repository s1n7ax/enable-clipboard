// IMPORTS
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

// VAR
const mode = process.env.NODE_ENV;

// LOG
console.log('-------- Webpack Conf--------');
console.log(`mode :: ${mode}`);
console.log('-----------------------------');

const common = {
    entry: {
        // background: './src/background.ts',
        content: './src/content.ts',
        popup: './src/popup.ts',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: 'public' }],
        }),
    ],
};

const development = {
    ...common,
    ...{
        mode,
        devtool: 'inline-source-map',
    },
};

const production = {
    ...common,
    ...{
        mode,
    },
};

// CONF
const config = {
    development,
    production,
};

module.exports = config[mode];
