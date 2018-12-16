  var concat = require('concat-files');
  var path = require('path');

  var emp = 'AI0001.txt';
  var mgr = 'AI0001_manager.txt';

  concat([
    __dirname+'/reports/'+emp,
    __dirname+'/reports/'+mgr,
  ], __dirname+'/reports/'+mgr+emp, function(err) {
    if (err) throw err
    console.log('done');
  });