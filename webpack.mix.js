const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/dist/js')
    .react()
    .sass('resources/sass/app.scss', 'public/dist/css')
    .version();

// autoprefixer: start value has mixed support, consider using flex-start instead
mix.webpackConfig({
    stats: {
        children: true,
    }
});

mix.browserSync('marker.maptest.localhost');
