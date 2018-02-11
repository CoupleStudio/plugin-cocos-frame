module.exports = {
    obsArray: {},
    //注册事件
    addEventListener(msg, func, ob) {
        if (typeof ob === "undefined") {
            cc.log("[ObserverMgr] 注册消息 [%s]: %s 的作用域未定义", msg, func.name);
            return;//???
        }
        let obs = this.obsArray[msg];
        if (typeof obs === "undefined") {
            this.obsArray[msg] = [];    //此数组中存放的是对应msg的对象 eg:{func: a, ob: b}
        }

        //当重复的事件重复回调注册时,不予注册 fixme 匿名函数还是会重复注册???
        for (const item of this.obsArray[msg]) {
            if (item['func'] === func && item['ob'] === ob) {
                cc.log("重复注册" + msg + ":" + func);
                return;
            }
        }
        this.obsArray[msg].push({ func: func, ob: ob });
    },

    //取消注册事件
    removeEventListener: function (msg, func, ob) {
        let b = false;
        let msgCBArray = this.obsArray[msg];
        if (msgCBArray !== undefined) {
            for (const item of this.obsArray[msg]) {
                if (item['ob'] === ob && item['func'] === func) {
                    msgCBArray.splice(this.obsArray[msg].indexOf(item), 1);
                    b = true;
                }
            }
        }
        return b;
    },

    //移除该作用域的所有事件
    removeEventListenerWithObject: function (ob) {
        for (const k in this.obsArray) {//[msg: [{func: func, ob: ob}]]
            if (this.obsArray.hasOwnProperty(k)) {
                const msgCBArray = this.obsArray[k];//[{func: func, ob: ob}]
                for (let i = 0; i < msgCBArray.length;) {
                    let msgCBItem = msgCBArray[i];
                    if (msgCBItem['ob'] === ob) {
                        msgCBArray.splice(i, 1);//数组长度有改变
                    } else {
                        i++;
                    }
                }
            }
        }
    },

    dispatchMsg(msg, data) {
        let obs = this.obsArray[msg];
        if (typeof obs !== "undefined") {
            for (const item of obs) {
                let func = item['func'];
                let ob = item['ob'];
                if (func && ob) {
                    //call必须是object
                    //apply必须是类数组
                    func.apply(ob, [msg, data]);
                }
            }
        } else {
            cc.log("消息列表中不存在：" + msg);
        }
    }
};