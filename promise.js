var promise = new Promise((res, rej) => {
    setTimeout(() => {
        res('hello');
    }, 1000);
    // rej('error')s
})
promise.then(res => {
    console.log(res,'cc')
}).catch(err => {
    console.log(err)
})