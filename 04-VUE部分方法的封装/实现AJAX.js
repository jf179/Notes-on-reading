function myAjax(url) {
    const promise = new Pormise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        //  true 代表开启异步
        xhr.open('GET', url, true)
        xhr.onreadystatechange = function () {
            console.log('xhr.readyState', xhr.readyState);
            if (xhr, readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText))
                } else {
                    reject(new Error('请求失败'));
                }
            }
        }
        xhr.send(null);
    })
    return promise;
}

// 使用
const url = '/文件路径'
myAjax(url).then(data => {
    console.log('data', data);
}).catch(err => {
    console.log(error);
})