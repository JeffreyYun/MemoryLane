var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');

gulp.task('default', function() {
    livereload.listen();
    nodemon({
        script: 'app.js',
        ext: 'js html ejs sass'
    }).on('restart', function(){
        gulp.src('app.js')
            .pipe(livereload())
            .pipe(notify('Reloading page, please wait...'));
    })
})

