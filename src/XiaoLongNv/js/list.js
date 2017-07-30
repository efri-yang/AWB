$(function() {
    (function() {
        var itemIndex = 0;

        var item1LoadEnd = false;
        var item1CurrPage = 0;
        var item1PageNum = 8;

        var item2LoadEnd = false;
        var item2CurrPage = 0;
        var item2PageNum = 8;


        var dropload = $('.pro-scroll-box').dropload({
            scrollArea: window,
            loadDownFn: function(me) {

                // 加载菜单一的数据
                if (itemIndex == '0') {

                    $.ajax({
                        type: 'GET',
                        // data:{page:item1CurrPage,num:item1PageNum},
                        url: 'http://wnworld.com/conn/bbgj.php',
                        dataType: 'json',
                        success: function(data) {
                            var data = {
                                "lists": [{
                                        "name": "BM001号-林霖琳琳琳",
                                        "pic": "upload/2.jpg",
                                        "url": "AnLiXiangQing.html",
                                        "score": "111",
                                        "rank": "111"
                                    },
                                    {
                                        "name": "BM001号-林霖琳琳琳",
                                        "pic": "upload/2.jpg",
                                        "url": "AnLiXiangQing.html",
                                        "score": "112",
                                        "rank": "111"
                                    }, {
                                        "name": "BM001号-林霖琳琳琳",
                                        "pic": "upload/2.jpg",
                                        "url": "AnLiXiangQing.html",
                                        "score": "113",
                                        "rank": "111"
                                    }, {
                                        "name": "BM001号-林霖琳琳琳",
                                        "pic": "upload/2.jpg",
                                        "url": "AnLiXiangQing.html",
                                        "score": "114",
                                        "rank": "111"
                                    }, {
                                        "name": "BM001号-林霖琳琳琳",
                                        "pic": "upload/2.jpg",
                                        "url": "AnLiXiangQing.html",
                                        "score": "115",
                                        "rank": "111"
                                    }, {
                                        "name": "BM001号-林霖琳琳琳",
                                        "pic": "upload/2.jpg",
                                        "url": "AnLiXiangQing.html",
                                        "score": "116",
                                        "rank": "111"
                                    }, {
                                        "name": "BM001号-林霖琳琳琳",
                                        "pic": "upload/2.jpg",
                                        "url": "AnLiXiangQing.html",
                                        "score": "117",
                                        "rank": "111"
                                    }, {
                                        "name": "BM001号-林霖琳琳琳",
                                        "pic": "upload/2.jpg",
                                        "url": "AnLiXiangQing.html",
                                        "score": "118",
                                        "rank": "111"
                                    }
                                ]
                            }
                            item1CurrPage++;
                            var result = "";
                            for (var i = 0; i < data.lists.length; i++) {
                                result += '<li><div class="pic"><img src="' + data.lists[i].pic + '"></div><div class="para-val"><p class="name">' + data.lists[i].name + '</p><p class="score">总积分：' + data.lists[i].score + '</p><p class="rank">总排名：' + data.lists[i].rank + '</p></div><span class="btn-buy" data-url="' + data.lists[i].url + '"></span></li>'
                            }


                            setTimeout(function() { //开发记得删除setTimeout函数
                                $("#J_tab-zjf").append(result);

                                me.resetload();
                                if (!data.lists.length || data.lists.length < item1PageNum) {
                                    item1LoadEnd = true;
                                    // 锁定
                                    me.lock();
                                    // 无数据
                                    me.noData();
                                }
                            }, 2000)



                        },
                        error: function(xhr, type) {
                            console.dir('Ajax error!');
                            // 即使加载出错，也得重置
                            me.resetload();
                        }
                    });
                    // 加载菜单二的数据
                } else if (itemIndex == '1') {
                    $.ajax({
                        type: 'GET',
                        // data:{page:item1CurrPage,num:item1PageNum},
                        url: './',
                        dataType: 'json',
                        success: function(data) {

                            var data = {
                                "lists": [{
                                        "name": "BM001号-林霖琳琳琳",
                                        "pic": "upload/2.jpg",
                                        "url": "AnLiXiangQing.html",
                                        "score": "xx1",
                                        "rank": "111"
                                    },
                                    {
                                        "name": "BM001号-林霖琳琳琳",
                                        "pic": "upload/2.jpg",
                                        "url": "AnLiXiangQing.html",
                                        "score": "xx2",
                                        "rank": "111"
                                    }, {
                                        "name": "BM001号-林霖琳琳琳",
                                        "pic": "upload/2.jpg",
                                        "url": "AnLiXiangQing.html",
                                        "score": "xx3",
                                        "rank": "111"
                                    }, {
                                        "name": "BM001号-林霖琳琳琳",
                                        "pic": "upload/2.jpg",
                                        "url": "AnLiXiangQing.html",
                                        "score": "114",
                                        "rank": "111"
                                    }, {
                                        "name": "BM001号-林霖琳琳琳",
                                        "pic": "upload/2.jpg",
                                        "url": "AnLiXiangQing.html",
                                        "score": "115",
                                        "rank": "111"
                                    }, {
                                        "name": "BM001号-林霖琳琳琳",
                                        "pic": "upload/2.jpg",
                                        "url": "AnLiXiangQing.html",
                                        "score": "116",
                                        "rank": "111"
                                    }, {
                                        "name": "BM001号-林霖琳琳琳",
                                        "pic": "upload/2.jpg",
                                        "url": "AnLiXiangQing.html",
                                        "score": "117",
                                        "rank": "111"
                                    }, {
                                        "name": "BM001号-林霖琳琳琳",
                                        "pic": "upload/2.jpg",
                                        "url": "AnLiXiangQing.html",
                                        "score": "118",
                                        "rank": "111"
                                    }
                                ]
                            }
                            item2CurrPage++;
                            var result = "";
                            for (var i = 0; i < data.lists.length; i++) {
                                result += '<li><div class="pic"><img src="' + data.lists[i].pic + '"></div><div class="para-val"><p class="name">' + data.lists[i].name + '</p><p class="score">总积分：' + data.lists[i].score + '</p><p class="rank">总排名：' + data.lists[i].rank + '</p></div><span class="btn-buy" data-url="' + data.lists[i].url + '"></span></li>'
                            }

                            setTimeout(function() {
                                $("#J_tab-rjf").append(result);

                                me.resetload();
                                if (!data.lists.length || data.lists.length < item2PageNum) {
                                    item2LoadEnd = true;
                                    // 锁定
                                    me.lock();
                                    // 无数据
                                    me.noData();

                                    //没有数据可以 me.$domDown
                                }
                            }, 2000)


                        },
                        error: function(xhr, type) {
                            console.dir('Ajax error!');
                            // 即使加载出错，也得重置
                            me.resetload();
                        }
                    });

                }
            }
        });






        $(".pro-tab-hd a[data-toggle='tab']").click(function(event) {
            event.preventDefault();
            itemIndex = $(".pro-tab-hd a[data-toggle='tab']").index(this);
            $(this).tab('show');
            dropload.resetload();
        });



        $('#J_tab-zjf-hd').on('showntab', function(e) {
            var $this = $(this);
            if (!item1LoadEnd) {
                // 解锁
                dropload.unlock();
                dropload.noData(false);
            } else {
                // 锁定
                dropload.lock('down');
                dropload.noData();
            }
        });


        $('#J_tab-rjf-hd').on('showntab', function(e) {
            var $this = $(this);
            if (!item2LoadEnd) {
                // 解锁
                dropload.unlock();
                dropload.noData(false);
            } else {
                // 锁定
                dropload.lock('down');
                dropload.noData();
            }
        });

        $('#J_tab-zjf-hd').trigger("click");
    })();

    $proDia=$("#J_pro-dia-box").dialogs({
        afterShow:function(){
           $(window).on("load",function(){
                 var myScroll = new IScroll('#wrapper',{
                    scrollbars: true,
                    click:true
                });
           })
        }
    });
    $(document).on("click","span.btn-buy",function(){
        $proDia.show(function(){
                 //alert("xx")
        });
    });


    //
    $(".reduce").on("click",function(){
        alert("reduce");
    });
    $(".plus").on("click",function(){
        alert("plus")
    });
    

    




  

})