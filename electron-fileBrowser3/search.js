
'use strict';

// 引入 lunr 包进来
const lunr = require('lunr');

let index;

// 重置搜索的索引函数
// 官方文档 https://lunrjs.com/guides/upgrading.html
function resetIndex() {
  index = lunr(function() {
    this.field('file');
    this.field('type');
    this.ref('path');
  });
}

// 添加对文件的索引，用于后续的搜索
function addToIndex(file) {
  index.add(file);
}

// 对一个指定的文件进行查询
function find(query, cb) {
  if (!index) {
    resetIndex();
  }
  const results = index.search(query);
  cb(results);
}

module.exports = {
  addToIndex,
  find,
  resetIndex
};