'use strict';

// 在应用中加载node模块
const fs = require('fs');
const osenv = require('osenv');

// 引入 aysnc模块
const async = require('async');
// 引入path模块
const path = require('path');

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

function displayFile(file) {
  const mainArea = document.getElementById('main-area');
  const template = document.querySelector('#item-template');
  // 创建模板实列的副本
  let clone = document.importNode(template.content, true);
  
  // 加入文件名及对应的图标
  clone.querySelector('img').src = `images/${file.type}.svg`;
  clone.querySelector('.filename').innerText = file.file;

  mainArea.appendChild(clone);
}

// 该函数的作用是显示文件列表信息
function displayFiles(err, files) {
  if (err) {
    return alert('sorry, we could not display your files');
  }
  files.forEach(displayFile);
}

/*
 该函数的作用是：获取到用户个人文件夹的路径，并获取到该文件夹下的文件列表信息
*/
function main() {
  const folderPath = getUsersHomeFolder();

  getFilesInFolder(folderPath, (err, files) => {
    if (err) {
      console.log('对不起，您没有加载您的home folder');
    }
    console.log(files);
    /*
    files.forEach((file) => {
      console.log(`${folderPath}/${file}`);
    });
    */
    inspectAndDescribeFiles(folderPath, files, displayFiles);
  });
}

window.onload = function() {
  main();
};