'use strict';
let fs = require('fs');

module.exports = {
  load() {
    // execute when package loaded
  },

  unload() {
    // execute when package unloaded
  },

  // register your ipc messages here
  messages: {
    'open'() {
      // open entry panel registered in package.json
      // Editor.Panel.open('plugin-cocos-frame');
      let srcDir = Editor.url("packages://plugin-cocos-frame/cocosframe")
      let dstDir = Editor.url("packages://plugin-cocos-frame/dst");
      let dstDirArr = [];
      let fileArr = fs.readdirSync(srcDir);
      for (let item of fileArr) {
        item = Editor.url("packages://plugin-cocos-frame/cocosframe/") + item;
        dstDirArr.push(item);
      }
      Editor.assetdb.import(dstDirArr, "db://assets/", function (err, results) {
        // Editor.log(results);
      });
    },
    'say-hello'() {
      Editor.log('Hello World!');
      // send ipc message to panel
      Editor.Ipc.sendToPanel('plugin-cocos-frame', 'plugin-cocos-frame:hello');
    },
    'clicked'() {
      Editor.log('Button clicked!');
    }
  },
};