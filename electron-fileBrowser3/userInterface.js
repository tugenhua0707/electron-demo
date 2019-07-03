
'use strict';

let document;

const path = require('path');

// 引入 fileSystem.js 中的模块代码
const fileSystem = require('./fileSystem');

// 引入search模块
const search = require('./search');

// 更新当前文件夹路径的函数
function displayFolderPath(folderPath) {
  document.getElementById('current-folder').innerHTML = convertFolderPathIntoLinks(folderPath);
  // 调用绑定事件
  bindCurrentFolderPath();
}

// 移除 main-area div元素中的内容
function clearView() {
  const mainArea = document.getElementById('main-area');
  let firstChild = mainArea.firstChild;
  while (firstChild) {
    mainArea.removeChild(firstChild);
    firstChild = mainArea.firstChild;
  }
}

// 更新文本框中文件夹路径，并且更新主区域中的内容
function loadDirectory(folderPath) {
  return function (window) {
    if (!document) {
      document = window.document;
    }


    // 添加重置搜索索引的函数调用
    search.resetIndex();

    // 更新最上面的文本框中的文件夹路径
    displayFolderPath(folderPath);
    fileSystem.getFilesInFolder(folderPath, (err, files) => {
      // 先清除主区域中的内容
      clearView();
      if (err) {
        throw new Error('sorry, you could not load your folder');
      }
      fileSystem.inspectAndDescribeFiles(folderPath, files, displayFiles);
    });
  }
}

function displayFile(file) {
  const mainArea = document.getElementById('main-area');
  const template = document.querySelector('#item-template');
  // 创建模板实列的副本
  let clone = document.importNode(template.content, true);
  
  // 将文件添加到搜索索引中
  search.addToIndex(file);

  // 将文件路径保存在图片元素的data-filePath属性中
  clone.querySelector('img').setAttribute('data-filePath', file.path);

  // 加入文件名及对应的图标
  clone.querySelector('img').src = `images/${file.type}.svg`;

  // 需要判断如果该文件是目录的话，需要对目录图片绑定双击事件
  if (file.type === 'directory') {
    clone.querySelector('img').addEventListener('dblclick', () => {
      // 我们双击完成后，就需要加载该文件夹下所有目录的文件
      loadDirectory(file.path)();
    }, false);
  } else {
    // 不属于文件夹以外的文件，比如文本文件，文档等
    clone.querySelector('img').addEventListener('dblclick', () => {
      fileSystem.openFile(file.path);
    })
  }

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

function bindDocument (window) {
  if (!document) {
    document = window.document;
  }
}

// 监听搜索函数
function bindSearchField(cb) {
  document.getElementById('search').addEventListener('keyup', cb, false);
}

function filterResults(results) {
  // 获取搜索结果中的文件路径用于对比
  const validFilePaths = results.map((result) => {
    return result.ref;
  });
  const items = document.getElementsByClassName('item');
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let filePath = item.getElementsByTagName('img')[0].getAttribute('data-filePath');
    // 文件路径匹配搜索结果
    if (validFilePaths.indexOf(filePath) !== -1) {
      item.style = null;
    } else {
      item.style = 'display:none;'; // 如果没有匹配到，则将其掩藏掉 
    }
  }
}

function resetFilter() {
  const items = document.getElementsByClassName('item');
  for (let i = 0; i < items.length; i++) {
    items[i].style = null;
  }
}

function convertFolderPathIntoLinks(folderPath) {
  const folders = folderPath.split(path.sep);
  const contents = [];
  let pathAtFolder = '';
  folders.forEach((folder) => {
    pathAtFolder += folder + path.sep;
    contents.push(`<span class="path" data-path="${pathAtFolder.slice(0, -1)}">${folder}</span>`);
  });
  return contents.join(path.sep).toString();
}

function bindCurrentFolderPath() {
  const load = (event) => {
    const folderPath = event.target.getAttribute('data-path');
    loadDirectory(folderPath)();
  }
  const paths = document.getElementsByClassName('path');
  for (var i = 0; i < paths.length; i++) {
    paths[i].addEventListener('click', load, false);
  }
}

module.exports = {
  bindDocument,
  displayFiles,
  loadDirectory,
  bindSearchField,
  filterResults,
  resetFilter
};