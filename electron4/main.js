
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
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width: 400,
    height: 200,
    minWidth: 300,
    maxWidth: 600,
    minHeight: 150,
    maxHeight: 450,
    x: 10,
    y: 10,
    kiosk: true
  });
  // 添加如下代码 可以调试
  mainWindow.webContents.openDevTools();

  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});