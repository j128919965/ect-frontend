import httpx from "../utils/http/httpx";
import {goodsUrls} from "../utils/http/urls";

class BriefGoodsInfo {
    id;
    name;
    typeId;
    picCompress;
    status
}

let goodsCache = {}
let goodsList = []
let typeTree = []

const loadGoods = async () => {
    loadGoodTypes()
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
}

const loadGoodTypes = async () => {
    const resp = await httpx.get(goodsUrls.getAllTypes)
    if (!resp.s) {
        console.log("load goods types failed", resp)
        return
    }
    typeTree = resp.d
}

/**
 *
 * @param id
 * @returns {BriefGoodsInfo}
 */
const getGoodsById = id => goodsCache[id]

const getTypeTree = () => typeTree

export default {
    loadGoods, getGoodsById, getTypeTree
}