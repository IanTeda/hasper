'use strict';

let autoprefixer = require('autoprefixer');
let cssnano = require('cssnano');
let cssnext = require('postcss-cssnext');
let csswring = require('csswring');
let lost = require('lost');
let magician = require('postcss-font-magician');
let mqpacker = require('css-mqpacker');
let pngquant = require('imagemin-pngquant');
let postImport = require('postcss-import');
let sprites = require('postcss-sprites');

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
        browsers: ['last 3 version'],
      }),
      cssnano,
      cssnext,
      csswring,
      lost,
      magician,
      mqpacker,
      postImport,
      sprites,
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
    filename: 'hasper.css',
    src: [
      nodeModules + '/animate.css/animate.css',
      nodeModules + '/font-awesome/css/font-awesome.css',
      src + 'styles/screen.css',
    ],
    dest: hstatic + 'styles',
  },
  uglify: {
    options: {
    },
  },
};
