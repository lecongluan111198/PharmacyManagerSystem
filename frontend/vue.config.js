const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');


module.exports = {
    // proxy API requests to Valet during development
    devServer: {
        proxy: {
            '^/api': {
                //target: (process.env.APP_URL) + ':' + (process.env.PORT || 80),
                target: 'http://localhost:8000',
                changeOrigin: false,
            },
        }
    },

    configureWebpack: config => {
        // get a reference to the existing ForkTsCheckerWebpackPlugin
        const existingForkTsChecker = config.plugins.filter(
            p => p instanceof ForkTsCheckerWebpackPlugin,
            )[0];

        // remove the existing ForkTsCheckerWebpackPlugin
        // so that we can replace it with our modified version
        config.plugins = config.plugins.filter(
            p => !(p instanceof ForkTsCheckerWebpackPlugin),
            );

        // copy the options from the original ForkTsCheckerWebpackPlugin
        // instance and add the memoryLimit property
        const forkTsCheckerOptions = existingForkTsChecker.options;
        forkTsCheckerOptions.memoryLimit = process.env.NODE_ENV === 'production' ? 512 : 3128;

        config.plugins.push(new ForkTsCheckerWebpackPlugin(forkTsCheckerOptions));
    },

    // output built static files to Laravel's public dir.
    // note the "build" script in package.json needs to be modified as well.
    outputDir: '../backend/public',

    // modify the location of the generated HTML file.
    // make sure to do this only in production.
    indexPath: process.env.NODE_ENV === 'production'
    ? '../resources/views/index.blade.php'
    : 'index.html',
};
