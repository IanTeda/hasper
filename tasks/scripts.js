"use strict";
/**
 * Gulp Task for JavaScript Files
 * @param {gulp} gulp - The gulp module passed in
 * @param {config} config - The projects Gulp config file
 * @param {argv} argv - Arguments flagged at the CLI
 * @param {$} $ - Lazy load plugins, save the imports at the start of the file
 * @return {stream} Stream - Task stream to manage JavaScript in project
 */
module.exports = (gulp, config, argv, $) => {
  return function() {
    let stream = gulp
      // JavaScript source files. Order of important and set in config.
      .src(config.scripts.src)

      // Concatenate source files.
      .pipe($.concat(config.scripts.filename))
      .pipe($.size({title: 'Scripts concatenated into one file:'}))

      // Add hash to concatenated script file
      .pipe($.hash())
      .on('end', function() {
        $.util.log('Hash added to concatenated script file');
      })

      // Uglify JavaScript. Remove unneeded characters
      .pipe($.uglify(config.uglify.options))
      .pipe($.rename({suffix: '.min'}))
      .pipe($.size({title: 'Concatenated script uglified down to:'}))

      // Write stream to destination folder -- make a copy -- before compressing
      .pipe(gulp.dest(config.scripts.dest))

      // Compress script stream
      .pipe($.gzip(config.gzip.options))
      .pipe($.size({title: 'Concatenated script zipped down to:', gzip: true}))

      // Write stream to destination folder
      .pipe(gulp.dest(config.scripts.dest))

      // Create hash map of script
      .pipe($.hash.manifest('hash-script.json'))
      .pipe(gulp.dest('data'))
      .on('end', function() {
        $.util.log('Script hash map "hash-script.json" written to "/data" folder');
      });

    return stream;
  };
};
