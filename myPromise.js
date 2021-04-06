class myPromise {
    status = 'pending';
    msg = '';
    func = null;
    resolveArr = [];
    rejectArr = [];
    constructor(cb) {
        this.func = cb;
        const resolve = (x) => {
            this.status = 'fulfilled';
            this.msg = x;
        }
        const reject = (x) => {
            this.status = 'rejected';
            this.msg = x;
        }
        this.resolveArr.push(c);
        this.rejectArr.push(reject);
        cb(resolve, reject)
    }

    then(cb) {
        if(this.status === 'fulfilled') {
            setTimeout(() => {
                cb(this.msg);
            }, 0);
        }else{
        }
        
        return new myPromise(this.func);
    }

    catch(cb) {
        if(this.status === 'rejected') {
            setTimeout(() => {
                cb(this.msg)
            }, 0);
        }
    }
}

var a = new myPromise((res, rej) => {
    setTimeout(() => {
        res('hello');
    }, 2000);
    // rej('error')
})
a.then(res => {
    console.log(res,'aaa')
}).catch(err => {
    console.log(err,'bbb')
})
console.log('hello')