/**
 * Created by jie on 2017/3/28.
 */
var EventUtil={
    addHandler:function(elem,type,handler){
        if(elem.addEventListener){
            elem.addEventListener(type,handler,false);
        }else if(elem.attachEvent){
            elem.attachEvent("on"+type,function(){
                handler.call(obj);                    //解决IE下绑定事件指向window问题
            });
        } else {
            elem["on"+type]=handler;
        }
    },
    getEvent:function(event){
        return event?event:window.event;
    },
    getTarget:function(event){
        return event.target||event.srcElement;
    },
    preventDefault:function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else {
            event.returnValue=false;
        }
    },
    removeHandler:function(elem,type,handler){
        if(elem.removeEventListener){
            elem.removeEventListener(type,handler,false);
        }else if(elem.detachEvent){
            elem.detachEvent("on"+type,handler);
        }else {
            elem["on"+type]=null;
        }
    },
    stopPropagation:function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else {
            event.cancelBubble=true;
        }
    }
};
var input=document.getElementById("searchKeywords");
var oUl = document.getElementsByClassName("g-ac-results")[0].getElementsByTagName("ul")[0];
var regexp=/<\/?[^>]*>/gi;                              //去除标签内容的正则
function jsonp(data) {                          //跨域调用搜索API   需在全局作用域
    var html = "";
    if(data.words.length){                          //当返回了josn内容时
        if(data.words.length>8){                    //限制长度
            data.words.length=8;
        }
        for(var i=0;i<data.words.length;i++){               //获取所有内容和地址，并输出
            var newKeyName=data.words[i]["keyname"];
            newKeyName=newKeyName.replace(regexp,"");       //正则删除多余标签
            html+='<li><a href="https://search.suning.com/'+newKeyName+'/" target="_self"><span class="keyname">'+data.words[i]["keyname"]+'</span></a></li>';
        }
    };
    html+='<li class="g-ac-store"><a href="https://shopsearch.suning.com/shop/search.do?app=shopsearch&keyword='+input.value+'" target="_self"><i class="icon-store"></i>找“<em>'+ input.value+"" +'</em>”相关<b>店铺</b></a></li>';
    oUl.innerHTML=html;
}
EventUtil.addHandler(document,"DOMContentLoaded",function(){
    //定义DOM
    var oDiv1=document.getElementsByClassName("ng-site-nav-box")[0];
    var oA1=oDiv1.getElementsByClassName("ng-bar-node-site")[0];
    var aDiv1=oDiv1.getElementsByTagName("div")[0];
    var oEm1=aDiv1.getElementsByClassName("ng-iconfont")[0];
    var oDiv2=document.getElementsByClassName("shop-handle")[0];
    var oA2=oDiv2.getElementsByClassName("ng-bar-node-shop")[0];
    var aDiv2=oDiv2.getElementsByTagName("div")[0];
    var oDiv3=document.getElementsByClassName("myorder-handle")[0];
    var oA3=oDiv3.getElementsByClassName("ng-bar-node-fix")[0];
    var aDiv3=oDiv3.getElementsByClassName("myorder-child")[0];
    var oDiv4=document.getElementsByClassName("mysuning-handle")[0];
    var oA4=oDiv4.getElementsByClassName("ng-bar-node-fix")[0];
    var aDiv4=oDiv4.getElementsByClassName("mysuning-child")[0];
    var oDiv5=document.getElementsByClassName("app-down-box")[0];
    var oA5=oDiv5.getElementsByClassName("mb-suning")[0];
    var aDiv5=oDiv5.getElementsByClassName("mb-down-child")[0];
    var oDiv6=document.getElementsByClassName("service-handle")[0];
    var oA6=oDiv6.getElementsByClassName("ng-bar-node-service")[0];
    var aDiv6=oDiv6.getElementsByClassName("service-center-child")[0];
    var oScript=document.getElementsByTagName("script");
    var oUl_a=oUl.getElementsByTagName("a");
    var oUl_span=oUl.getElementsByClassName("keyname");
    var num=-1;
    var className1="ng-bar-node-hover";
    var className2="current";
    var className3="sn-sidebar-tab-hover";
    var className4="on";
    var className5="ng-sort-fixed";
    var className6="g-search-fixed";
    var className7="reg-bar-node-fixed";
    var className8="ng-bar-node-mini-cart-fixed";
    var className9="index-sort-detail-border";
    var bannerIndex=0;
    var preIndex;
    var timer=null;
    var headTimer=null;
    var topTimer=null;
    var text=input.value;
    var hotSearch=document.getElementById("rec_results");
    var results=document.getElementById("ac_results");
    var searchSubmit=document.getElementById("searchSubmit");
    var close=document.getElementsByClassName("close");
    var search=document.getElementById("search");
    var search_box=document.getElementsByClassName("search-keyword-box")[0];
    var onOff=false;
    var on=false;
    var onOFF1=true;
    var sortOnoff=true;
    var reg=/\S/;
    var inputText;
    var bannerBox=document.getElementsByClassName("banner-wrapper")[0];
    var bannerDiv=bannerBox.getElementsByClassName("banner")[0];
    var bannerLi=bannerDiv.getElementsByTagName("li");
    var bannerLiSize=bannerLi.length;
    var bannerABox=document.getElementsByClassName("banner-nav")[0]
    var bannerA=bannerABox.getElementsByTagName("a");
    var bannerBtnLeft=bannerBox.getElementsByClassName("btn-left")[0];
    var bannerBtnRight=bannerBox.getElementsByClassName("btn-right")[0];
    var headline=document.getElementsByClassName("toutiao")[0];
    var headUl=headline.getElementsByTagName("ul")[0];
    var phbDiv=document.getElementsByClassName("phb-tab")[0];
    var phbA=phbDiv.getElementsByTagName("a");
    var phbUl=document.getElementsByClassName("paihangbang-module")[0].getElementsByTagName("ul");
    var phbIndex=0;
    var appBox=document.getElementsByClassName("list-wrapper")[0];
    var appUl=appBox.getElementsByTagName("ul")[0];
    var appLi=appUl.getElementsByTagName("li");
    var appBtn=appBox.getElementsByClassName("btn");
    var appOnoff=true;
    var sidebarSpan=document.getElementsByClassName("sn-sidebar")[0].getElementsByClassName("tab-tip");
    var message=document.getElementsByClassName("sn-sidebar-tab-message")[0];
    var finance=document.getElementsByClassName("sn-sidebar-tab-finance")[0];
    var history1=document.getElementsByClassName("sn-sidebar-tab-history")[0];
    var sign=document.getElementsByClassName("sn-sidebar-tab-sign")[0];
    var service=document.getElementsByClassName("sn-sidebar-service")[0];
    var feedback=document.getElementsByClassName("sn-sidebar-feedback")[0];
    var code=document.getElementsByClassName("sn-sidebar-code")[0];
    var codeDiv=document.getElementById("sn-sidebar-change-code");
    var toTop=document.getElementsByClassName("sn-sidebar-to-top")[0];
    var floatBar=document.getElementsByClassName("ECode-floatBar")[0];
    var floatUl=floatBar.getElementsByTagName("ul")[0];
    var floatLi=floatUl.getElementsByTagName("li");
    var returnTop=floatBar.getElementsByClassName("return")[0];
    var floatIndex=0;
    var topBar=document.getElementsByClassName("ng-fix-bar")[0];
    var sort=document.getElementsByClassName("ng-sort-index")[0];
    var sortListBox=document.getElementsByClassName("index-sort-list-box")[0];
    var sortUl=sortListBox.getElementsByClassName("index-list")[0];
    var sortLi=sortUl.getElementsByTagName("li");
    var sortDetail=sortListBox.getElementsByClassName("index-sort-detail")[0];
    var regBar=document.getElementById("reg-bar-node");
    var topCart=document.getElementsByClassName("ng-bar-node-mini-cart")[0];
    var sortIndex=0;
    var lazyImg=document.getElementsByClassName("lazyimg");
    var sortData={
        data0:{
            "sort-btn":["电器城","手机频道","智能数码","以旧换新","网上营业厅","企业采购"],
            "cate-list":{
                "手机通讯":["css【99抢订努比亚Z17mini】","全部手机","iPhone","小米","荣耀","css华为","魅族","三星","锤子","oppo","vivo","美图","乐视","联想","css努比亚","360手机","诺基亚","PPTV","以旧换新","拍照手机"],
                "手机配件":["css【影音券免费领】","手机壳","贴膜","手机存储卡","移动电源","数据线","充电器","css蓝牙耳机"],
                "智能设备":["css【小米盒子199元起】","智能手环","智能手表","cssVR眼镜","智能门锁","体感车","无人机","智能机器人","智能摄像头"],
                "影音电子":["css【大牌耳机39元抢】","运动耳机","耳机/耳麦","MP3/MP4","录音笔","收音/收音机","影音附件","css蓝牙音箱"],
                "电子教育":["学生电脑","点读机/点读笔","学习机","电子书","儿童手表","学生手机","电子词典"],
                "苏宁互联":["css【200元抢3A】","选号入网","靓号中心","互联特权"],
                "营业厅":["css【20得200元】","选号码","办套餐","宽带","充值","中国移动","中国联通","中国电信","购机送费"]
            },
            "actShow":{
                "brandList clearfix":["images/data0-0.jpg","images/data0-1.jpg","images/data0-2.jpg","images/data0-3.jpg","images/data0-4.jpg","images/data0-5.jpg","images/data0-6.jpg","images/data0-7.jpg"],
                "actList clearfix":["images/data0-8.jpg","images/data0-9.jpg"]
            }
        },
        data1:{
            "sort-btn":["电器城","彩电频道","冰箱/洗衣机频道","空调频道","以旧换新","智能家电","企业采购"],
            "cate-list":{
                "电视":["css【海信412超级品牌日】","css海信","索尼","创维","css乐视","TCL","三星","三星","夏普","cssPPTV","长虹","酷开","小米","暴风","康佳","先锋","飞利浦","css4K超高清","智能电视","曲面电视"],
                "空调":["css【418空调提前购】","家用空调","中央空调","美的","海尔","志高","css格力","奥克斯","变频","柜机","挂机","1匹","1.5匹","2匹","3匹"],
                "冰箱":["css【冰洗每满1000立减150】","css对开门","多门","十字对开","三门","双门","风冷（无霜）","西门子","海尔","css容声","美菱","美的","松下","海信"],
                "洗衣机":["css【爆款预定海尔310升多门仅2699】","css滚筒","css洗干一体机","波轮","大容量","迷你洗衣机","变频","海尔","css西门子","小天鹅","美的","三洋","LG","松下","css海信"],
                "冷柜":["css【冷柜低至599起】","css卧式冷柜","商用展示柜","立式冷柜","酒柜","冰吧","海尔","css星星","css美的","美菱"],
                "影音":["css家庭影院","回音壁","迷你音响","css雅马哈","飞利浦","索尼","BOSE"],
                "帮客服务":["安装服务","清洗服务","维修服务","上门服务卡","清洗产品","聚材网","培训认证","家电医保卡"]
            },
            "actShow":{
                "brandList clearfix":["images/data1-0.jpg","images/data1-1.jpg","images/data1-2.jpg","images/data1-3.jpg","images/data1-4.jpg","images/data1-5.jpg"],
                "actList clearfix":["images/data1-6.jpg","images/data1-7.jpg"]
            }
        },
        data2:{
            "sort-btn":["电器城","厨卫频道","小家电频道","个护健康","健康中国馆","厨具达人","企业采购"],
            "cate-list":{
                "厨卫大家电":["css【418预售提前抢】","烟灶套餐","油烟机","燃气灶","热水器","css电热水器","燃气热水器","厨宝","浴霸/排气扇","消毒柜","洗碗机","嵌入式厨电","智能马桶盖","卫浴家电配件"],
                "厨房小家电":["css【大牌PK满300减50】","电饭煲","css电压力锅","豆浆机","电磁炉","微波炉","电水壶","css榨汁机","电饼铛","原汁机","多用途锅","电炖锅","电蒸锅","煮蛋器","电陶炉","养生壶","电热饭盒","果蔬机","商用厨房"],
                "生活小家电":["css【除湿干衣119元起】","css除湿机","css干衣机","电风扇","空调扇","css空气净化器","吸尘器","css扫地机器人","加湿器","电热毯","暖手宝","挂烫机"],
                "个护健康":["css电动剃须刀","电吹风","按摩椅","电动牙刷","美容器","剃毛器","鼻毛修剪器","按摩器","电子秤"],
                "厨具":["炒锅","压力锅","蒸锅","煎锅","汤锅","奶锅","锅具套装","砂锅","刀具"],
                "西式厨房电器":["css电烤箱","面包机","空气炸锅","酸奶机","咖啡机"],
                "水设备":["css【净水418免费送】","净水器","饮水机","净水滤芯","史密斯","沁园","3M"],
                "进口专区":["吸尘器","剃须刀","电饭煲"]
            },
            "actShow":{
                "brandList clearfix":["images/data2-0.jpg","images/data2-1.jpg","images/data2-2.jpg","images/data2-3.jpg","images/data2-4.jpg","images/data2-5.jpg"],
                "actList clearfix":["images/data2-6.jpg","images/data2-7.jpg"]
            }
        },
        data3:{
            "sort-btn":["电器城","电脑频道","相机频道","以旧换新","企业采购"],
            "cate-list":{
                "电脑整机":["css【电脑10元抵3000】","笔记本","游戏本","轻薄本","台式电脑","电脑一体机","组装电脑","新一代PC"],
                "平板电脑":["css【Apple送PPTV会员】","iPad","微软平板","Kindle","小米平板","css华为平板","三星平板","二合一 "],
                "游戏装备":["css【炫龙骑士独家首发】","游戏机","游戏耳机","手柄/方向盘","游戏附件"],
                "网络设备":["css【路由券免费领】","路由器","网卡","交换机","随身wifi","网络存储"],
                "外设附件":["css【配件99减20】","键盘","css移动硬盘","U盘","电脑音箱","电脑包","散热垫","鼠标垫","摄像头","手写板","鼠标"],
                "摄影摄像":["css【418抢相机】","css单反","css微单/单电","数码相机","摄像机","镜头","拍立得","运动相机","css佳能 "],
                "数码配件":["css【春暖“四”意购】","储存卡","读卡器","三脚架/云台","摄影包","滤镜","电池/充电器","机身附件","望远镜"],
                "DIY硬件":["css【8G内存199抢】","css显示器","CPU","主板","显卡","硬盘","cssSSD固态硬盘","内存","机箱","散热器","CPU套装"],
                "办公文仪":["css【办公每1000减100】","投影仪","css一体机","打印机","css办公用纸","投影附件","复印/复合机","对讲机","电话机","考勤机","墨盒","硒鼓","墨粉","css办公文具","学生文具","本册/便签","文件管理","笔类"]
            },
            "actShow":{
                "brandList clearfix":["images/data3-0.jpg","images/data3-1.jpg","images/data3-2.jpg","images/data3-3.jpg","images/data3-4.jpg","images/data3-5.jpg","images/data3-6.jpg","images/data3-7.jpg"],
                "actList clearfix":["images/data3-8.jpg","images/data3-9.jpg"]
            }
        },
        data4:{
            "sort-btn":["居家家纺","家具馆","建材馆","家装馆","企业采购"],
            "cate-list":{
                "家纺":["床品套件","被子","枕头","css春秋被","毛巾/浴巾","床垫/床褥","毛巾被/毯","坐垫/抱枕","地毯地垫","餐桌布艺"],
                "家具":["css【418家装预热】","客厅成套家具","餐厅成套家具","卧室成套家具","儿童成套家具","书房家具","沙发","床","床垫","电视柜","电脑椅","衣柜","茶几","餐桌","电脑桌","置物架","阳台/户外"],
                "灯具灯饰":["css【418预售】","客厅灯","卧室灯","吸顶灯","灯具套餐","吊灯","台灯","集成吊顶"],
                "厨房卫浴":["css【418自营抢先购】","花洒","水槽","马桶","坐便器盖板","龙头","地漏","浴室柜","卫浴挂件","浴缸"],
                "五金建材":["css【420家装品类日】","开关","插座","锁具","监控器材","电钻","电线","家具五金","手动工具","工具箱","电动工具","油漆涂料","接线板","墙纸壁纸","瓷砖","地板","开关插座套装"],
                "定制装修":["整体衣柜","定制电视柜","定制柜类","整装定制","装修服务","木门","特权定金"],
                "生活日用":["css收纳用品","洗晒用品","鲜花","保暖用品","雨伞雨具","口罩","净化除味","清洁工具","一次性用品"],
                "成人用品":["css安全避孕","情爱玩具","人体润滑","验孕测孕","SM用品","情趣内衣","飞机杯"]
            },
            "actShow":{
                "brandList clearfix":["images/data4-0.png","images/data4-1.jpg","images/data4-2.jpg","images/data4-3.jpg","images/data4-4.jpg","images/data4-5.jpg"],
                "actList clearfix":["images/data4-6.png","images/data4-7.jpg"]
            }
        },
        data5:{
            "sort-btn":["苏宁超市","食品粮油","酒水冲调","苏鲜生","中华特色馆","医药馆","企业采购"],
            "cate-list":{
                "休闲食品":["饼干","坚果","糖果","口香糖","薯片","巧克力","糕点点心","卤味小食","肉松肉脯","膨化食品","蜜饯果脯","海味即食","果冻布丁","进口零食"],
                "进口食品":["css进口巧克力","牛奶乳品","休闲食品","方便速食","粮油","生鲜","厨房调料","进口酒"],
                "生鲜食品":["水果","海鲜水产","牛排","蛋类","熟食","加工肉类","腌腊制品","低温乳品"],
                "酒类":["css红酒","啤酒","白酒","黄酒/米酒","养生酒","预调酒","葡萄酒/果酒"],
                "饮料冲调":["纯牛奶","酸奶","风味奶","茶饮料","碳酸饮料","css饮用水","果蔬汁","咖啡","茶叶","蜂蜜","奶茶","成人奶粉","麦片谷物","果味冲调"],
                "粮油调味":["大米","食用油","面粉","杂粮","南北干货","大枣","厨房调料","方便速食"],
                "营养保健":["保健饮品","传统滋补","膳食纤维","玛卡玛咖","复合维生素","左旋肉碱","鱼油磷脂","阿胶","胶原蛋白","参类","灵芝","枸杞","css燕窝","冬虫夏草","蜂制品","葡萄籽","膳食补充剂"],
                "中华特色馆":["css安溪铁观音","特色大米","杂粮","美酒","武夷山大红袍","枣","黑木耳","枸杞","茗茶","茶油","生鲜","咸鸭蛋","css土鸡蛋","零食","坚果","罐头","龙口粉丝","蜂蜜","调味酱","css黄山毛峰"]
            },
            "actShow":{
                "brandList clearfix":["images/data5-0.jpg","images/data5-1.png","images/data5-2.jpg","images/data5-3.jpg","images/data5-4.png","images/data5-5.jpg"],
                "actList clearfix":["images/data5-6.jpg","images/data5-7.jpg"]
            }
        },
        data6:{
            "sort-btn":["苏宁超市","美护个妆","医药馆"],
            "cate-list":{
                "面部护肤":["面部清洁","护肤套装","眼部护理","颈部护理","css面膜","爽肤水","乳液","面霜","精华","洗面奶","眼霜","海外尖货","防晒隔离","进口护肤","进口水乳套装"],
                "口腔护理":["css牙膏","牙刷","口腔套装","漱口水/口喷","儿童牙膏"],
                "洗发护发":["css洗发水","护发素","洗护套装","染发","造型","无硅油","去屑"],
                "身体护理":["css沐浴露","润体乳","护手霜","足部护理","瘦身纤体","洗手液","手部护理"],
                "彩妆香氛":["面部底妆","眉笔","眼部","css口红","卸妆","美妆工具","css香水","精油","气垫BB","润唇膏"],
                "女性护理":["css卫生巾","日用","夜用","组合套装","私处洗液","护垫"],
                "清洁洗护":["衣物洗护","css洗衣液","洗衣粉/皂","家庭清洁","洗洁精","洁厕剂","消毒液"],
                "生活用纸":["css抽纸","卷纸","湿纸巾","手帕纸","厨房用纸","平板纸"],
                "宠物生活":["css宠物主食","宠物零食","出行装备","宠物保健","宠物日用","宠物玩具","宠物美容洗护"]
            },
            "actShow":{
                "brandList clearfix":["images/data6-0.jpg","images/data6-1.jpg","images/data6-2.jpg","images/data6-3.jpg","images/data6-4.jpg","images/data6-5.jpg"],
                "actList clearfix":["images/data6-6.jpg","images/data6-7.jpg"]
            }
        },
        data7:{
            "sort-btn":["车床座椅","儿童玩具","孕产/摄影","418提前抢"],
            "cate-list":{
                "孕婴奶粉":["1段","2段","3段","4段","孕妈奶粉","特配奶粉","有机奶粉"],
                "尿裤湿巾":["新生儿","S号尿裤","M号尿裤","L号尿裤","XL/XXL号","拉拉裤","css宝宝湿巾"],
                "营养辅食":["米粉","宝宝面食","果汁果泥","零食","钙铁锌","进口辅食","清火开胃","DHA"],
                "喂养用品":["奶瓶","奶嘴","吸奶器","保温消毒","儿童餐具","水杯水壶","围兜/口水巾","口腔清洁"],
                "孕婴洗护":["洗衣皂","洗衣液","洗发/沐浴","洗护套装","css护肤","理发器","婴童护臀","坐便器","爽身粉","css宝宝驱蚊"],
                "服饰寝居":["儿童套装","婴童裤子","马甲/背心","外套/风衣","家居床品","css运动鞋","皮鞋","学步鞋","帆布鞋"],
                "童车床":["安全座椅","婴儿推车","自行车","电动车","滑板车","学步车","三轮车","扭扭车","婴儿床","儿童家具"],
                "儿童玩具":["0-6个月","6-12个月","1-3岁","3-6岁","6岁以上","益智玩具","户外玩具","模型玩具","遥控航模","积木拼插","毛绒玩具","玩具枪","DIY玩具","电动玩具","娃娃玩具","游水玩沙","乐器"],
                "孕妈专区":["孕妈洗护","孕妈装","防辐射服","文胸/内裤","待产包","月子服","妈咪包"]
            },
            "actShow":{
                "brandList clearfix":["images/data7-0.jpg","images/data7-1.jpg","images/data7-2.jpg","images/data7-3.jpg","images/data7-4.jpg","images/data7-5.jpg","images/data7-6.jpg","images/data7-7.jpg"],
                "actList clearfix":["images/data7-8.jpg","images/data7-9.jpg"]
            }
        },
        data8:{
            "sort-btn":["运动馆","服装城","珠宝馆","钟表馆","皮具箱包"],
            "cate-list":{
                "运动户外馆":["css【运动199减100】","苏宁足球","阿迪达斯","new balance","耐克","特步","鸿星尔克","李宁","安踏"],
                "运动鞋":["css跑步鞋","休闲板鞋","篮球鞋","足球鞋","羽毛球鞋","训练鞋","帆布鞋"],
                "帆布鞋":["css【服饰家装3免1】","T恤","css卫衣","运动夹克","POLO衫","运动长裤","运动套装","运动短裤","羽绒服","棉服"],
                "健身训练":["css跑步机","健身车","甩脂机","仰卧板","踏步机","哑铃","综合训练器","椭圆机","臂力器"],
                "户外鞋服":["徒步鞋","登山鞋","溯溪鞋","皮肤风衣","冲锋衣","速干衣裤","抓绒衣","户外休闲鞋"],
                "户外装备":["css帐篷","手电筒","望远镜","野餐炊具","睡袋","吊床","户外包","野餐垫","便携桌椅床","军迷用品"],
                "骑行/垂钓":["css自行车","公路车","折叠自行车","通勤车","思维车","电动车","骑行服饰","鱼竿","鱼饵","鱼线","浮漂"],
                "体育用品":["乒乓球","羽毛球","css篮球","足球","轮滑滑板","轮滑滑板","网球","排球"],
                "游泳用品":["女士泳衣","比基尼","男士泳衣","泳镜","游泳圈","游泳包","泳帽"]
            },
            "actShow":{
                "brandList clearfix":["images/data8-0.jpg","images/data8-1.jpg","images/data8-2.jpg","images/data8-3.jpg","images/data8-4.jpg","images/data8-5.jpg","images/data8-6.jpg","images/data8-7.jpg"],
                "actList clearfix":["images/data8-8.jpg","images/data8-9.jpg"]
            }
        },
        data9:{
            "sort-btn":["服装城","皮具箱包","钟表馆","珠宝馆","运动馆","婚纱城"],
            "cate-list":{
                "当季流行":["css【服饰家装3免1】","css连衣裙","针织衫","女士套装","女士衬衫","男士衬衫","夹克男","春夏睡衣","文胸","牛仔裤"],
                "女士上装":["css【女装3免1】","短外套","牛仔外套","衬衫","雪纺衫","荷叶边衬衫","T恤","卫衣女","小西装","夹克"],
                "女士下装":["半身裙","荷叶短裙","css牛仔裤","皮裤","小脚裤","小脚裤","哈伦裤","阔腿裤"],
                "男士上装":["css【男装3免1】","卫衣","针织衫","衬衫","POLO衫","T恤","西服","牛仔服","风衣","皮衣"],
                "男士裤装":["牛仔裤","休闲裤","西裤","小脚裤","工装裤","短裤"],
                "文胸睡衣":["css【内衣3免1】","蕾丝文胸","调整型文胸","运动文胸","美背文胸","纯棉睡衣","春夏睡裙","情侣睡衣","性感睡裙","无痕文胸","聚拢文胸"],
                "内衣内裤":["女士内裤","css男士内裤","纯棉内裤","莫代尔内裤","多条装内裤","无痕内裤","男士背心","吊带背心"],
                "袜子配饰":["css船袜","船袜","丝袜","男袜","女袜","连裤袜","瘦身袜","女士围巾","男士丝巾/围巾","领带"],
                "特色服装":["妈妈装","大码女装","职业套装","婚纱礼服","运动套装","唐装","旗袍","情趣内衣"]
            },
            "actShow":{
                "brandList clearfix":["images/data9-0.jpg","images/data9-1.jpg","images/data9-2.jpg","images/data9-3.jpg","images/data9-4.jpg","images/data9-5.jpg","images/data9-6.jpg","images/data9-7.jpg"],
                "actList clearfix":["images/data9-8.jpg","images/data9-9.jpg"]
            }
        },
        data10:{
            "sort-btn":["皮具箱包","钟表馆","珠宝馆","服装城","运动馆"],
            "cate-list":{
                "时尚男鞋":["css【鞋包3免1】","商务鞋","休闲鞋","板鞋","高帮鞋","乐福鞋","豆豆鞋男","正装皮鞋","布洛克","帆布鞋","凉鞋/沙滩鞋","靴子"],
                "女鞋":["单鞋","单鞋","帆布鞋","高跟鞋","高跟鞋","小白鞋","乐福鞋","居家鞋/室内拖鞋","凉鞋","靴子"],
                "靴子":["单肩包","css双肩包","手提包","手包","女士钱包/卡包","斜挎包"],
                "精品男包":["单肩包","斜挎包","手提包","手拿包","css男士钱包/卡包","商务公文包","皮具套装"],
                "功能箱包":["功能箱包","电脑数码包","旅行包","运动休闲","登山包","腰包/胸包","书包","箱包配件"],
                "钟表眼镜":["css【珠宝钟表1元抵100】","女表","机械表","css瑞士名表","国产名表","石英表","男士机械表","女士石英表","运动表","儿童手表","电子表","闹钟挂钟","日韩名表","眼镜","隐形眼镜","太阳镜","css男表"],
                "珠宝饰品":["黄金","时尚饰品","铂金","翡翠玉石","钻石","彩宝","珍珠","琥珀","金银投资","银饰","木饰","水晶玛瑙","施华洛世奇"],
                "礼品乐器":["打火机","瑞士军刀","电子烟","csszippo","乐器","电钢琴","电子琴","钢琴","吉他","尤克里里"],
                "艺术品":["水晶","琉璃","陶瓷","雕刻","刺绣","布艺品","漆器","青铜器","书画"]
            },
            "actShow":{
                "brandList clearfix":["images/data10-0.jpg","images/data10-1.jpg","images/data10-2.jpg","images/data10-3.jpg","images/data10-4.jpg","images/data10-5.jpg","images/data10-6.jpg","images/data10-7.jpg"],
                "actList clearfix":["images/data10-8.jpg","images/data10-9.jpg"]
            }
        },
        data11:{
            "sort-btn":["汽车/摩托车","轮胎","车饰馆"],
            "cate-list":{
                "汽车生活":["摩托车","全款购车","小型车","紧凑型车","SUV","css定金购车"],
                "系统养护":["css【龙蟠上市“油”礼】","css机油","燃油添加剂","机油添加剂","系统清洁剂","系统清洁剂"],
                "电子/电器":["css行车记录仪","css车载空气净化","充气泵","车载吸尘器","车载冰箱","电子狗","便携导航仪","电源转换器","车载蓝牙","汽车影音"],
                "清洁美容":["css【8.8元抢车品】","洗车机","css车蜡","漆面修复","css玻璃水","内饰清洁","美容清洁工具"],
                "坐垫/脚垫":["css凉垫","四季垫","专车专用座垫","专车专用座套","通用座套","多功能垫","专车专用脚垫","通用脚垫","专车专用后备箱垫"],
                "内饰精品":["css车用香水","车用炭包","空气清新","方向盘套","css挂饰/摆饰","手机架","头枕/颈枕","抱枕/腰靠","收纳用品"],
                "汽车配件":["css雨刮/雨刷","汽车照明","css滤清器","火花塞","刹车片","刹车盘","轮胎","喇叭","电瓶","防爆膜"],
                "汽车服务":["css加油卡","保养服务","安装服务","保养套餐","卡拉丁"]
            },
            "actShow":{
                "brandList clearfix":["images/data11-0.jpg","images/data11-1.jpg","images/data11-2.jpg","images/data11-3.jpg","images/data11-4.jpg","images/data11-5.jpg","images/data11-6.jpg","images/data11-7.jpg"],
                "actList clearfix":["images/data11-8.jpg","images/data11-9.jpg"]
            }
        },
        data12:{
            "sort-btn":["图书频道","电子周刊","少儿图书"],
            "cate-list":{
                "少儿频道":["0-2岁","3-6岁","7-10岁","10-14岁","css幼儿启蒙","绘本","益智游戏","玩具书","中国儿童文学","外国儿童文学","科普百科","少儿英语","人生成长","动漫卡通"],
                "文学艺术":["小说","名人传记","css青春文学","爱情/情感","悬疑/推理","言情","动漫"],
                "人文社科":["人文社科","文化","心理学","哲学/宗教","政治/军事","法律"],
                "音像":["华语流行","欧美流行","欧美摇滚","css日韩流行","古典音乐","儿童教育"],
                "期刊杂志":["时尚/美妆","生活休闲","css健康美食","母婴育儿","旅游地理","财经管理","数码/计算机"],
                "经管励志":["经济","金融","创业","投资理财","市场营销","css励志与成功"],
                "健康生活":["旅游","美食","孕产育儿","塑身美颜","居家休闲","性","css体育运动"],
                "教育科技":["css中小学教辅","外语","工具书","IT互联网","医学","建筑","office办公"],
                "电子书刊":["小说","css青春文学","孕产育儿","美丽装扮","美食","励志成功","管理","投资理财","历史","哲学宗教","玄幻","都市","悬疑","女生"]
            },
            "actShow":{
                "brandList clearfix":["images/data12-0.jpg","images/data12-1.jpg","images/data12-2.jpg","images/data12-3.jpg","images/data12-4.jpg","images/data12-5.jpg"],
                "actList clearfix":["images/data12-6.jpg","images/data12-7.jpg"]
            }
        },
        data13:{
            "sort-btn":["理财","众筹","分期","保险"],
            "cate-list":{
                "苏宁金融":["css投资理财","众筹","保险","消费贷款","储值卡","企业贷款","财富资讯","css苏宁金融APP下载"],
                "投资理财":["票据理财","苏宁零钱宝","基金","保险理财","活动专区","我的理财","css安心盈"],
                "众筹":["科技","设计","公益","农业","文化","娱乐","其他"],
                "保险":["车险","小微保","意外险","健康险","财产险","css延保"],
                "易付宝":["css手机充值","还款","转账","css水电煤","加油卡","固话宽带","有线电视","校园一卡通"],
                "旅行":["火车票","企业差旅","机票","景点门票","旅行社"]
            },
            "actShow":{
                "brandList clearfix":["images/data13-0.jpg","images/data13-1.jpg","images/data13-2.jpg","images/data13-3.jpg","images/data13-4.jpg","images/data13-5.jpg"],
                "actList clearfix":["images/data13-6.jpg","images/data13-7.jpg"]
            }
        }
    };
//定义函数
    function show(elem,tar,value){                  //显示动画（高度）
        clearTimeout(elem.timer);                   //防止连续调用闪屏
        addClass(elem,value);
        elem.timer= setTimeout(function(){
            tar.style.display="block";                  //显示元素
            var y=parseInt(getStyle(tar,"height"));     //同时获取元素原来高度，再将高度设为0
            tar.style.height=0;
            animate(tar,{"height":y},100,"linear",function(){   //开始动画
                tar.setAttribute("style","display:block;")
            });
        },200)
    }
    function hide(elem,tar,value){                    //隐藏动画（高度）
        clearTimeout(elem.timer);
        removeClass(elem,value);
        elem.timer=setTimeout(function(){
            animate(tar,{"height":0},100,"linear",function(){   //开始动画，设置样式
                tar.setAttribute("style","display:none;")
            });
        },200)
    }
    var Tween = {
        linear: function (t, b, c, d) {
            return c * t / d + b;
        },
        easeIn: function (t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOut: function (t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        easeInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        },
        easeInOutCirc: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
    };
    function animate(obj,json,time,fs,fn){            //原生JS版时间运动框架
        clearInterval(obj.timer);
        var startTime=(new Date()).getTime();     //获取开始时间毫秒
        obj.timer=setInterval(function(){
            var endTime=(new Date()).getTime();      //定时器开始时间
            var t=time-Math.max(0,startTime-endTime+time);      //当前时间
            for(var attr in json){                  //调用Tween函数运动值
                if(attr == 'opacity'){
                    var b = Math.round(getStyle(obj,attr)*100);
                    var c = json[attr]*100-b;
                    obj.style.filter = 'alpha(opacity='+ Tween[fs](t,b,c,time) +')';
                    obj.style.opacity = Tween[fs](t,b,c,time)/100;
                }
                else{
                    var b=parseInt(getStyle(obj,attr));
                    var c=json[attr]-b;
                    obj.style[attr]=Tween[fs](t,b,c,time)+"px";
                }
            }
            if(t==time){
                clearInterval(obj.timer);
                fn&&fn.call(obj);
            }
        },13)
    }
    function addClass(elem,value){
        if(elem.className==""){
            elem.className=value;
        }else {
            var x=elem.className.indexOf(value);
            if(x===-1) {
                elem.className += " " + value;
            }else {
                return false;
            }
        }
    }
    function removeClass(elem,value){
        var str=elem.className;
        var newValue=" "+value;
        var newIndex=str.indexOf(newValue);
        var index=str.indexOf(value);
        if(newIndex!=-1){
            str=str.replace(newValue,"");
            elem.className=str;
        }else if(index!=-1){
            str=str.replace(value,"");
            elem.className=str;
        }else {
            return false;
        }
    }
    function Move(obj,json,fn){                         //非时间版运动框架
        clearInterval(obj.timer);
        obj.timer = setInterval(function(){
            var bStop = true;
            for(var attr in json){
                var iCur = 0;
                if(attr == 'opacity'){
                    iCur = Math.round(parseFloat(getStyle(obj, attr))*100);
                }else{
                    iCur = parseInt(getStyle(obj,attr));
                }
                var iSpeed = (json[attr] - iCur) / 8;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                if(iCur != json[attr]){
                    bStop = false;
                }
                if(attr=='opacity'){
                    iCur += iSpeed;
                    obj.style.filter='alpha(opacity:' + iCur + ')';
                    obj.style.opacity=iCur / 100;
                }
                else{
                    obj.style[attr]=iCur+iSpeed+'px';
                }
            }
            if(bStop){
                clearInterval(obj.timer);
                fn&&fn();
            }
        },30)
    }
    function getStyle(obj,attr){
        return obj.currentStyle?obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
    }
    function getInnerText(elem) {
        return (typeof elem.textContent == "string") ? elem.textContent : elem.innerText;
    }
    function index(current, obj){
        for (var i = 0; i < obj.length; i++) {
            if (obj[i] == current) {
                return i;
            }
        }
    }
    function getScrollTop() {
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;;
        return scrollTop;
    }
    function setScrollTop(scroll_top) {                 ////设置scrollTop值函数
        if (document.compatMode == "BackCompat") {      //在混杂模式下时
            document.body.scrollTop=scroll_top;
        }else {                                     //在标准模式下，根据值是否为零再次判断
            document.documentElement.scrollTop == 0 ? document.body.scrollTop= scroll_top: document.documentElement.scrollTop=scroll_top;
        }
    }
    function showBanner(dir,onoff){                             //图片切换动画函数
        if(onoff!=false){                          //判断是否传了参数，如果传入了参数则跳过下面
            if(dir=="left"){                                 //如果是向左切换
                bannerIndex--;
                preIndex=bannerIndex+1;             //以前的索引值等于当前索引值减1
                if (bannerIndex<0) {                  //切换完第一张图片时
                    bannerIndex =bannerLiSize-1;        //当前索引值赋值为最后一张图
                    preIndex=0;                         //以前索引值赋值为0
                }
            }
            else {                       //如果是向右切换
                bannerIndex++;
                preIndex=bannerIndex-1;             //以前的索引值等于当前索引值减1
                if(bannerIndex>bannerLiSize-1){         //切换完最后一张时
                    bannerIndex=0;                      //当前索引值赋值为0
                    preIndex=bannerLiSize-1;            //以前索引值赋值为最后一张图
                };
            }
        }
        //将前一张图隐藏
        animate(bannerLi[preIndex],{"opacity":0},400,"easeIn",function(){
            bannerLi[preIndex].removeAttribute("style");
        });
        //将现在图显示
        bannerLi[bannerIndex].style.opacity=0;
        bannerLi[bannerIndex].style.filter = 'alpha(opacity=0)';
        bannerLi[bannerIndex].style.display="list-item";
        animate(bannerLi[bannerIndex],{"opacity":1},500,"easeInOutCirc",function(){
            //微调样式，打开开关，用于防止重复调用闪屏
            this.setAttribute("style","display:list-item;");
            onOFF1=true;
        });
        removeClass(bannerA[preIndex],className2);             //删添class，设置样式
        addClass(bannerA[bannerIndex],className2);
    }
    function showHeadline(){                        //头条滚动函数
        var t=parseInt(getStyle(headUl,"marginTop"));
        if(t==0){
            headTimer=setTimeout(function() {      //开启此定时器
                animate(headUl, {"marginTop": -96},1000,"easeOut",function(){
                    clearTimeout(headTimer);        //清除并再次开启定时器，方便取消动画
                    headTimer= setTimeout(function () {
                        animate(headUl, {"marginTop": -192},1000,"easeOut",function(){
                            headUl.style.marginTop = "0px";
                            showHeadline();
                        });
                    },2000)
                })
            },6000)
        }
        else {
            headTimer=setTimeout(function(){        //开启延迟定时器
                animate(headUl,{"marginTop": -192},1000,"easeOut", function () {
                    headUl.style.marginTop = "0px";
                    showHeadline();
                });
            },4000)
        }
    }
    function toScrollTop(Y,fn){                                     //设置scrollTop值动画函数
        clearInterval(topTimer);
        var T = getScrollTop();                           //设置速度
        var speed=(Y-T)/10;
        if(speed===0){
            fn&&fn();
            return false;
        }
        topTimer=setInterval(function(){
            var top = getScrollTop();
            setScrollTop(top+speed);
            if(speed<0) {
                if (top<=Y) {                         //位置归正，清除定时器
                    setScrollTop(Y);
                    clearInterval(topTimer);
                    fn&&fn();
                }
            }else {
                if (top >= Y) {
                    setScrollTop(Y);
                    clearInterval(topTimer);
                    fn&&fn();
                }
            }
        },50)
    }
    function setfloatCss(index){                        //设置左浮框样式
        floatBar.style.display="block";
        removeClass(floatLi[floatIndex],className4);        //清除原样式
        floatIndex=index;                                   //再次赋值设置样式
        addClass(floatLi[floatIndex],className4);
    }
    function scrollChange(){                            //窗口scroll事件函数
        var top = getScrollTop();
        switch (true){
            case top<1500:
                floatBar.style.display="none";
                break;
            case top>=10800:
                floatBar.style.display="none";
                break;
            case top>=7200:
                setfloatCss(10);
                break;
            case top>=6800:
                setfloatCss(9);
                break;
            case top>=6200:
                setfloatCss(8);
                break;
            case top>=5600:
                setfloatCss(7);
                break;
            case top>=5000:
                setfloatCss(6);
                break;
            case top>=4550:
                setfloatCss(5);
                break;
            case top>=4000:
                setfloatCss(4);
                break;
            case top>=3400:
                setfloatCss(3);
                break;
            case top>=2900:
                setfloatCss(2);
                break;
            case top>=2200:
                setfloatCss(1);
                break;
            case top>=1500:
                setfloatCss(0);
                break;
        }
    }
    function stopScrollChange(to,fn){
        EventUtil.removeHandler(window,"scroll",scrollChange);
        toScrollTop(to,function(){
            EventUtil.addHandler(window,"scroll",scrollChange);
            fn&&fn();
        });
    }
    function showSort(){                                //显示全部商品分类
        clearTimeout(sortListBox.timer);                   //防止连续调用闪屏
        sortListBox.timer= setTimeout(function(){
            var y=parseInt(getStyle(sortListBox,"height"));
            sortListBox.style.height=0;
            sortListBox.style.display="block";
            sortListBox.style.overflow="hidden";
            animate(sortListBox,{"height":y},400,"linear",function(){   //开始动画
                sortListBox.setAttribute("style","display:block;")
            });
        },20)
    }
    function hideSort(){
        clearTimeout(sortListBox.timer);
        sortListBox.style.overflow="hidden";
        sortListBox.timer=setTimeout(function(){
            animate(sortListBox,{"height":0},400,"linear",function(){   //开始动画，设置样式
                sortListBox.setAttribute("style","display:none;")
            });
        },50)
    }
    function getData(data,fn){                      //获取商品分类json数据并输出到页面
        var sort_btn="";
        var cate_list="";
        var actShow="";
        for(var attr in data){
            if(attr=="sort-btn"){
                var str1="";
                for(var attr1 in data[attr]){
                    str1+='<a href="javascript:void(0);" title="'+data[attr][attr1]+'">'+data[attr][attr1]+'</a>';
                }
                sort_btn='<div class="sort-btn">'+str1+'</div>'
            }
            else if(attr=="cate-list"){
                var str2="";
                for(var attr2 in data[attr]){
                    var str3="";
                    for(var attr3 in data[attr][attr2]) {
                        if(data[attr][attr2][attr3].indexOf("css")!=-1){
                            str3 += '<a href="javascript:void(0);" class="orange" title="'+data[attr][attr2][attr3].slice(3)+'">' + data[attr][attr2][attr3].slice(3) + '</a>';
                        }else {
                            str3 += '<a href="javascript:void(0);" title="'+data[attr][attr2][attr3]+'">' + data[attr][attr2][attr3] + '</a>';
                        }
                    }
                    str2+='<dl><dt><a href="javascript:void(0);" title="'+attr2+'">' + attr2 + '</a></dt><dd>' + str3 + '</dd></dl>';
                }
                cate_list='<div class="cate-list">'+str2+'</div>';
            }else if(attr=="actShow"){
                var str4="";
                var str5="";
                for(var attr4 in data[attr]){
                    var str6="";
                    var str7="";
                    if(attr4=="brandList clearfix") {
                        for (var attr5 in data[attr][attr4]) {
                            str6+='<a href="javascript:void(0);" ><img src="'+data[attr][attr4][attr5]+'"/></a>';
                        }
                        str4='<div class="brandList clearfix">'+str6+'</div>';
                    }else if(attr4=="actList clearfix"){
                        for (var attr6 in data[attr][attr4]) {
                            str7+='<a href="javascript:void(0);"><img src="'+data[attr][attr4][attr6]+'"/></a>';
                        }
                        str5='<div class="actList clearfix">'+str7+'</div>';
                    }
                }
                actShow='<div class="actShow">'+str4+str5+'</div>';
            }
        }
        sortDetail.innerHTML=sort_btn+cate_list+actShow;
        fn&&fn();
    }
    function getTop(elem){
        var y=0;
        while(elem){
            y+=elem.offsetTop;
            elem=elem.offsetParent;
        }
        return y;
    }

    headline.appendChild(headUl.cloneNode(true));                 //复制头条内容并添加
    showHeadline();                                          //开始头条轮播
    scrollChange();                                          //scroll事件函数
    (function(){                                    //加载完显示APP推广
        codeDiv.style.display="block";
        codeDiv.style.left="-160px";
        addClass(code,className3);
        code.timer=setTimeout(function(){
            animate(codeDiv,{"left":0},600,"linear",function(){
                codeDiv.style.display="none";
                removeClass(code,className3);
            });
        },5000)
    })();
    timer=setInterval(function(){                            //开始图片轮播
        showBanner();
    },5000);

    //定义事件
    EventUtil.addHandler(oDiv1,"mouseenter",function(){
        show(oA1,aDiv1,className1);
    })
    EventUtil.addHandler(oDiv1,"mouseleave",function(){
        hide(oA1,aDiv1,className1);
    })
    EventUtil.addHandler(oEm1,"click",function(){
        hide(oA1,aDiv1,className1);
    })
    EventUtil.addHandler(oDiv2,"mouseenter",function(){
        show(oA2,aDiv2,className1);
    })
    EventUtil.addHandler(oDiv2,"mouseleave",function(){
        hide(oA2,aDiv2,className1);
    })
    EventUtil.addHandler(oDiv3,"mouseenter",function(){
        show(oA3,aDiv3,className1);
    })
    EventUtil.addHandler(oDiv3,"mouseleave",function(){
        hide(oA3,aDiv3,className1);
    })
    EventUtil.addHandler(oDiv4,"mouseenter",function(){
        show(oA4,aDiv4,className1);
    })
    EventUtil.addHandler(oDiv4,"mouseleave",function(){
        hide(oA4,aDiv4,className1);
    })
    EventUtil.addHandler(oDiv5,"mouseenter",function(){
        show(oA5,aDiv5,className1);
    })
    EventUtil.addHandler(oDiv5,"mouseleave",function(){
        hide(oA5,aDiv5,className1);
    })
    EventUtil.addHandler(oDiv6,"mouseenter",function(){
        show(oA6,aDiv6,className1);
    })
    EventUtil.addHandler(oDiv6,"mouseleave",function(){
        hide(oA6,aDiv6,className1);
    })

    //搜索框事件函数
    EventUtil.addHandler(oUl,"mouseenter",function(){
        on=false;
        if(num!=-1){
            oUl_a[num].blur();
            num=-1;
        }
    })
    EventUtil.addHandler(oUl,"mouseleave",function(){
        on=true;
    })
    EventUtil.addHandler(search_box,"mouseenter",function(){
        on=true;
    })
    EventUtil.addHandler(search_box,"mouseleave",function(){
        on=true;
    })
    EventUtil.addHandler(input,"focus",function(){          //搜索框聚焦时
        if(input.value==text) {                             //原内容未变时，修改样式,开启动画
            input.value = "";
            input.style.color = "#000";
            var h=parseInt(getStyle(hotSearch,"height"));
            hotSearch.style.height=0;
            hotSearch.style.display="block";
            animate(hotSearch,{"height":h},100,"linear",function(){
                hotSearch.setAttribute("style","display:block;")
            })
        }else {                                             //内容变化时，开启动画
            results.style.display="block";
            var h1=parseInt(getStyle(results,"height"));
            results.style.height=0;
            animate(results, {"height":h1}, 100, "linear",function(){
                results.setAttribute("style","display:block;")
            });
        }
    })
    EventUtil.addHandler(input,"blur",function(){             //搜索框失去焦点时
        if(reg.test(input.value)==false){                    //当value为空时，恢复默认值
            input.value = text;
            input.style.color = "#BBB";
        }
    })
    EventUtil.addHandler(search,"mouseleave",function(){       //鼠标离开搜索框范围，打开开关
        onOff=true;
    })
    EventUtil.addHandler(search,"mouseenter",function(){      //鼠标进入搜索框范围，关闭开关
        onOff=false;
    })
    EventUtil.addHandler(document,"click",function(){      //页面鼠标点击关闭搜索结果框
        if(onOff==true) {                                //当开关为打开，即鼠标已离开搜索框
            onOff=false;
            animate(hotSearch, {"height": 0}, 100, "linear", function () {  //关闭动画
                hotSearch.removeAttribute("style");
            })
            animate(results, {"height": 0}, 100, "linear", function () {
                results.removeAttribute("style");
            })
        }
    })
    EventUtil.addHandler(document,"keydown",function(event){      //切换焦点
        var event=EventUtil.getEvent(event);
        if(num==-1){                                    //用全局变量保存初始value
            inputText=input.value;
        }
        if (oUl_a.length != 0&&on==true) {
            if (event.keyCode == 38) {               //按键盘方向键让下拉列表中的a标签聚焦
                EventUtil.preventDefault(event);
                num--;
                if (num == -1) {
                    input.value=inputText;
                    input.focus();
                } else if (num < -1) {
                    num = oUl_a.length - 1;
                    oUl_a[num].focus();
                    input.value=inputText;
                }
                else {
                    oUl_a[num].focus();
                    input.value=getInnerText(oUl_span[num]);
                }
            }
            if (event.keyCode == 40) {
                EventUtil.preventDefault(event);
                num++;
                if (num == oUl_a.length) {
                    num = -1;
                    input.value=inputText;
                    input.focus();
                } else {
                    oUl_a[num].focus();
                    if(num==oUl_a.length-1){
                        input.value=inputText;
                    }else {
                        input.value=getInnerText(oUl_span[num]);
                    }
                }
            }
        }
    })
    EventUtil.addHandler(close[1],"click",function(){               //点击关闭
        animate(hotSearch, {"height": 0}, 100, "linear", function () {
            hotSearch.removeAttribute("style");
        })
    })
    EventUtil.addHandler(close[0],"click",function(){              //点击关闭
        animate(results, {"height": 0}, 100, "linear", function () {
            results.removeAttribute("style");
        })
    })
    EventUtil.addHandler(input,"keyup",function(){           //用jsonp来跨域搜索
        if(reg.test(input.value)){                  //当输入了内容时
            hotSearch.style.display = "none";
            results.style.display = "block";
            var script = document.createElement("script");   //新建script标签
            script.src = "https://ds.suning.cn/ds/his/new/-"+input.value+"-0-1_1-jsonp";
            document.body.appendChild(script);
            if(oScript.length>2){                         //删除多余script标签
                for(var i=1;i<oScript.length-1;i++){
                    document.body.removeChild(oScript[i]);
                }
            };
        }else {                                     //未输入内容时
            hotSearch.style.display = "block";
            results.style.display = "none";
        }
    })
    EventUtil.addHandler(input,"keydown",function(event){       //焦点在搜索框时按下键盘
        if(reg.test(input.value)) {
            var event=EventUtil.getEvent(event);
            if(event.keyCode==13) {                             //按下的是回车键
                window.open("https://search.suning.com/" + input.value + "/");   //新建窗口
                EventUtil.preventDefault(event);            //阻止冒泡，防止打开多个窗口
            }
        }
    })
    EventUtil.addHandler(searchSubmit,"click",function(){   //点击搜索按钮时
        window.open("https://search.suning.com/" + input.value + "/");    //新建窗口
    })
    EventUtil.addHandler(bannerBox,"mouseenter",function(){         //停止图片轮播，显示按钮
        clearInterval(timer);
        bannerBtnLeft.style.display="inline";
        bannerBtnRight.style.display="inline";
    });
    EventUtil.addHandler(bannerBox,"mouseleave",function(){         //开始图片轮播，隐藏按钮
        clearInterval(timer);
        timer = setInterval(function () {
            showBanner();
        }, 5000);
        bannerBtnLeft.style.display="none";
        bannerBtnRight.style.display="none";
    });
    EventUtil.addHandler(bannerBtnLeft,"click",function(){          //点击向左轮播图片
        if(onOFF1==true) {                      //当开关打开时，即上一个图片轮播动画结束
            onOFF1=false;                       //关闭此开关，表示开始新的图片轮播动画
            showBanner("left");
        };
    })
    EventUtil.addHandler(bannerBtnRight,"click",function(){         //点击向右轮播图片
        if(onOFF1==true) {
            onOFF1=false;
            showBanner();
        };
    })
    EventUtil.addHandler(bannerABox,"mouseover",function(event){  //轮播图索引标签移入时
        var event=EventUtil.getEvent(event);                     //事件委托
        var tar=EventUtil.getTarget(event);                     //获取到触发的a标签
        var index=getInnerText(tar);                           //获取到a标签索引
        var timer=setTimeout(function(){ //开启延时定时器,防止鼠标移动幅度大时导致图片切换不准确
            if(onOFF1==true) {                                    //当上一个轮播动画结束
                if (index.length == 1&&bannerIndex != index) {
                    //根据文本长度确保索引无误,且移入地不是同一个索引时
                    onOFF1=false;
                    preIndex = bannerIndex;                     //赋值索引
                    bannerIndex = index;
                    showBanner(false,false);                        //调用函数并传参
                }
            }else {
                clearTimeout(timer);
            }
        },100)
        EventUtil.addHandler(bannerABox,"mouseout",function(){
            clearTimeout(timer);             //当鼠标移入子元素或移出时，清除延时定时器
        })
    })
    EventUtil.addHandler(headline,"mouseenter",function(){      //停止头条滚动
        clearTimeout(headTimer);
    })
    EventUtil.addHandler(headline,"mouseleave",function(){          //开启头条滚动
        showHeadline();
    })
    EventUtil.addHandler(phbDiv,"mouseover",function(event){              //排行榜切换
        clearTimeout(phbDiv.timer);                     //清除延时定时器
        var event=EventUtil.getEvent(event);
        var tar=EventUtil.getTarget(event);
        if(tar.href!==undefined&&tar.className!==className2) {   //当目标索引可以切换时
            phbDiv.timer=setTimeout(function(){            //开启延时定时器，防止连续调用闪屏
                removeClass(phbA[phbIndex],className2);         //清除样式，增加样式，改索引值
                removeClass(phbUl[phbIndex],className2);
                phbIndex=Number(tar.getAttribute("data-index"));
                addClass(phbA[phbIndex],className2);
                addClass(phbUl[phbIndex],className2);
            },100)
        }
    })
    EventUtil.addHandler(appBox,"mouseenter",function(){
        appBtn[0].style.display="inline";
        appBtn[1].style.display="inline";
    })
    EventUtil.addHandler(appBox,"mouseleave",function(){
        appBtn[0].style.display="none";
        appBtn[1].style.display="none";
    })
    EventUtil.addHandler(appBtn[0],"click",function(){              //APP专享向前翻页
        if(appOnoff==true) {                           //开关打开时执行函数
            appOnoff=false;                       //关闭开关，防止多次点击错误
            var appL = parseInt(getStyle(appUl,"left"));        //获取left值
            if (appL === 0) {                             //当是第一页时，将最后一页移至前面
                appLi[6].style.left = "-1665px";
                appLi[7].style.left = "-1665px";
                appLi[8].style.left = "-1665px";
                animate(appUl, {"left":appL+=555},500, "linear", function () {  //开始动画
                    appLi[6].removeAttribute("style");      //重置样式，打开开关
                    appLi[7].removeAttribute("style");
                    appLi[8].removeAttribute("style");
                    appUl.style.left = "-1110px";
                    appOnoff=true;
                });
            } else {                                    //不是第一页时
                animate(appUl, {"left":appL+=555},500, "linear",function(){
                    appOnoff=true;
                });
            }
        }
        else {                                         //开关关闭则退出函数
            return false;
        }
    })
    EventUtil.addHandler(appBtn[1],"click",function(){              //APP专享向后翻页
        if(appOnoff==true) {
            appOnoff=false;
            var appL = parseInt(getStyle(appUl, "left"));
            if (appL == -1110) {
                appLi[0].style.left = "1665px";
                appLi[1].style.left = "1665px";
                appLi[2].style.left = "1665px";
                animate(appUl, {"left":appL-=555},500,"linear", function () {
                    appLi[0].removeAttribute("style");
                    appLi[1].removeAttribute("style");
                    appLi[2].removeAttribute("style");
                    appUl.style.left = "0px";
                    appOnoff=true;
                });
            } else {
                animate(appUl, {"left":appL-=555},500,"linear",function(){
                    appOnoff=true;
                });
            }
        }
        else {
            return false;
        }
    })
    EventUtil.addHandler(message,"mouseenter",function(){
        animate(sidebarSpan[0],{"left":-47},400,"linear");
        message.timer=setTimeout(function(){
            addClass(message,className3);
        },60)
    })
    EventUtil.addHandler(message,"mouseleave",function(){
        clearTimeout(message.timer);
        animate(sidebarSpan[0],{"left":0},400,"linear");
        removeClass(message,className3);
    })
    EventUtil.addHandler(finance,"mouseenter",function(){
        animate(sidebarSpan[1],{"left":-47},400,"linear");
        finance.timer=setTimeout(function(){
            addClass(finance,className3);
        },60)
    })
    EventUtil.addHandler(finance,"mouseleave",function(){
        clearTimeout(finance.timer);
        animate(sidebarSpan[1],{"left":0},400,"linear");
        removeClass(finance,className3);
    })
    EventUtil.addHandler(history1,"mouseover",function(){
        animate(sidebarSpan[2],{"left":-47},400,"linear");
        history1.timer=setTimeout(function(){
            addClass(history1,className3);
        },60)
    })
    EventUtil.addHandler(history1,"mouseleave",function(){
        clearTimeout(history1.timer);
        animate(sidebarSpan[2],{"left":0},400,"linear");
        removeClass(history1,className3);
    })
    EventUtil.addHandler(sign,"mouseenter",function(){
        animate(sidebarSpan[3],{"left":-47},400,"linear");
        sign.timer=setTimeout(function(){
            addClass(sign,className3);
        },60)
    })
    EventUtil.addHandler(sign,"mouseleave",function(){
        clearTimeout(sign.timer);
        animate(sidebarSpan[3],{"left":0},400,"linear");
        removeClass(sign,className3);
    })
    EventUtil.addHandler(service,"mouseenter",function(){
        animate(sidebarSpan[4],{"left":-73},400,"linear");
        service.timer=setTimeout(function(){
            addClass(service,className3);
        },60)
    })
    EventUtil.addHandler(service,"mouseleave",function(){
        clearTimeout(service.timer);
        animate(sidebarSpan[4],{"left":0},400,"linear");
        removeClass(service,className3);
    })
    EventUtil.addHandler(feedback,"mouseenter",function(){
        animate(sidebarSpan[5],{"left":-73},400,"linear");
        feedback.timer=setTimeout(function(){
            addClass(feedback,className3);
        },60)
    })
    EventUtil.addHandler(feedback,"mouseleave",function(){
        clearTimeout(feedback.timer);
        animate(sidebarSpan[5],{"left":0},400,"linear");
        removeClass(feedback,className3);
    })
    EventUtil.addHandler(code,"mouseenter",function(){
        removeClass(code,className3);                       //清空样式再增加样式
        clearTimeout(code.timer);
        addClass(code,className3);
        codeDiv.style.display="block";
        animate(codeDiv,{"left":-160},400,"linear");
    })
    EventUtil.addHandler(code,"mouseleave",function(){
        removeClass(code,className3);
        animate(codeDiv,{"left":0},400,"linear",function(){
            codeDiv.style.display="none";
        });
    })
    EventUtil.addHandler(codeDiv,"mouseenter",function(){
        removeClass(code,className3);
        clearTimeout(code.timer);
        addClass(code,className3);
        codeDiv.style.display="block";
        animate(codeDiv,{"left":-160},400,"linear",function(){
        });
    })
    EventUtil.addHandler(codeDiv,"mouseleave",function(){
        removeClass(code,className3);
        animate(codeDiv,{"left":0},400,"linear",function(){
            codeDiv.style.display="none";
        });
    })
    EventUtil.addHandler(toTop,"mouseenter",function(){
        animate(sidebarSpan[6],{"left":-73},400,"linear");
        toTop.timer=setTimeout(function(){
            addClass(toTop,className3);
        },60)
    })
    EventUtil.addHandler(toTop,"mouseleave",function(){
        clearTimeout(toTop.timer);
        animate(sidebarSpan[6],{"left":0},400,"linear");
        removeClass(toTop,className3);
    })
    EventUtil.addHandler(toTop,"click",function(){
        stopScrollChange(0,scrollChange);
    })
    EventUtil.addHandler(returnTop,"click",function(){
        stopScrollChange(0,scrollChange);
    })
    EventUtil.addHandler(floatUl,"click",function(event){       //左浮栏点击跳转
        clearTimeout(floatUl.timer)
        var event=EventUtil.getEvent(event);
        var tar=EventUtil.getTarget(event);
        floatUl.timer=setTimeout(function(){
            var index=Number(tar.getAttribute("data-index"));
            switch (index){
                case 0:
                    setfloatCss(0);
                    stopScrollChange(2050);
                    break;
                case 1:
                    setfloatCss(1);
                    stopScrollChange(2860);
                    break;
                case 2:
                    setfloatCss(2);
                    stopScrollChange(3350);
                    break;
                case 3:
                    setfloatCss(3);
                    stopScrollChange(3930);
                    break;
                case 4:
                    setfloatCss(4);
                    stopScrollChange(4520);
                    break;
                case 5:
                    setfloatCss(5);
                    stopScrollChange(4980);
                    break;
                case 6:
                    setfloatCss(6);
                    stopScrollChange(5560);
                    break;
                case 7:
                    setfloatCss(7);
                    stopScrollChange(6150);
                    break;
                case 8:
                    setfloatCss(8);
                    stopScrollChange(6750);
                    break;
                case 9:
                    setfloatCss(9);
                    stopScrollChange(7150);
                    break;
                case 10:
                    setfloatCss(10);
                    stopScrollChange(7540);
                    break;
            }
        },50)
    })
    EventUtil.addHandler(window,"scroll",scrollChange);             //绑定window.scroll事件
    EventUtil.addHandler(window,"scroll",function(){            //TopBar事件
        var top=getScrollTop();
        switch (true){
            case top<800 :
                topBar.style.display="none";
                sortListBox.style.display="block";
                removeClass(sort,className5);
                removeClass(search,className6);
                removeClass(regBar,className7);
                removeClass(topCart,className8);
                if(sortOnoff===false){
                    EventUtil.removeHandler(sort, "mouseenter", showSort);
                    EventUtil.removeHandler(sort, "mouseleave", hideSort);
                    sortOnoff=true;
                }
                break;
            case top>=800:
                topBar.style.display="block";
                sortListBox.style.display="none";
                addClass(sort,className5);
                addClass(search,className6);
                addClass(regBar,className7);
                addClass(topCart,className8);
                if(sortOnoff===true) {
                    EventUtil.addHandler(sort, "mouseenter", showSort);
                    EventUtil.addHandler(sort, "mouseleave", hideSort);
                    sortOnoff=false;
                }
                break;
        }
    })
    EventUtil.addHandler(window,"scroll",function showImg(){            //图片懒加载
        var top=getScrollTop();
        for(var i=0;i<lazyImg.length;i++){
            var h=document.documentElement.clientHeight||document.body.clientHeight;
            var t=getTop(lazyImg[i]);           //获取页面可视区高度和scrollTop值
            if(h+top+400>=t){                      //当图片进入可视区时
                lazyImg[i].setAttribute("src",lazyImg[i].getAttribute("lazy-src"));
                lazyImg[i].removeAttribute("lazy-src");     //设置src，删除多余属性和class
                removeClass(lazyImg[i],"lazyimg");
            }
        }
        if(lazyImg.length==0){                          //当所有图片加载完毕，移除此事件
            EventUtil.removeHandler(window,"scroll",showImg);
        }
    })
    EventUtil.addHandler(sortUl,"mouseover",function(event){       //商品分类移入样式
        clearTimeout(sortDetail.timer);                         //清除隐藏动画
        var event=EventUtil.getEvent(event);
        var tar=EventUtil.getTarget(event);                  //获取触发的节点
        var parent=tar.parentNode;                          //获取其父节点
        var top=getScrollTop()-174;
        if(top<0||top>600){top=0};
        sortUl.timer=setTimeout(function(){             //设置延时定时器，减缓快速移入移出
            if(parent.className=="index-list"){       //当父节点是ul，即移入了li时
                removeClass(sortLi[sortIndex],className2);
                var x=index(tar,sortLi);            //增加li的className
                getData(sortData["data"+x]);              //获取输出json数据
                addClass(sortLi[x],className2);         //增加class，设置样式
                addClass(sortDetail,className9);
                sortDetail.style.width="999px";
                sortDetail.style.top=top+"px";
                sortIndex=x;
            }else {                               //当父节点是li，即移入li的子标签时
                var x=index(parent,sortLi);       //增加li的className
                removeClass(sortLi[sortIndex],className2);
                getData(sortData["data"+x]);
                addClass(sortLi[x],className2);
                addClass(sortDetail,className9);
                sortDetail.style.width="999px";
                sortDetail.style.top=top+"px";
                sortIndex=x;
            }
        },100)
    })
    EventUtil.addHandler(sortUl,"mouseleave",function(){
        clearTimeout(sortUl.timer);
        sortDetail.timer=setTimeout(function(){             //开启隐藏动画
            removeClass(sortLi[sortIndex],className2);
            animate(sortDetail,{"width":0},400,"linear",function(){
                removeClass(sortDetail,className9);
                sortDetail.removeAttribute("style");
            })
        },100)
    })
    EventUtil.addHandler(sortDetail,"mouseenter",function(){
        clearTimeout(sortDetail.timer);                      //清除隐藏动画
    })
    EventUtil.addHandler(sortDetail,"mouseleave",function(){
        sortDetail.timer=setTimeout(function(){             //开启隐藏动画
            removeClass(sortLi[sortIndex],className2);
            animate(sortDetail,{"width":0},400,"linear",function(){
                removeClass(sortDetail,className9);
                sortDetail.removeAttribute("style");
            })
        },100)
    })
})
