'use strict';

// 引入 全局模块的 electron模块
const electron = require('electron');

// 创建 electron应用对象的引用

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

// 定义变量 对应用视窗的引用 
let mainWindow = null;

// 监听视窗关闭的事件（在Mac OS 系统下是不会触发该事件的）
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// 将index.html 载入应用视窗中
app.on('ready', () => {
  /*
   创建一个新的应用窗口，并将它赋值给 mainWindow变量。
  */
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  });

  // 添加如下代码 可以调试
  mainWindow.webContents.openDevTools();

  // 载入 index.html 文件
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // 当应用被关闭的时候，释放 mainWindow变量的引用
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});