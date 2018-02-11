module.exports = {
    //根据序号获取对象的属性值
    getValueByIndexFromObject(index, object) {
        let keysArr = Object.keys(object);
        let len = keysArr.length;
        if (index >= len) {
            cc.log("[getValueByIndexFromObject] 无此序号的按钮");
            return;
        }
        return object[keysArr[index]];
    },

    //取随机整数数[0, max)
    getRandomByMaxValue(Max) {
        return Math.floor(cc.random0To1() * Max);
    }
};