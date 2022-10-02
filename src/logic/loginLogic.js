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
                // code 是假的！
                // code : data.code,
                code: 'test',
                type: 2
            })
            // 非新用户，直接保持登录状态即可
            if (!loginResp?.s || loginResp.d?.newUser) {
                console.log(loginResp)
                store.remove("accessToken")
                store.remove("refreshToken")
                return
            }
            httpx.saveTokens(loginResp.d.tokenObject)
            state.commit("login")
            refreshRole()
        }
    })
}

const refreshRole = async () => {
    let resp = await httpx.get(userUrls.role)
    state.commit("setRoles", resp ?? [])
}

export default {
    launchCheck
}