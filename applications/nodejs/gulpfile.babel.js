'use strict'
import _gulp from 'gulp'
import gnf from 'gulp-npm-files'
import gulpLoadPlugins from 'gulp-load-plugins'
import del from 'del'
import runSequence from 'run-sequence'

const $ = gulpLoadPlugins()
const gulp = $.help(_gulp)

const dirs = {
  apiSrc: './src/',
  apiTests: './tests/',
  apiBuildTest: './.tmp/tests/',
  apiBuild: './dist/api/',
  apiBuildTemp: './.tmp/api',
  dockerFiles: './dockerfiles',
  dist: './dist'
}

gulp.task('clean', 'remove generated files in lib directory', () => del(['.tmp', 'dist/*', '!dist/.git'], {dot: true}))

gulp.task('test-api', 'run the unit tests using mocha', () => {
  return gulp.src(dirs.apiBuildTest + '/index.js')
    .pipe($.mocha({
      compilers: {
        js: $.babel()
      },
      reporter: 'nyan'
    }))
})

gulp.task('build-api', 'create a publish files', cb => {
  return gulp.src(dirs.apiSrc + '/**/*.js')
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.concat('index.js'))
    .pipe($.uglify({preserveComments: 'some'}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(dirs.apiBuild))
})

gulp.task('copy-dockerfiles', 'copy dockerfiles to dist folder', cb => {
  return gulp.src('Dockerfile')
    .pipe(gulp.dest(dirs.dist))
})

gulp.task('copy-npm-dependencies-only', 'Copy dependencies to build/node_modules/', cb => {
  return gulp.src(gnf(), {base: './'})
    .pipe(gulp.dest(dirs.dist))
})

gulp.task('default', ['help'], cb => {
  runSequence(
    'clean',
    'test-api',
    'build-api',
    'copy-dockerfiles',
    'copy-npm-dependencies-only',
    cb
  )
})
