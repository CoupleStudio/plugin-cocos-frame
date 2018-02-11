// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        bgNode: { displayName: 'bgNode', default: null, type: cc.Node },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        let w = cc.view.getVisibleSize().width;
        let h = cc.view.getVisibleSize().height;
        this.bgNode.width = w;
        this.bgNode.height = h;
        // this.bgNode.on(cc.Node.EventType.TOUCH_START, function (event) {
        //     cc.log("1");
        //     event.stopPropagation();
        //     event.stopPropagationImmediate();

        //     return false;
        // }.bind(this));

        // this.bgNode.on(cc.Node.EventType.TOUCH_END, function (event) {
        //     cc.log("2");
        //     event.stopPropagation();
        //     event.stopPropagationImmediate();
        //     return false;
        // }.bind(this));

        // this.bgNode.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
        //     cc.log("3");
        //     event.stopPropagation();
        //     event.stopPropagationImmediate();
        //     return false;
        // }.bind(this));
    },

    start() {

    },

    // update (dt) {},

    addUI(ui) {//ui参数为prefab
        let node = cc.instantiate(ui);
        node.x = node.y = 0;
        node.parent = this.node;
        return node;
    }
});
