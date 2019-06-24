
'use strict';

// 引入 electron模块
const electron = require('electron');

// 创建 electron应用对象的引用

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

// 定义变量 对应用视窗的引用 
let mainWindow = null;

// 监听视窗关闭的事件
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// 将index.html 载入应用视窗中
app.on('ready', () => {
  mainWindow = new BrowserWindow();
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

