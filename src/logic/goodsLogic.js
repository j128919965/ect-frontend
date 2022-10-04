import httpx from "../utils/http/httpx";
import {goodsUrls} from "../utils/http/urls";

class BriefGoodsInfo {
    id;name;typeId;picCompress;status
}

let goodsCache = {}
let goodsList = []

const loadGoods = async () => {
    const resp = await httpx.get(goodsUrls.getAll)
    console.log(resp)
    if (!resp.s) {
        console.error("load goods failed", resp)
        return
    }
    goodsList = resp.d
    for (let goods of goodsList) {
        goodsCache[goods.id] = goods
    }
    console.log(goodsCache)
}

/**
 *
 * @param id
 * @returns {BriefGoodsInfo}
 */
const getGoodsById = id => goodsCache[id]

export default {
    loadGoods, getGoodsById
}