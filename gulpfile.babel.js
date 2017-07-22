"use strict";

// Import Gulp module
import gulp from "gulp";
// Command line (CLI) argument
var argv = require("./tasks/yargs");
// Configuration file for gulp tasks
const config = require("./tasks/config");
// Lazy load plugins, save on var declaration
var plugins = require("gulp-load-plugins")(config.gulpLoadPlugins.options);

/**
 * Require Gulp Task
 * @param {task} task - What Gulp task do you require
 * @return {function} function - Returns task from module export
 */
function requireTask(task) {
  // Require Gulp task module, passing in Gulp, config, argv and plugin objects
  return require("./tasks/" + task + ".js")(
    gulp,
    config,
    argv,
    plugins
  );
}

/**
 * Require Gulp Clean Task
 * @param {directory} directory - What directory do you want cleaned
 * @return {function} function  - Returns task function from moudle export
 */
function requireCleanTask(directory) {
  // Require gulp task module
  return require("./tasks/clean")(
    directory,
    plugins
  );
}

/**
 * Images Tasks
 * Usage: gulp images:clean - Clean images from build folder
 * Usage: gulp images:build - Copy and minify images to build folder
 * Usage: gulp images       - Clean build folder, then minify and copy images to build folder
*/
gulp.task(
  "images:clean",
  requireCleanTask(
    config.images.dest + "/**/*.{png,gif,jpg}"
  )
);
gulp.task(
  "images:build",
  requireTask(
    "images"
  )
);
gulp.task(
  "images",
  gulp.series(
    "images:clean",
    "images:build"
  )
);

/**
 * Scripts Tasks
 * Usage: gulp scripts:clean  - Clean main.js from the JavaScripts build folder
 * Usage: gulp scripts:build  - Build main.js from source into build folder
 * Usage: gulp scripts        - Clean build folder, then build from source into build folder
*/
gulp.task(
  "scripts:clean",
  requireCleanTask(
    config.scripts.dest + "/**/*"
  )
);
gulp.task(
  "scripts:build",
  requireTask(
    "scripts"
  )
);
gulp.task(
  "scripts",
  gulp.series(
    "scripts:clean",
    "scripts:build"
  )
);

/**
 * Font Tasks
 * Usage: gulp fonts:clean - Clean main.css from styles build folder
 * Usage: gulp fonts:build - Build main.css from source into build folder
 * Usage: gulp fonts       - Clean build folder, then build from source into build folder
*/
gulp.task(
  "fonts:clean",
  requireCleanTask(
    config.fonts.dest + "/**/*.{eot,svg,ttf,woff,woff2,otf}"
  )
);
gulp.task(
  "fonts:build",
  requireTask(
    "fonts"
  )
);
gulp.task(
  "fonts",
  gulp.series(
    "fonts:clean",
    "fonts:build"
  )
);