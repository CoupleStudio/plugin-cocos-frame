module.exports = {
    file: {
        "upNestIndex": {
            upNestIndex: { data: [], name: "upNestIndex" },//上升鸟巢的序号
        }
    },

    _isInit: false,

    _completeCallBack: null,

    _index: 0,

    _totalIndex: 0,

    initJson(cb) {
        if (this._isInit === true) {
            cc.log("[JsonFileMgr] has init");
            return;
        }
        this._isInit = true;
        this._completeCallBack = cb;
        this._index = 0;
        this._totalIndex = 0;

        for (const i in this.file) {
            if (this.file.hasOwnProperty(i)) {
                for (const j in this.file[i]) {
                    if (this.file[i].hasOwnProperty(j)) {
                        this._totalIndex++;
                    }
                }
            }
        }

        for (const k in this.file) {
            if (this.file.hasOwnProperty(k)) {
                const item = this.file[k];
                for (const m in item) {
                    if (item.hasOwnProperty(m)) {
                        this._loadJson(k + "/" + item[m]['name'], item[m]);
                    }
                }
            }
        }
    },

    _loadJson(file, obj) {
        cc.log("resources/json/" + file + ".json");
        let url = cc.url.raw("resources/json/" + file + ".json");
        cc.loader.load(url, (curCount, totalCount, itemObject) => {
            //进度
        }, (err, results) => {
            //完成
            this._index++;
            if (err) {
                cc.log("解析配置文件" + file + "失败：" + err);
                return;
            }
            if (results !== null || results !== undefined) {
                obj['data'] = results;
                if (this._index >= this._totalIndex) {//加载完成
                    this._onComplete();
                    return;
                }
                this._onProgress(file);
                return;
            }
            this._onError(file);
            return;
        });
    },

    _onComplete() {
        cc.log("Json 加载完成");
        if (this._completeCallBack) {
            this._completeCallBack();
        }
    },

    _onError(file) {
        cc.log("Json error: " + file);
    },

    _onProgress(file) {
        cc.log("Json loaded: " + file);
    }

};