import httpx from "../utils/http/httpx";
import {userUrls} from "../utils/http/urls";
import store from "../utils/store/store";
import state from "../utils/state/state";

const launchCheck = () => {
    const platform = uni.getSystemInfoSync().uniPlatform;
    if (platform !== 'mp-qq') {
        throw new Error("仅允许运行在qq小程序上！")
    }
    qq.login({
        success: async data => {
            const loginResp = await httpx.post(userUrls.login, {
                code: data.code,
                type: 2
            })
            // 非新用户，直接保持登录状态即可
            if (!loginResp?.s || loginResp.d?.newUser) {
                console.log(loginResp)
                store.remove("accessToken")
                store.remove("refreshToken")
                return
            }
            afterLogin(loginResp)
        }
    })
}

const afterLogin = (loginResp) => {
    httpx.saveTokens(loginResp.d.tokenObject)
    state.commit("login")
    refreshRole()
    refreshUserInfo()
}

const refreshRole = async () => {
    let resp = await httpx.get(userUrls.role)
    state.commit("setRoles", resp.d ?? [])
}

const refreshUserInfo = async () => {
    let resp = await httpx.get(userUrls.info)
    let info = resp.d
    state.commit("setInfo", info)
}

const setUserAvatar = async avatar => {
    let resp = await httpx.put(userUrls.info, {avatar})
    if (resp.s) {
        let {qqNumber, nickname} = state.state.info;
        let info = {
            qqNumber, nickname, avatar
        }
        state.commit("setInfo", info)
    }
}

const register = (cn, qqNumber) => new Promise(res => {
    if (cn?.length < 1) {
        res({
            msg: 'cn不能为空',
            isWarning: true
        })
        return
    }
    if (qqNumber?.length < 1) {
        res({
            msg: 'qq不能为空',
            isWarning: true
        })
        return;
    }
    qq.login({
        success: async data => {
            const loginResp = await httpx.post(userUrls.login, {
                code: data.code,
                type: 2
            })
            console.log(loginResp)
            const {tempUserKey} = loginResp.d;
            const registerResp = await httpx.post(userUrls.register, {
                tempUserKey, qqNumber: qqNumber, nickname: cn
            })
            if (!registerResp.s) {
                res({
                    msg: registerResp.m,
                    isWarning: true
                })
                return
            }
            afterLogin(registerResp)
            res({})
        }
    })
})

export default {
    launchCheck, register, setUserAvatar
}