'use strict';

const fs = require('fs');
// 引入 aysnc模块
const async = require('async');
// 引入path模块
const path = require('path');
const osenv = require('osenv');

const shell = require('electron').shell;

function openFile(filePath) {
  // 调用shell API的openItem函数
  shell.openItem(filePath);
}

function getUsersHomeFolder() {
  return osenv.home();
}

// 使用 fs.readdir 来获取文件列表
function getFilesInFolder(folderPath, cb) {
  fs.readdir(folderPath, cb);
}

function inspectAndDescribeFile(filePath, cb) {
  let result = {
    file: path.basename(filePath),
    path: filePath,
    type: ''
  };
  fs.stat(filePath, (err, stat) => {
    if (err) {
      cb(err);
    } else {
      if (stat.isFile()) { // 判断是否是文件
        result.type = 'file';
      }
      if (stat.isDirectory()) { // 判断是否是目录
        result.type = 'directory';
      }
      cb(err, result);
    }
  });
}

function inspectAndDescribeFiles(folderPath, files, cb) {
  // 使用 async 模块调用异步函数并收集结果
  async.map(files, (file, asyncCB) => {
    const resolveFilePath = path.resolve(folderPath, file);
    inspectAndDescribeFile(resolveFilePath, asyncCB);
  }, cb);
}

module.exports = {
  getUsersHomeFolder,
  getFilesInFolder,
  inspectAndDescribeFiles,
  openFile
};