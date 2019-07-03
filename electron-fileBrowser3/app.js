'use strict';

const fileSystem = require('./fileSystem');
const userInterface = require('./userInterface');
// 引入search模块
const search = require('./search');

/*
 该函数的作用是：获取到用户个人文件夹的路径，并获取到该文件夹下的文件列表信息
*/
function main() {
  // 把window上下文传递进去
  userInterface.bindDocument(window);

  const folderPath = fileSystem.getUsersHomeFolder();

  // 更新文本框中文件夹路径，并且更新主区域中的内容, 并且重置搜索索引的函数调用
  userInterface.loadDirectory(folderPath)(window);
  // 监听搜索框值的变化
  userInterface.bindSearchField((event) => {
    const val = event.target.value;
    if (val === '') {
      // 如果搜索框中的值为空的情况下, 重置过滤结果
      userInterface.resetFilter();
    } else {
      /*
       如果搜索框中有值的话，将该值传递到搜索模块的find函数处理并过滤结果显示在界面上
      */
      search.find(val, userInterface.filterResults);
    }
  });
}

window.onload = function() {
  main();
};