// Load Laravel Mix module
let mix = require('laravel-mix');

// Set public path for assets
mix.combine([
  'src/js/view.js',
  'src/js/service.js',
], 'js/app.js');
