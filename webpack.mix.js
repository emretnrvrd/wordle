let mix = require('laravel-mix');

mix
  .sass('src/scss/app.scss','public/css/app.css')
  .js('src/js/app.js', 'public/js')
  .vue();