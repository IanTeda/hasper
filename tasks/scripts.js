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

      // Initiate sourcemaps when not in production mode.
      .pipe($.if(!argv.prod, $.sourcemaps.init()))

      // Concatenate source files.
      .pipe($.concat(config.scripts.filename))
      .pipe($.size({title: 'Scripts concatenated:'}))

      // Write source maps for easy debugging, when not building for production.
      .pipe($.if(!argv.prod, $.sourcemaps.write('./')))
      .pipe($.if(!argv.prod, $.size({title: 'Script sources mapped:'})))

      // Uglify JavaScript. Remove unneeded characters
      .pipe($.if(argv.prod, $.uglify(config.uglify.options)))

      // Add min prefix to production build output to tell everyone it is compressed.
      .pipe($.if(argv.prod, $.rename({suffix: '.min'})))
      .pipe($.if(argv.prod, $.size({title: 'Scripts uglified:'})))

      // Add hash to concatenated script file
      .pipe($.hash())

      // Write stream to destination folder -- make a copy -- before compressing
      .pipe($.if(argv.prod, gulp.dest(config.scripts.dest)))

      // Compress script stream
      .pipe($.if(argv.prod, $.gzip(config.gzip.options)))
      .pipe($.if(argv.prod, $.size({
        title: 'Ziped:',
        gzip: true,
      })))

      // Write stream to destination folder
      .pipe(gulp.dest(config.scripts.dest))
      .pipe($.size({title: 'Scripts copied:'})

      // Create hash map of concatenated script file
      .pipe($.hash.manifest('hash-scripts.json'))

      // Put script hash map in the data directory
      .pipe(gulp.dest('data'))
      .on('end', function() {
        $.util.log('Scripts hash file "hash-scripts.json" written in data folder');
      })

    );

    return stream;
  };
};
