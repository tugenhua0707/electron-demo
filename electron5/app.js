
function displayNote(event, note) {
  document.getElementById("app").innerText = note.title;
  document.getElementById("contents").innerText = note.contents;
}

// Electron 的 ipcRenderer模块监听由后端进程触发的事件
const ipc = require('electron').ipcRenderer;

/*
 菜单项被单击或当应用加载的时候，ipcRenderer模块会接收到事件以及note对象并将其
 传递给 displayNote 函数
*/
ipc.on('displayNote', displayNote);