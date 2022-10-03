export const base = "http://101.35.11.84:8989"
// export const base = "http://localhost:8080"

const userBaseUrl =  base + '/user'
export const userUrls = {
    login : userBaseUrl + '/login',
    role : userBaseUrl + '/role',
    register : userBaseUrl + '/register',
    info : userBaseUrl + '/info',
    refresh : userBaseUrl + '/refresh',
}
