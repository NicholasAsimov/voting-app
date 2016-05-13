const gulp = require('gulp');
const eslint = require('gulp-eslint');
const wiredep = require('wiredep').stream;
const inject = require('gulp-inject');
const nodemon = require('nodemon');

const jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('lint', () => (
  gulp.src(jsFiles)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError())
));

gulp.task('inject', () => {
  const injectSrc = gulp.src(['./public/css/*.css',
                              './public/js/*.js'], { read: false });

  const injectOptions = {
    ignorePath: '/public'
  };

  const options = {
    directory: './public/lib',
    ignorePath: '../../public'
  };

  return gulp.src('./app/views/layout.pug')
      .pipe(wiredep(options))
      .pipe(inject(injectSrc, injectOptions))
      .pipe(gulp.dest('./app/views'));
});

gulp.task('serve', ['lint', 'inject'], () => {
  const options = {
    script: 'app.js',
    delayTime: 1,
    env: {
      PORT: 3000
    },
    watch: jsFiles
  };

  return nodemon(options)
    .on('restart', () => {
      console.log('Restarting...');
    });
});

gulp.task('default', ['lint'], () => {

});
