(function (window, $, undefined) {
    var passport_config = {
        base: 'https://lucky.suning.com/',
        loginTheme: 'b2c'
    };

    //最新,由异步请求改成同步
    function getJsonpDataLatest(url, callback, checkLogin) {
        if (Object.prototype.toString.call(callback) === '[object Function]') {
            function getData() {
                $.ajax({
                    type: 'post',
                    url: url,
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    async:false,
                    jsonpCallback: 'jsonpCallback',
                    success: callback,
                    error: function () {
                    	console.log(url+"请求出错");
                    }
                });
            }

            if (checkLogin === true) {
                probeAuthStatus(getData, function () {
                    alert('unlogin');
                }, passport_config);
            } else {
                getData();
            }
        } else {
            alert('no callback');
        }
    }
    
    function getJsonpData(url, callback, checkLogin) {
        if (Object.prototype.toString.call(callback) === '[object Function]') {
            function getData() {
                $.ajax({
                    type: 'post',
                    url: url,
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    jsonpCallback: 'jsonpCallback',
                    success: function (json) {
                        callback(json ? (json.result === undefined ? json : json.result) : {});
                    },
                    error: function () {
                        callback({});
                    }
                });
            }

            if (checkLogin === true) {
                probeAuthStatus(getData, function () {
                    alert('unlogin');
                }, passport_config);
            } else {
                getData();
            }
        } else {
            alert('no callback');
        }
    }

    function getJsonpData2(data, url, callback, checkLogin) {
        if (Object.prototype.toString.call(callback) === '[object Function]') {
            function getData() {
                $.ajax({
                    type: 'post',
                    url: url,
                    data: data,
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    jsonpCallback: 'jsonpCallback',
                    success: function (json) {
                        callback(json ? (json.result === undefined ? json : json.result) : {});
                    },
                    error: function () {
                        callback({});
                    }
                });
            }

            if (checkLogin === true) {
                probeAuthStatus(getData, function () {
                    alert('unlogin');
                }, passport_config);
            } else {
                getData();
            }
        } else {
            alert('no callback');
        }
    }
    
    //获取获取所有结果状态
    function getJsonpDataWithCode(data, url, callback, checkLogin) {
        if (Object.prototype.toString.call(callback) === '[object Function]') {
            function getData() {
                $.ajax({
                    type: 'post',
                    url: url,
                    data: data,
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    jsonpCallback: 'jsonpCallback',
                    success: function (json) {
                        callback(json);
                    },
                    error: function () {
                        callback({});
                    }
                });
            }

            if (checkLogin === true) {
                probeAuthStatus(getData, function () {
                    alert('unlogin');
                }, passport_config);
            } else {
                getData();
            }
        } else {
            alert('no callback');
        }
    }
    var thankPos = -1;
    window.LDPAPI = {
        passport_config: passport_config,
        passportLogin: function () {
            var url = 'https://passport.suning.com/ids/login?loginTheme=' + LDPAPI.passport_config.loginTheme + '&service=';
            url += encodeURIComponent('https://lucky.suning.com/auth?targetUrl=');
            url += encodeURIComponent(encodeURIComponent(document.location));
            document.location = url;
        },
        //查询谢谢参与奖项信息
        queryActAwardPos: function(actCode){
        	if(thankPos==-1){
        		LDPAPI.queryActAward(actCode,function(awards){
                     for (var i = 0; i < awards.length; i++) {
                         if (parseInt(awards[i].awardTypeId, 10) == 6) {
                        	 thankPos = awards[i].awardOrder;
                             break;
                         }
                     }
        		});
        	}
        },
        // 查询活动规则
        queryActRule: function (actCode, callback) {
            if (actCode) {
                var url = '//lucky.suning.com/act/jsonp/rule/desc/' + actCode + '.json';
                getJsonpData(url, callback);
            }
        },

        // 查询活动的中奖信息
        queryActAward: function (actCode, callback) {
            if (actCode) {
                var url = '//lucky.suning.com/act/jsonp/award/' + actCode + '.json';
                getJsonpData(url, callback);
            }
        },

        // 查询我的抽奖记录
        queryDrawRecord: function (actCode, callback) {
            if (actCode) {
                var url = '//lucky.suning.com/award/jsonp/my/' + actCode + '.json';
                getJsonpData(url, callback, true);
            }
        },

        // 查询用户可用抽奖次数
        queryEnabledActivityNumber: function (actCode, callback) {
            if (actCode) {
                var url = '//lucky.suning.com/award/jsonp/my/num/' + actCode + '.json';
                getJsonpData(url, callback, true);
            }
        },

        // 查询用户云钻信息
        queryPointAmt: function (actCode, callback) {
            if (actCode) {
                var url = '//lucky.suning.com/award/jsonp/my/point/' + actCode + '.json';
                getJsonpData(url, callback, true);
            }
        },

        // 查询中奖名单
        queryWinnerList: function (actCode, callback) {
            if (actCode) {
                var url = '//lucky.suning.com/award/jsonp/top/' + actCode + '.json';
                getJsonpData(url, callback);
            }
        },

        // 抽奖
        drawAward: function (actCode, detect, channel, callback) {
            if (actCode && detect && (channel == 0 || channel == 1 || channel == 2 || channel == 3) && Object.prototype.toString.call(callback) === '[object Function]') {
            	if(thankPos==-1){
	                LDPAPI.queryActAward(actCode, function (awards) {
	                    var pos = '';
	                    for (var i = 0; i < awards.length; i++) {
	                        if (awards[i].awardTypeId == 6) {
	                            pos = awards[i].awardOrder;
	                            break;
	                        }
	                    }
	                    var url = '//lucky.suning.com/award/jsonp/draw/' + actCode + '/' + pos + '/' + channel + '.json?detect=' +detect;
	                    getJsonpData(url, callback, true);
	                });
                }else{
                	//页面加载完成需要调用一次LDPAPI.pos方法
                	var url = '//lucky.suning.com/award/jsonp/draw/' + actCode + '/' + thankPos + '/' + channel + '.json?detect=' +detect;
                	getJsonpData(url, callback, true);
                }
            }
        },

        // 领奖
        awardReceive: function (actCode, winId, callback) {
            if (actCode && winId) {
                var url = '//lucky.suning.com/award/jsonp/receive/' + actCode + '/' + winId + '.json';
                getJsonpData(url, callback, true);
            }
        },
        //新的领奖接口，老的废弃
        awardReceiveNew: function (actCode, awardId,winId, callback) {
            if (actCode && winId) {
                var url = '//lucky.suning.com/award/receive.json';
                var data = {};
                data.actCode=actCode;
                data.awardId=awardId;
                data.winId=winId;
                getJsonpDataWithCode(data,url, callback, true);
            }
        },


        // 我的全部中奖记录页面地址
        getMyAwardURL: function (userChannel) {
            return '//lucky.suning.com/award/my/award_' + userChannel + '.html';
        },

        // 我的活动中奖记录页面地址
        getMyActAwardURL: function (actCode, userChannel) {
            return '//lucky.suning.com/award/my/'+actCode+'_' + userChannel + '.html';
        },

        // 创建物流
        createDelivery: function (data, callback) {
            var url = '//lucky.suning.com/award/jsonp/create/address.json';
            getJsonpData2(data, url, callback, true);
        },


        // 查看物流信息
        queryDeliveryDetail: function (expressNo, expressCompanyCode, logisticsOrderId, callback) {
            if (expressNo && expressCompanyCode && logisticsOrderId) {
                var url = '//lucky.suning.com/award/jsonp/delivery/detail_' + expressNo + '_' + expressCompanyCode + '_' + logisticsOrderId + '.json';
                getJsonpData(url, callback, true);
            }
        },
        
        // 获取活动规则和中奖名单
        queryRulesWinnerList: function (actCode, callback) {
            var url = '//lucky.suning.com/act/jsonp/rulewin/'+actCode+'.json';
            getJsonpData(url, callback);
        },
        
        
        
        //接口更新，为不影响之前的，重新写,时间：20151221
        //1 查询活动规则
        queryActRuleLatest: function (actCode, callback) {
            if (actCode) {
                var url = '//lucky.suning.com/act/jsonp/rule/desc/' + actCode + '.json';
                getJsonpDataLatest(url, callback);
            }
        },
       //2 查询活动的奖项信息
       queryActAwardLatest: function (actCode, callback) {
	        if (actCode) {
	            var url = '//lucky.suning.com/act/jsonp/award/' + actCode + '.json';
	            getJsonpDataLatest(url, callback);
	        }
        },
       //3 查询当前活动我的抽奖记录
       queryDrawRecordLatest: function (actCode, callback) {
            if (actCode) {
                var url = '//lucky.suning.com/award/jsonp/my/' + actCode + '.json';
                getJsonpDataLatest(url, callback, true);
            }
        },

        //4 查询用户可用抽奖次数
        queryEnabledActivityNumberLatest: function (actCode, callback) {
            if (actCode) {
                var url = '//lucky.suning.com/award/jsonp/my/num/' + actCode + '.json';
                getJsonpDataLatest(url, callback, true);
            }
        },
        //5 查询中奖名单
        queryWinnerListLatest: function (actCode, callback) {
            if (actCode) {
                var url = '//lucky.suning.com/award/jsonp/top/' + actCode + '.json';
                getJsonpDataLatest(url, callback);
            }
        },
        //6 抽奖
        drawAwardLatest: function (actCode, detect, channel, callback) {
            if (actCode && detect && (channel == 0 || channel == 1 || channel == 2 || channel == 3) && Object.prototype.toString.call(callback) === '[object Function]') {
            	if(thankPos==-1){
	                LDPAPI.queryActAward(actCode, function (awards) {
	                    var pos = '';
	                    for (var i = 0; i < awards.length; i++) {
	                        if (awards[i].awardTypeId == 6) {
	                            pos = awards[i].awardOrder;
	                            break;
	                        }
	                    }
	                    var url = '//lucky.suning.com/award/jsonp/draw/' + actCode + '/' + pos + '/' + channel + '.json?detect=' +detect;
	                    getJsonpDataLatest(url, callback, true);
	                });
                }else{
                	//页面加载完成需要调用一次LDPAPI.queryActAwardPos方法
                	var url = '//lucky.suning.com/award/jsonp/draw/' + actCode + '/' + thankPos + '/' + channel + '.json?detect=' +detect;
                	getJsonpDataLatest(url, callback, true);
                }
            }
        },
        //7 领奖，继续用awardReceiveNew
        //8 我的全部中奖记录页面地址 继续用getMyAwardURL
        //9 我的活动中奖记录页面地址 继续用getMyActAwardURL
        
        //10 创建物流地址/award/jsonp/create/address.json
        createDeliveryLatest:function(actCode,actWinId,prov,city,district,detailAddr,phonenumber,receiveName,callback){
        	var url = "//lucky.suning.com/award/jsonp/create/address.json";
        	var datas = {};
			datas.actCode = actCode;
			datas.actWinId = actWinId;
			datas.province=encodeURIComponent(prov);
			datas.city=encodeURIComponent(city);
			datas.district=encodeURIComponent(district);
			datas.detailAddr=encodeURIComponent(detailAddr);
			datas.phone=phonenumber;
			datas.receiveName=encodeURIComponent(receiveName);
			getJsonpDataWithCode(datas,url,callback,true);
        },
        // 查看中奖纪录物流订单
        queryDeliveryOrderLatest: function (actCode, actWinId,callback) {
            if (actCode && actWinId) {
                var url = '//lucky.suning.com/award/jsonp/my/record/' + actCode + '/' + actWinId + '.json';
                getJsonpDataLatest(url, callback, true);
            }
        }
    };
})(window, window.$);