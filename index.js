const express = require('express')
const cheerio = require("cheerio");
const weiboURL = 'http://s.weibo.com';
const hotSearchURL = weiboURL + "/top/summary?cate=realtimehot";
const request = require('request');
setInterval(() => {
    request(hotSearchURL, function (error, response, body) {
        const $ = cheerio.load(body);
        let hotList = [];
        $("#pl_top_realtimehot table tbody tr").each(function (index) {
            if (index !== 0) {
                const $td = $(this).children().eq(1);
                const link = weiboURL + $td.find("a").attr("href");
                const text = $td.find("a").text();
                const hotValue = $td.find("span").text();
                const icon = $td.find("img").attr("src")
                    ? "https:" + $td.find("img").attr("src")
                    : "";
                // hotList.push({
                //     index,
                //     link,
                //     text,
                //     hotValue,
                //     icon,
                // });
                // if(text.indexOf('') > -1) {
                    hotList.push(text + '  热度： ' + hotValue +'\n')
                // }
            }
        });
        request({
            url: 'https://oapi.dingtalk.com/robot/send?access_token=6dc016fca23e346c2848d0758cdc5765c2125ddc2ee00f9c3ddbd3c4a20eddf7',
            method: "POST",
            json: true,
            body: {
                "msgtype": "text",
                "text": {
                    "content": "" + hotList.join('')
                },
                "at": {
                    "atMobiles": [
                        "14758179417"
                    ], 
                    "isAtAll": false
                }
            }
        }, (err, res, body) => {
            // console.log(err, res, body,'cc')
        })
    });
}, 300000);