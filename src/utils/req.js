export const get = function (url, data = {}) {
  return new Promise((resolve)=>{
    uni.request({
      url: url,
      data: data,
      method: 'GET',
      timeout: 2000,
      success: function (res){
        resolve(res.data)
      },
      fail: function (){
        resolve("请求失败")
      }
    })
  })
}

export const post = function (url, data = {}){
  return new Promise((resolve)=> {
    uni.request({
      url: url,
      data: data,
      method:'POST',
      timeout: 2000,
      success: function (res){
        resolve(res.data)
      },
      fail: function (){
        resolve("请求失败")
      }
    })
  })
}

export const put = function (url, data = {}){
  return new Promise((resolve) => {
    uni.request({
      url:url,
      data:data,
      method:'PUT',
      timeout: 2000,
      success: function (res){
        resolve(res.data)
      },
      fail: function (){
        resolve("请求失败")
      }
    })
  })
}

export const del = function (url, data = {}){
  return new Promise((resolve) => {
   uni.request({
     url:url,
     data:data,
     method:'DELETE',
     timeout: 2000,
     success: function (res){
       resolve(res.data)
     },
     fail: function (){
       resolve("请求失败")
     }
   })
  })
}
