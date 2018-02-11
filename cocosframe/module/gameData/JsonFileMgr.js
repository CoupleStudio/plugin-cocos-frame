let JsonFileCfg = require('JsonFileCfg');

module.exports = {
    _getJsonFile() {
        let jsonFileName = require("MainSceneModule").JsonFileName;
        let jsonFileData = JsonFileCfg.file[jsonFileName];
        if (jsonFileData) {
            return jsonFileData;
        }
        cc.log("没有发现对应的json配置：" + jsonFileName);
        return null;
    },
};