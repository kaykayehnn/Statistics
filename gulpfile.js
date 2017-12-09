var gulp = require('gulp')
var uglify = require('gulp-uglify')
var htmlmin = require('gulp-htmlmin')
var pump = require('pump')
var babel = require('gulp-babel')
var semi = require('gulp-semi')

gulp.task('compressScripts', function (cb) {
  pump([
    gulp.src(['./public/scripts/**/*.js',
      '!./public/scripts/require.js',
      '!./public/scripts/libs/*.js']),
    semi.add({ leading: false }),
    babel({ presets: ['env'] }),
    uglify({}),
    gulp.dest('./build/scripts')], cb)
})

gulp.task('compressViews', function (cb) {
  pump([
    gulp.src('./views/**/*.handlebars'),
    htmlmin({ collapseWhitespace: true }),
    gulp.dest('./build/views')
  ], cb)
})
