const path = require('path');
module.exports = {

    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '~': path.resolve(__dirname, 'node_modules'),
        },
        extensions: [".ts", ".tsx", ".js", '.jsx', ".json"]
    },
}