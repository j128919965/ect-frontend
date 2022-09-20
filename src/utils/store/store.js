// v1 不能实现通知

const setV1 = (k, v) => uni.setStorageSync(k, v)

const getV1 = (k, v) => uni.setStorageSync(k, v)

const removeV1 = k => uni.removeStorageSync(k)

const clearV1 = () => uni.clearStorageSync()

// v2 有通知机制

const setCallBacks = {}

const removeCallBacks = {}

/**
 * 设置存储
 * 如果v为空，则视为删除
 * @param k {string}
 * @param v {string}
 */
const set = (k, v) => {
  if (k == null) {
    return
  }
  if (v == null) {
    remove(v)
    return;
  }
  uni.setStorageSync(k, v)
  const callBacks = setCallBacks[k] ?? []
  for (let callBack of callBacks) {
    try {
      callBack(v)
    } catch (e) {
      console.error("set call back failed", e)
    }
  }
}

/**
 * 从存储中获取数据
 * @param k {string}
 * @returns {string}
 */
const get = k => uni.getStorageSync(k)

/**
 * 从存储中删除数据
 * @param k
 */
const remove = k => {
  uni.removeStorageSync(k)
  const callBacks = removeCallBacks[k] ?? []
  for (let callBack of callBacks) {
    try {
      callBack()
    } catch (e) {
      console.error("remove call back failed", e)
    }
  }
}

const clear = () => {
  uni.clearStorageSync()
  for (let k of removeCallBacks) {
    const callBacks = removeCallBacks[k] ?? []
    for (let callBack of callBacks) {
      try {
        callBack()
      } catch (e) {
        console.error("remove call back failed", e)
      }
    }
  }
}

/**
 * 向存储添加修改监听器
 * @param key {string}
 * @param callBack {(string)=>Any}
 */
const addSetListener = (key, callBack) => {
  if (key == null || callBack == null) {
    return
  }
  if (setCallBacks[key] == null) {
    setCallBacks[key] = []
  }
  setCallBacks[key].push(callBack)
}

/**
 * 向存储添加修改监听器
 * @param key {string}
 * @param callBack {()=>Any}
 */
const addRemoveListener = (key, callBack) => {
  if (key == null || callBack == null) {
    return
  }
  if (removeCallBacks[key] == null) {
    removeCallBacks[key] = []
  }
  removeCallBacks[key].push(callBack)
}

export default {
  set, get, remove, clear, addRemoveListener, addSetListener, setV1, getV1, removeV1, clearV1
}
