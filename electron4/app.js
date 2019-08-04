
'use strict';
// 使用 remote API 来获取渲染页面的当前视窗

const remote = require('electron').remote;

function toggleKiosk() {
  const button = document.getElementById('kiosk');
  const win = remote.getCurrentWindow();
  if (win.isKiosk()) {
    win.setKiosk(false);
    button.innerText = 'Enter kiosk mode';
  } else {
    win.setKiosk(true);
    button.innerText = 'Exit koisk mode';
  }
}

/*
function toggleFullScreen() {
  const button = document.getElementById('fullscreen');
  const win = remote.getCurrentWindow();
  // 判断当前的视窗是否处于全屏
  if (win.isFullScreen()) {
    win.setFullScreen(false);
    button.innerText = 'Go full screen';
  } else {
    win.setFullScreen(true);
    button.innerText = 'Exit full screen';
  }
}
*/
