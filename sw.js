//service worker安装成功后开始缓存所需的资源
var CACHE_NAME = 'MyCache';
let cachelist = ['/404.html', '/NoNetwork/'];
let not_network = '/NoNetwork/';
let My_Domain = 'www.yt-blog.top'
let out_url = ['https://npm.elemecdn.com/@waline/client@v2/dist/waline.js', 'https://npm.elemecdn.com/@waline/client@v2/dist/waline.css', 'https://npm.elemecdn.com/aplayer@1.10/dist/APlayer.min.js', 'https://npm.elemecdn.com/aplayer@1.10/dist/APlayer.min.css']
let debug = true;
let myconsole = {
    success: (m) => {
        console.log(`%c${m}`, 'border-left: 5px solid green;box-shadow: 0 0 32px 0 #79797951;text-decoration: none;border-radius: 3px;color:white !important;background:black;padding: 3px;');
    }, warning: (m) => {
        console.log(`%c${m}`, 'border-left: 5px solid yellow;box-shadow: 0 0 32px 0 #79797951;text-decoration: none;border-radius: 3px;color:white !important;background:black;padding: 3px;');
    }, info: (m) => {
        console.log(`%c${m}`, 'border-left: 5px solid dodgerblue;box-shadow: 0 0 32px 0 #79797951;text-decoration: none;border-radius: 3px;color:white !important;background:black;padding: 3px;');
    }, error: (m) => {
        console.log(`%c${m}`, 'border-left: 5px solid red;box-shadow: 0 0 32px 0 #79797951;text-decoration: none;border-radius: 3px;color:white !important;background:black;padding: 3px;');
    }, debug: (m) => {
        console.log(`%c${m}`, 'border-left: 5px solid gray;box-shadow: 0 0 32px 0 #79797951;text-decoration: none;border-radius: 3px;color:white !important;background:black;padding: 3px;');
    }
}
let cdn = {
    "gh": {
        jsdelivr: {
            "url": "https://cdn.jsdelivr.net/gh"
        }, tianli: {
            "url": "https://cdn1.tianli0.top/gh"
        }, cdnn: {
            "url": "https://cdn.yt-blog.top/gh"
        }, xyh: {
            "url": "https://cdn.oblivionocean.top/gh"
        }
        //oplog: {
        //    "url": "https://cdn.oplog.cn/gh"
        //},

    }, "combine": {
        jsdelivr: {
            "url": "https://cdn.jsdelivr.net/combine"
        }, qycdn: {
            "url": "https://cdn.chuqis.com/combine"
        }

        //oplog: {
        //    "url": "https://cdn.oplog.cn/combine"
        //}
    }, "npm": {
        eleme: {
            "url": "https://npm.elemecdn.com"
        }, jsdelivr: {
            "url": "https://cdn.jsdelivr.net/npm"

        }, //oplog: {
        //    "url": "https://cdn.oplog.cn/npm"
        //},
        jjz: {
            "url": "https://jsd.onmicrosoft.cn/npm"
        }, jjz_unpkg: {
            "url": "https://npkg.onmicrosoft.cn"
        }, sourceg: {
            "url": "https://npm.sourcegcdn.com"
        }, GNT: {
            "url": "https://cdn.bilicdn.tk/npm"
        }, tianli: {
            "url": "https://cdn1.tianli0.top/npm"
        }, unpkg: {
            "url": "https://unpkg.com"
        }, qycdn: {
            "url": "https://cdn.chuqis.com/npm"
        }
    }, "cdnjs": {
        cdnjs: {
            "url": "https://cdnjs.cloudflare.com/ajax/libs"
        }, jsdelivr: {
            "url": "https://cdn.jsdelivr.net/gh/cdnjs/cdnjs@master/ajax/libs"
        }, tianli: {
            "url": "https://cdn1.tianli0.top/gh/cdnjs/cdnjs@master/ajax/libs"
        }, cdnn: {
            "url": "https://cdn.yt-blog.top/gh/cdnjs/cdnjs@master/ajax/libs"
        }, xyh: {
            "url": "https://cdn.oblivionocean.top/gh/cdnjs/cdnjs@master/ajax/libs"
        }, nkd: {
            "url": "https://mirrors.sustech.edu.cn/cdnjs/ajax/libs"
        }
    }, "myblog": {
        mian: {
            "url": "https://www.yt-blog.top"
        }, vercel: {
            "url": "https://vercel.yt-blog.top"
        }, vercelcn: {
            "url": "https://vercel-china.yt-blog.top"
        }, github: {
            "url": "http://github.yt-blog.top"
        }, cfpage: {
            "url": "https://cfpage.yt-blog.top"
        }, cfpage2: {
            "url": "https://fgaoxing-github-io.pages.dev"
        }
    }
}
self.db = {
    read: (key, config) => {
        if (!config) {
            config = {type: "text"}
        }
        return new Promise((resolve, reject) => {
            caches.open(CACHE_NAME).then(cache => {
                cache.match(new Request(`https://LOCALCACHE/${encodeURIComponent(key)}`)).then(function (res) {
                    if (!res) resolve(null)
                    res.text().then(text => resolve(text))
                }).catch(() => {
                    resolve(null)
                })
            })
        })
    }, write: (key, value) => {
        return new Promise((resolve, reject) => {
            caches.open(CACHE_NAME).then(function (cache) {
                cache.put(new Request(`https://LOCALCACHE/${encodeURIComponent(key)}`), new Response(value));
                resolve()
            }).catch(() => {
                reject()
            })
        })
    }
}

