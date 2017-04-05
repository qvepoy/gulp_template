var gulp = require('gulp'),                 // Connect gulp to project
    sass = require('gulp-sass')             // Sass package
    browserSyns = require('browser-sync')   // Browser Syns package
    concat = require('gulp-concat')         // Concatination js files
    uglify = require('gulp-uglifyjs')       // Compress js files
    cssnano = require('gulp-cssnano')       // Compress css
    rename = require('gulp-rename')         // Rename files
    del = require('del')                    // Delete lib
    ;

gulp.task('sass', function(){               // Create sass task
    return gulp.src('app/sass/**/*.sass')   // Take .sass files in sass directory
        .pipe(sass())                       // Convert sass to css by gulp-sass
        .pipe(gulp.dest('app/css'))         // Unload css files to app/css
        .pipe(browserSyns.reload({          // Refresh css after changes
            stream : true
        }))
});

gulp.task('scripts', function() {
    return gulp.src([                       // Take all libs
        'app/libs/jquery/dist/jquery.min.js',
        'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js'
    ])
        .pipe(concat('libs.min.js'))        // Concatination to flie libs.min.js
        .pipe(uglify())                     // Compress file
        .pipe(gulp.dest('app/js'));         // Load to js folder
});

gulp.task('browser-sync', function() {      // Create browser-sync task
    browserSyns({                           // Execute browserSyns
        server: {                           // Identify server parameters
            baseDir: 'app'                  // Set server directory
        },
        notify: true                        // Set notification
    })
});

gulp.task('css-libs', ['sass'], function() {// Load sass task before css-libs
    return gulp.src('app/css/libs.css')
        .pipe(cssnano())                    // Compress css
        .pipe(rename({suffix: '.min'}))     // Add min suffix
        .pipe(gulp.dest('app/css'))         // Load to css folder
})

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass']);    // Observation of sass files
    gulp.watch('app/*.html', browserSyns.reload);  // and other files
    gulp.watch('app/js/**/*.js', browserSyns.reload);
});

gulp.task('clean', function() {
    return del.sync('dist');                // Remove dist folder
});

gulp.task('build', ['clean', 'sass', 'scripts'], function() {
    var buildCss = gulp.src([
        'app/css/main.css',
        'app/css/libs.min.css'
    ])
    .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));
});
