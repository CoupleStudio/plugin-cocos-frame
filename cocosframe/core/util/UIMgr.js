module.exports = {
    _uiMap: {},

    /*
    * 使用实例:
    * UIMgr.createPrefabAddToRunningScene(this.userInfoLayer, function (ui) {
            // ui 为实例化Prefab
        }.bind(this));
    * */

    createPrefabAddToRunningScene(UIPrefab, createCallBack) {
        if (!UIPrefab) {
            cc.log("[UIMgr]无法创建prefab: " + UIPrefab);
            return;
        }
        cc.loader.loadRes("prefab/ComUIBg", (err, prefab) => {
            let nodeBg = cc.instantiate(prefab);
            let scriptBg = nodeBg.getComponent("ComUIBg");
            if (scriptBg) {
                let uiNode = scriptBg.addUI(UIPrefab);
                let uuid = uiNode.uuid.toString();
                this._uiMap[uuid] = nodeBg;
                let scene = cc.director.getScene();
                if (scene) {
                    let w = cc.view.getVisibleSize().width;
                    let h = cc.view.getVisibleSize().height;
                    nodeBg.x = w / 2;
                    nodeBg.y = h / 2;
                    scene.addChild(nodeBg);
                    if (createCallBack) {
                        createCallBack(uiNode);
                    }
                    return;
                }
                cc.log("[UIMgr] 没有运行Scene,无法添加ui界面！");
            }
        });
    },

    /*
    * 使用实例:
    * UIMgr.createPrefab(this.userInfoLayer, function (root, ui) {
            this.uiNode.addChild(root); //此uiNode指用于添加预制的节点
        }.bind(this));
    * */
    createPrefab(UIPrefab, createCallBack) {
        if (!UIPrefab) {
            cc.log("[UIMgr] 无法创建Prefab：" + UIPrefab);
            return;
        }
        cc.loader.loadRes('prefab/ComUIBg', (err, prefab) => {
            if (err) {
                cc.log(err.errorMessage);
                return;
            }
            let nodeBg = cc.instantiate(prefab);
            let scriptBg = nodeBg.getComponent("ComUIBg");
            if (scriptBg) {
                let uiNode = scriptBg.addUI(UIPrefab);
                let uuid = uiNode.uuid.toString();
                this._uiMap[uuid] = nodeBg;
                if (createCallBack) {
                    createCallBack(nodeBg, uiNode);
                }
            }
        });
    },


    destroyUI(script) {
        //节点被销毁，添加返回音效
        if (script) {
            if (script.node) {
                let uuid = script.node.uuid.toString();
                let rootNode = this._uiMap[uuid];
                if (rootNode) {
                    rootNode.destroy();
                    this._uiMap[uuid] = null;
                    return;
                }
                cc.log("[UIMgr]界面不是UIMgr创建的,无法销毁:" + script.node.name);
                return;
            }
            cc.log("[UIMgr] " + script.name + " 没有node属性");
            return;
        }
        cc.log("[UIMgr] 缺少参数");
    }
};