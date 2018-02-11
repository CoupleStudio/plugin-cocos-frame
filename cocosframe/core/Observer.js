let ObserverMgr = require('ObserverMgr');

cc.Class({
    extends: cc.Component,

    properties: {

    },

    _initMsg() {
        let list = this._getMsgList();
        for (let msg of list) {
            ObserverMgr.addEventListener(msg, this._onMsg, this);
        }
        // ObserverMgr.addEventListener(GameMsgGlobal.Net.MsgErr, this._onErrorDeal, this);//涉及网络时用的监听
    },

    _getMsgList() {
        return [];
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() { },

    start() {

    },

    // update (dt) {},

    _onMsg(msg, data) {

    },

    _onError(msg, code, data) {

    },

    _onNetOpen() {

    },

    _onErrorDeal(errorMsgString, data) {
        let msgString = data[0];
        let errorCode = data[1];
        let errorData = data[2];
        this._onError(msgString, errorCode, errorData);
    },

    onDisable() {
        ObserverMgr.removeEventListenerWithObject(this);
    },

    onEnable() {
        ObserverMgr.removeEventListenerWithObject(this);
        this._initMsg();
    },

    onDestroy() {
        ObserverMgr.removeEventListenerWithObject(this);
    }
});
