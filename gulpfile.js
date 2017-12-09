var gulp = require('gulp')
var uglify = require('gulp-uglify')
var htmlmin = require('gulp-htmlmin')
var envify = require('gulp-envify')
var pump = require('pump')
var runSequence = require('run-sequence')
var babel = require('gulp-babel')
var semi = require('gulp-semi')

gulp.task('build', build)
gulp.task('compressScripts', compressScripts)
gulp.task('compressViews', compressViews)
gulp.task('copySrc', copySrc)

function build (cb) {
  runSequence('compressScripts', 'compressViews', 'copySrc', function () {
    cb()
  })
}
function compressScripts (cb) {
  pump([
    gulp.src('./public/scripts/!(libs)/!(require).js'),
    semi.add({ leading: false }),
    babel({ presets: ['env'] }),
    uglify({}),
    gulp.dest('./build/public/scripts')], cb)
}
function compressViews (cb) {
  pump([
    gulp.src('./views/**/*.handlebars'),
    htmlmin({ collapseWhitespace: true }),
    gulp.dest('./build/views')
  ], cb)
}
function copySrc (cb) {
  var environment = { NODE_ENV: 'production' }
  var files = ['./@(server|public)/**/*', '!./public/scripts/', './package*']
  pump([
    gulp.src(files),
    envify(environment),
    gulp.dest('./build')
  ], cb)
}
