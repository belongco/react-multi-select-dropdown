//browserify to concatenate js, watchify to watch browserify

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var eslint = require('gulp-eslint');
var debug= require('gulp-debug');

function swallowError (error) {

    //If you want details of the error in the console
    console.log(error.toString());
    this.emit('end');
}

var path = {
  MINIFIED_OUT: 'react-multi-select-dropdown.min.js',
  OUT: 'react-multi-select-dropdown.js',
  DEST: './dist/',
  SRC : './src',
  ENTRY_POINT: './src/index.js'
};



gulp.task('watch',  function() {

  gulp.watch(path.DEST+"js/**/*.js", ['lint']);

  var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: false
  }));

  return watcher.on('update', function () {
    watcher.bundle()
    .on('error', swallowError)
      .pipe(source(path.OUT))
      .pipe(debug({title: 'building:'}))
      .pipe(gulp.dest(path.DEST))
      console.log('Updated');
  }).bundle();
});

gulp.task('lint', function () {
    return gulp.src([path.SRC+"/**/*.js", '!'+path.SRC+'**/*.min.js'])
        // eslint() attaches the lint output to the eslint property
        // of the file object so it can be used by other modules.
         .pipe(debug({title:'lint'}))
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failOnError last.
        .pipe(eslint.failOnError());
});

gulp.task('default', ['watch']);

gulp.task('build', function(){
  browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify]
  })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST));
});



gulp.task('production', ['build']);
