export const base = "http://101.35.11.84:8989"

const userBaseUrl =  base + '/user'
export const userUrls = {
    login : userBaseUrl + '/login',
    role : userBaseUrl + '/role',
    register : userBaseUrl + '/register'
}

export const refresh = userUrls + "/refresh"
