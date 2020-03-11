# T-storage

README **[English doc](README.md)** | **[中文 doc](README.zh.md)**

<p align="center">
<img alt="T-storage" src="build/t-storage.png" width="50%" height="50%">
</p>

# What is T-storage?
T-storage 是基于现代浏览器, 对LocalStorage和SessionStorage进行封装的存储插件. 

它借用了数据库的思想, 将您需要存储的数据按照 DB_NAME => TABLE_NAME => FIELD_NAME 三级形式进行存储. 在data()存储过程中加入了time选项,以此来限制数据存储的时长

[![License](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)
[![NPM version](https://img.shields.io/npm/v/t-storage.svg?style=flat)](https://www.npmjs.com/package/t-storage)

## Features

- 将同样作用的数据存放在一起, 避免命名冲突和变量污染
- 存储的数据有时间限制


### Install

**通过script标签方式引入**
```
npm install Tstorage -S
```

```javascript
var storage = window.Tstorage;
```

**通过npm方式引入**
```
npm install Tstorage -S
```

```javascript
import storage from 'T-storage'
```

## Usage

```javascript
// localStorage
storage.data();

// sessionStorage
storage.session.data()
```

```javascript
// // Most used LocalStorage
let dog1 = storage.data('dog', {
  key: 'dog1',
  value: 'Tom'
})
console.log(dog1);
console.log(storage.data('dog'));
console.log('🐶')

let dog2 = storage.data('dog', {
  key: 'dog2',
  value: {
    name: 'Charlie',
    age: 'tow'
  }
})
console.log(dog2);
console.log(storage.data('dog'));
console.log('🐶')

// // Time-Limited Storage: Time in Seconds
// // Don't milliseconds
let cat1 = storage.data('cat', {
  key: 'cat1',
  value: {
    name: 'Cleo',
    age: 'one'
  },
  time: 5 * 60 * 60, // 5 hours
  // time: '2020/3/7 8' // Future time YES
  // time: '2020/3/7 8:59' // Future time YES
  // time: '22020/3/7 08:23:23:14:58' // Malformed
  // ...
})
console.log(cat1);
console.log(storage.data('cat'));
console.log('🐱');
```

- localStorage 存储使用storage.data(), sessionStorages存储使用storage.session.data()
- time参数您可以传递秒数,代表您要存储的时长,比如您要存储1小时,time应该传递 1 * 60 * 60
- time参数您还可以传递日期格式,代表在未来某一个日期删除这个存储,日期格式请看 **[demo](demo/index.html)** 
- 更多用法清前往 **[demo](demo/index.html)**


## API List
|api|explain|
|----|-----|
|.data()|**设置和获取指定的值**|
|.has()|**判断是否有某个指定的值**|
|.clear()|**清除storage空间下所有的值**|
|.getAll()|**获取空间下所有的值**|
|.forEach()|**forEach存储空间下每个数据并调用回调函数**|


## License
[MIT](http://opensource.org/licenses/MIT)

T-storage is [MIT licensed](./LICENSE).
