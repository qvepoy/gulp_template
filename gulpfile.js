var gulp = require('gulp'),                 // Connect gulp to project
    sass = require('gulp-sass')             // Sass package
    browserSyns = require('browser-sync');  // Browser Syns package


gulp.task('sass', function(){               // Create sass task
    return gulp.src('app/sass/**/*.sass')   // Take .sass files in sass directory
        .pipe(sass())                       // Convert sass to css by gulp-sass
        .pipe(gulp.dest('app/css'))         // Unload css files to app/css
        .pipe(browserSyns.reload({          // Refresh css after changes
            stream : true
        }))
});

gulp.task('browser-sync', function() {      // Create browser-sync task
    browserSyns({                           // Execute browserSyns
        server: {                           // Identify server parameters
            baseDir: 'app'                  // Set server directory
        },
        notify: true                        // Set notification
    })
})

//         Task       Tasks before 'watch'
gulp.task('watch', ['browser-sync', 'sass'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass']);    // Observation of sass files
    gulp.watch('app/*.html', browserSyns.reload);
    gulp.watch('app/js/**/*.js', browserSyns.reload);
})
