#gulp-wrap-function

Gulp plugin for wrapping your customize function and process your file content directly.

##Installation

    % npm install gulp-wrap-function

##Usage

Example 1: replace all newlines.
```
var wrap = require("gulp-wrap-function");

gulp.src("file.html")
  .pipe(wrap(function(file) {
    return file.replace('\n', '');
  }))
  .pipe(gulp.dest("dist"));
```

Example 2: split and remain second one.
```
var wrap = require("gulp-wrap-function");

gulp.src("file.html")
  .pipe(wrap(function(file) {
    return file.split('\n')[1];
  }))
  .pipe(gulp.dest("dist"));
```

##License

MIT