"use strict";

var spawn = require('child_process').spawn;
var iconv = require('iconv-lite');
var BufferHelper = require('bufferhelper');

exports.ping = function(address, count, callback){

  var ping = spawn('ping', [address,'-n',count||5]);
  var bufferHelper = new BufferHelper();

  ping.stdout.on('data', function(chunk){
    bufferHelper.concat(chunk);
  });

  ping.stdout.on('end',function(){
    var str = iconv.decode(bufferHelper.toBuffer(),'gbk');
    callback(null,str);
  }); 
}