self.addEventListener('install', function (event) {

    //调试时跳过等待过程
    self.skipWaiting();


    // Perform install steps
    //首先 event.waitUntil 你可以理解为 new Promise，
    //它接受的实际参数只能是一个 promise，因为,caches 和 cache.addAll 返回的都是 Promise，
    //这里就是一个串行的异步加载，当所有加载都成功时，那么 SW 就可以下一步。
    //另外，event.waitUntil 还有另外一个重要好处，它可以用来延长一个事件作用的时间，
    //这里特别针对于我们 SW 来说，比如我们使用 caches.open 是用来打开指定的缓存，但开启的时候，
    //并不是一下就能调用成功，也有可能有一定延迟，由于系统会随时睡眠 SW，所以，为了防止执行中断，
    //就需要使用 event.waitUntil 进行捕获。另外，event.waitUntil 会监听所有的异步 promise
    //如果其中一个 promise 是 reject 状态，那么该次 event 是失败的。这就导致，我们的 SW 开启失败。
    event.waitUntil(caches.open(CACHE_NAME)
        .then(function (cache) {
            db.read('uuid').then(function (data) {
                if (!data) {
                    myconsole.info('SW初始化')
                    db.write('uuid', 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                        return v.toString(16);
                    }))
                }
                myconsole.info('SW开始')
                return cache.addAll(cachelist);
            })
        }));

});
const lfetch = function (urls, url) {
    let controller = new AbortController();
    const PauseProgress = function (res) {
        return new Promise((resolve, reject) => {
            res.arrayBuffer().then(function (arrayBuffer) {
                resolve(new Response(arrayBuffer, {status: res.status, headers: res.headers}))
            }).catch(function (err) {
                reject(err)
            })
        })
    };
    if (!Promise.any) {
        Promise.any = function (promises) {
            return new Promise((resolve, reject) => {
                promises = Array.isArray(promises) ? promises : []
                let len = promises.length
                let errs = []
                if (len === 0) return reject(new AggregateError('All promises were rejected'))
                promises.forEach((promise) => {
                    promise.then(value => {
                        resolve(value)
                    }, err => {
                        len--
                        errs.push(err)
                        if (len === 0) {
                            reject(new AggregateError(errs))
                        }
                    })
                })
            })
        }
    }
    return Promise.any(urls.map(urls => {
        return new Promise((resolve, reject) => {
            fetch(urls, {
                signal: controller.signal
            }).then(PauseProgress).then(res => {
                if (res.status == 200) {
                    controller.abort();
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(function (err) {
                if (err.toString() === 'AbortError: The user aborted a request.') {
                    return
                }
                myconsole.error('无法请求' + err.toString())
                reject(err)
            })
        })
    }))
}

const handleerr = function (req, msg) {
    if ((req.url.split('/'))[2] === My_Domain || (req.url.split('/'))[2].indexOf('localhost') !== -1) {
        return caches.match(req).then(function (resp) {
            myconsole.warning('当前域名下的页面请求失败，推测可能是无法与服务器通信，读取缓存')
            return resp || caches.match(new Request(not_network))
        })
    }
    return new Response(`<p>资源发生错误</p>
    <p>${msg}</p>`, {headers: {"content-type": "text/html; charset=utf-8"}})
}
const handle = async function (req) {
    const urlStr = req.url
    let urlObj = new URL(urlStr)
    const pathname = urlObj.href.substr(urlObj.origin.length)
    const domain = (urlStr.split('/'))[2]
    if (pathname.match(/\/sw\.js/g)) {
        return fetch(req)
    }
    for (let i in cdn) {
        if (urlStr in out_url) {
            myconsole.info(urlStr + ' 被禁止加速')
            break
        }
        for (let j in cdn[i]) {
            let urls = []
            if (domain == ((cdn[i][j].url.indexOf('https://') < 0) ? cdn[i][j].url.split('http://')[1].split('/')[0] : cdn[i][j].url.split('https://')[1].split('/')[0]) && urlStr.match(cdn[i][j].url)) {
                let urls = []
                for (let k in cdn[i]) {
                    urls.push(urlStr.replace(cdn[i][j].url, cdn[i][k].url))
                }
                return caches.match(req).then(function (resp) {
                    return resp || lfetch(urls, urlStr).then(function (res) {
                        return caches.open(CACHE_NAME).then(function (cache) {
                            cache.put(req, res.clone());
                            return res;
                        });
                    });
                })


            }
        }
    }
    myconsole.warning(req.url + ' 没有加速')
    return fetch(req).then(function (res) {
        if (!res) {
            throw 'error'
        } //1
        return caches.open(CACHE_NAME).then(function (cache) {
            if (req.url.split(':')[0] === 'http' || req.url.split(':')[0] === 'https') {
                cache.delete(req).catch(function (err) {
                });
                cache.put(req, res.clone()).catch(function (err) {
                });
            }
            return res;
        }).catch(function (err) {
        });
    }).catch(function (e) {
        myconsole.error(req.url + ' 请求失败')
        if (domain === My_Domain || (domain.indexOf('localhost') !== -1)) {
            return caches.match(req).then(function (resp) {
                myconsole.warning('当前域名下的页面请求失败，推测可能是无法与服务器通信，读取缓存')
                return resp || caches.match(new Request(not_network))
            })
        }
        return new Response(`<h1>资源发生错误</h1>
    <b>${e}</b>`, {headers: {"content-type": "text/html; charset=utf-8"}})
    })
}

const updata = async function (req) {
    const urlStr = req.url
    myconsole.info('刷新' + urlStr)
    let urlObj = new URL(urlStr)
    const pathname = urlObj.href.substr(urlObj.origin.length)
    const domain = (urlStr.split('/'))[2]
    if (pathname.match(/\/sw\.js/g)) {
        return fetch(req)
    }
    for (let i in cdn) {
        if (urlStr in out_url) {
            myconsole.info(urlStr + ' 被禁止加速')
            break
        }
        for (let j in cdn[i]) {
            let urls = []
            if (domain == ((cdn[i][j].url.indexOf('https://') < 0) ? cdn[i][j].url.split('http://')[1].split('/')[0] : cdn[i][j].url.split('https://')[1].split('/')[0]) && urlStr.match(cdn[i][j].url)) {
                let urls = []
                for (let k in cdn[i]) {
                    urls.push(urlStr.replace(cdn[i][j].url, cdn[i][k].url))
                }
                return caches.match(req).then(function (resp) {
                    return lfetch(urls, urlStr).then(function (res) {
                        return caches.open(CACHE_NAME).then(function (cache) {
                            cache.put(req, res.clone());
                            return res;
                        });
                    });
                })


            }
        }
    }
}

self.addEventListener('fetch', async event => {
    try {
        event.respondWith(handle(event.request))
        myconsole.success(event.request.url + ' 请求成功')
    } catch (msg) {
        event.respondWith(handleerr(event.request, msg))
    }
});
self.addEventListener('activate', async function (installEvent) {
    self.clients.claim()
})
setInterval(function () {
    //刷新
    caches.open(CACHE_NAME).then(function (cache) {
        cache.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                return updata(key)
            }))
        }).catch(function (err) {
            myconsole.error(err);
        });
    })
}, 30000)

