// 封装的方法用来操作 localstorage 中的 token

// 设置
function setToken (value) {
    window.localStorage.setItem('token', value)
  }
  
  // 取值
  function getToken () {
    // 这里的 return 必须要写，否则将来外界取不到
    return window.localStorage.getItem('token')
  }
  
  // 删除
  function removeToken () {
    window.localStorage.removeItem('token')
  }
  
  // 暴露给外界
  export { setToken, getToken, removeToken }