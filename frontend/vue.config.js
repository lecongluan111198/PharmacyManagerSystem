module.exports = {
    // proxy API requests to Valet during development
    devServer: {
        proxy: {
            '^/api': {
                target: (process.env.APP_URL) + ':' + (process.env.PORT || 80),
                changeOrigin: false,
            },
        }
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
