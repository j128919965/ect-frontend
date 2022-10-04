const validateTuanGoods = (id, avgPrice, adjPrice, total, rest) => {
    if (id == null) {
        return '请选择商品'
    }
    if (avgPrice == null) {
        return  '请输入均价'
    }
    if (avgPrice < 0) {
        return '均价必须为正数'
    }
    if (adjPrice == null) {
        return '请输入调价'
    }
    if (total == null) {
        return '请输入总量';
    }
    if (total < 0) {
        return '总量必须为正数'
    }
    if (rest == null) {
        return '请输入余量'
    }
    if (rest > total) {
        return '余量不能超过总量'
    }
    return null
}

export default {
    validateTuanGoods
}