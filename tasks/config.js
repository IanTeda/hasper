'use strict';

let autoprefixer = require('autoprefixer');
let mqpacker = require('css-mqpacker');
let csswring = require('csswring');
let pngquant = require('imagemin-pngquant');

const assets = 'assets/';
const tmp = '.tmp/';
const hstatic = 'static/';
const nodeModules = 'node_modules/';
const src = 'src/';

module.exports = {
  fonts: {
    src: [
      nodeModules + 'font-awesome/fonts/**/*.{eot,svg,ttf,woff,woff2,otf}',
      src + 'fonts/**/*.{eot,svg,ttf,woff,woff2,otf}',
    ],
    dest: hstatic + 'fonts',
  },
  gulpLoadPlugins: {
    options: {
      // when set to true, the plugin will log info to console
      DEBUG: false,

      // the glob(s) to search for in package.json
      pattern: ['gulp-*', 'gulp.*', 'del', 'merge2', 'shelljs'],

      // if true, transforms hyphenated plugins names to camel case
      camelize: true,

      // whether the plugins should be lazy loaded on demand
      lazy: true,
    },
  },
  gzip: {
    options: {
      append: true,
    },
  },
  images: {
    src: src + 'images/**/*.{png,gif,jpg}',
    dest: hstatic + 'images',
  },
  imagemin: {
    options: {
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
    },
  },
  postcss: {
    processors: [
      autoprefixer({
        browsers: ['last 1 version'],
      }),
      mqpacker,
      csswring,
    ],
  },
  scripts: {
    filename: 'hasper.js',
    src: [
      nodeModules + 'jquery/dist/jquery.js',
      src + 'scripts/main.js',
    ],
    dest: hstatic + 'scripts',
  },
  styles: {
    filename: 'main.css',
    css: [
      nodeModules + '/animate.css/animate.css',
      nodeModules + '/font-awesome/css/font-awesome.css',
      assets + 'styles/screen.css',
      assets + 'styles/syntax.css',
    ],
    sass: assets + 'sass/main.scss',
    dest: tmp + assets + 'styles',
  },
  uglify: {
    options: {
    },
  },
};
