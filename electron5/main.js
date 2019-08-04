
'use strict';

const { app, Menu, Tray, BrowserWindow } = require('electron')

let appIcon = null;
let mainWindow = null;

const notes = [
  {
    title: 'todo list',
    contents: '111111'
  },
  {
    title: 'xxxxx',
    contents: '2222'
  }
];

function displayNote (note) {
  // 使用 webContents API 向浏览器窗口发送数据来显示笔记内容
  mainWindow.webContents.send('displayNote', note);
}

function addNoteToMenu (note) {
  return {
    label: note.title,
    type: 'normal',
    click: () => {
      displayNote(note);
    }
  }
}

app.on('ready', () => {
  // 创建一个带图标的托盘应用
  appIcon = new Tray('icon@2x.png');

  // 为托盘应用创建上下文菜单，对笔记进行迭代并添加为菜单项
  let contextMenu = Menu.buildFromTemplate(notes.map(addNoteToMenu));
  appIcon.setToolTip('Notes app');

  // 将上下文菜单绑定到托盘应用上
  appIcon.setContextMenu(contextMenu);

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  // 添加如下代码 可以调试
  mainWindow.webContents.openDevTools();
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // 当应用视窗加载好后，默认显示第一个笔记内容
  mainWindow.webContents.on('dom-ready', () => {
    displayNote(notes[0]);
  });

});