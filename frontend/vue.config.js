module.exports = {
    // proxy API requests to Valet during development
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:8000',
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
        ? '../backend/resources/views/index.blade.php'
        : 'index.html',
};
