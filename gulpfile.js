var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minify = require('gulp-minify');

var postcss = require('gulp-postcss');
var csswring = require('csswring');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');


gulp.task('postcss', function(){
    var processors = [
        csswring,
        autoprefixer({
            browsers: 'last 2 version'
        }),
        cssnano,
    ];
    
    return gulp.src('app/scss/**/*.scss')
        .pipe(concat('styles.scss'))
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(gulp.dest('app/dist'))
});

gulp.task('compress', function() {
  gulp.src(['app/js/**/*.js'])
    .pipe(concat('script.js'))
    .pipe(minify({
        ext:{
            min:'.min.js'
        }
    }))
    .pipe(gulp.dest('app/dist'))
});

gulp.task('watch', function(){
    gulp.watch('app/scss/**/*.scss', ['postcss']);
    gulp.watch('app/js/**/*.js', ['compress']);
});