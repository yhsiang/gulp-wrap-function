'use strict';

var gutil = require('gulp-util');
var through = require('through2');

module.exports = wrapperPlugin;

function wrapperPlugin(fn) {
  return through.obj(objectStream);

  function objectStream(file, enc, cb) {
    var that = this;

    if("function" !== typeof fn ) {
      that.emit('error', pluginError('Parameter is not a function'));
      return cb();
    }
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      that.emit('error', pluginError('Streaming not supported'));
      return cb();
    }

    try {
      var contents = file.contents.toString();
      file.contents = new Buffer(wrapIt(fn(contents)));
    } catch (err) {
      err.fileName = file.path;
      that.emit('error', pluginError(err));
    }

    that.push(file);

    cb();
  }
}

function pluginError(msg) {
  return new gutil.PluginError('error', 'gulp-wrapper: ' + msg);
}