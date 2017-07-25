//相册的js
;
(function($) {
    $.fn.staffGallery = function(option) {

        var defaultsId = {
            bigPrevId: "J_staff-bigPrev",
            bigNextId: "J_staff-bigNext",
            bigPicTitId: "J_staff-bigPicTit",
            bigPicTxtId: "J_staff-bigPicTxt",
            smallListWrapId: "J_staff-smallListWrap",
            containerId: "J_staff-conBox"


        }
        $.fn.staffGallery.defaults = {
            smallPrevId: "J_staff-smallPrev",
            smallNextId: "J_staff-smallNext",
            smallListInnerId: "J_staff-smallListInner",
            smallDisPrevClass: "staff-dis-smallPrev",
            smallDisNextClass: "staff-dis-smallNext",
            smallDataClass: "staff-smallItem",
            smallWrapId: "J_staff-smallWrap",
            bigPicTitClass: "staff-bigPicTit",
            arrowId: "J_staff-arrow",
            bigPicWrapId: "J_staff-bigWrap",
            bigPrevClass: "staff-bigPrev",
            bigNextClass: "staff-bigNext",
            bigPicWrapW: 666,
            bigPicWrapH: 483,
            fixLen: 4, //第几张固定
            viewLen: 6, //滚动可见的长度
            arrowH: 35,
            scroW: 103,
            dir: "left",
            isTitShow: true,
            isBigBtnShow: true //是否显示标题                                                  
        }
        var opts = $.extend(defaultsId, $.fn.staffGallery.defaults, option);
        var Index = 0,
            $smallPrev = $("#" + opts.smallPrevId),
            $smallNext = $("#" + opts.smallNextId),
            $container = $("#" + opts.containerId),
            $smallListInner = $("#" + opts.smallListInnerId),
            $arrow = $("#" + opts.arrowId),
            $bigPicWrap = $("#" + opts.bigPicWrapId);
        $smallListWrap = $("#" + opts.smallListWrapId);
        $smallWrap = $("#" + opts.smallWrapId)

        var nextDistance = opts.viewLen - opts.fixLen,
            $smallDataItems = $smallListInner.find("." + opts.smallDataClass);
        totalLen = $smallDataItems.length;
        var bigSrc,
            bigTit,
            zoomImg,
            $bigPicTit,
            $bigNext,
            $bigPrev,
            $bigPicTit,
            $bigPicTxt,
            $this = this;



        //获取图片信息和操作图片函数
        var changeBigImg = function(currIndex) {
           
            $smallDataItems.eq(currIndex).trigger('click');
            if (opts.isTitShow) {
                $bigPicTit.animate({ top: opts.bigPicWrapH }, 200, function() {
                    if ($.trim(bigTit) != "") {
                        $bigPicTxt.text(bigTit);
                        $bigPicTit.show();
                    } else {
                        $bigPicTit.hide();
                    }
                    $bigPicTit.stop(false, true).animate({ top: opts.bigPicWrapH - opts.arrowH })
                })


            }
        };


        //初始化
        var Init = function() {
            if (opts.dir == "left") {
                $smallWrap.css({ width: opts.bigPicWrapW});
            }
            $this.parent().css({ width: opts.bigPicWrapW - 12, height: opts.bigPicWrapH - 12})
            if (totalLen == 1) {
                $smallWrap.hide();

            }
            $bigPicWrap.css({ width: opts.bigPicWrapW, height: opts.bigPicWrapH,position: "relative" })
            
            // bigSrc = $smallDataItems.eq(Index).data("rel")["smallimage"];
            // zoomImg=$smallDataItems.eq(Index).data("rel")["largeimage"];
            bigTit = $smallDataItems.eq(Index).attr("data-title");
            // $this.attr({"src":bigSrc,"jqimg":zoomImg});
            if (opts.isTitShow) { //如果显示标题的话
                var $bigPicTxtDom = $('<div class="' + opts.bigPicTitClass + '" id="' + opts.bigPicTitId + '"><span></span><b id="' + opts.bigPicTxtId + '"></b></div>')
                $bigPicTxtDom.appendTo($bigPicWrap);
                $bigPicTit = $("#" + opts.bigPicTitId);
                $bigPicTxt = $("#" + opts.bigPicTxtId);
                $bigPicTit.css({ top: opts.bigPicWrapH - opts.arrowH }).hide();
                changeBigImg(Index)
            }
            if (opts.isBigBtnShow) { //如果显示大图按钮的话
                var $bigPrevBtn = $("<a href='#' class='" + opts.bigPrevClass + "' id='" + opts.bigPrevId + "'></a>");
                var $bigNextBtn = $("<a href='#' class='" + opts.bigNextClass + "' id='" + opts.bigNextId + "'></a>");
                $bigPrevBtn.appendTo($bigPicWrap);
                $bigNextBtn.appendTo($bigPicWrap);
            }
            $smallPrev.eq(Index).addClass(opts.smallDisPrevClass);
            if (totalLen <= opts.viewLen) {

            } else {
                if (opts.dir == "left") {
                    $smallListInner.width(totalLen * opts.scroW)
                } else {
                    $smallListInner.height(totalLen * opts.scroW)
                }
            }
            $smallListInner.css({ "position": "absolute", "overflow": "hidden" });
            if (opts.dir == "left") {
                $smallListWrap.css({ "width": opts.viewLen * opts.scroW, "position": "relative", "overflow": "hidden" });
            } else {
                $smallListWrap.css({ "height": opts.viewLen * opts.scroW, "position": "relative", "overflow": "hidden" });
            }



        };
        Init()

        //处理index 范围的函数
        var slideIndexChange = function(currIndex, Dir) {
            if (Dir == "left") {
                if (totalLen < opts.viewLen) {
                    $arrow.stop(false, true).animate({ left: currIndex * opts.scroW }, 200);
                    $smallListInner.animate({ left: 0 * opts.scroW })
                } else {
                    if (currIndex >= 0 && currIndex <= opts.fixLen - 1) { //0-3
                        $arrow.stop(false, true).animate({ left: currIndex * opts.scroW }, 200);
                        $smallListInner.animate({ left: 0 * opts.scroW })
                    } else if (currIndex > (opts.fixLen - 1) && currIndex < (totalLen - nextDistance)) { //4

                        $arrow.stop(false, true).animate({ left: (opts.fixLen - 1) * opts.scroW }, 200);
                        $smallListInner.animate({ left: -(currIndex - opts.fixLen + 1) * opts.scroW })
                    } else if (currIndex >= (totalLen - nextDistance)) { //5-7  

                        $arrow.stop(false, true).animate({ left: (opts.viewLen - (totalLen - currIndex)) * opts.scroW }, 200);
                        $smallListInner.animate({ left: -(totalLen - opts.viewLen) * opts.scroW })
                    }
                }
            } else if (Dir == "top") {
                if (totalLen < opts.viewLen) {
                    $arrow.stop(false, true).animate({ top: currIndex * opts.scroW }, 200);
                    $smallListInner.animate({ left: 0 * opts.scroW })
                } else {
                    if (currIndex >= 0 && currIndex <= opts.fixLen - 1) { //0-3
                        $arrow.stop(false, true).animate({ top: currIndex * opts.scroW }, 200);
                        $smallListInner.animate({ top: 0 * opts.scroW })
                    } else if (currIndex > (opts.fixLen - 1) && currIndex < (totalLen - nextDistance)) { //4
                        $arrow.stop(false, true).animate({ top: (opts.fixLen - 1) * opts.scroW }, 200);
                        $smallListInner.animate({ top: -(currIndex - opts.fixLen + 1) * opts.scroW })
                    } else if (currIndex >= (totalLen - nextDistance)) { //5-7   
                        $arrow.stop(false, true).animate({ top: (opts.viewLen - (totalLen - currIndex)) * opts.scroW }, 200);
                        $smallListInner.animate({ top: -(totalLen - opts.viewLen) * opts.scroW })
                    }
                }
            }
        }

        //单击prev按钮的事件函数
        var prevBtnHander = function(currIndex) {
            if (currIndex != totalLen - 1) {
                $smallNext.removeClass(opts.smallDisNextClass);
            }
            if (currIndex == 0) {
                $smallPrev.addClass(opts.smallDisPrevClass);
            }
            slideIndexChange(Index, opts.dir);

            changeBigImg(Index)
        };
        //单击next按钮的事件函数
        var NextBtnHander = function(currIndex) {
            if (Index != 0) {
                $smallPrev.removeClass(opts.smallDisPrevClass);
            }
            if (Index == (totalLen - 1)) {
                $smallNext.addClass(opts.smallDisNextClass)
            }

            if (Index <= opts.fixLen - 1) {
                if (opts.dir == "left") {
                    $arrow.stop(false, true).animate({ left: "+=" + opts.scroW }, 200)
                } else {
                    $arrow.stop(false, true).animate({ top: "+=" + opts.scroW }, 200)
                }
            } else {
                if ((totalLen - Index - nextDistance) <= 0) {
                    if (opts.dir == "left") {
                        $arrow.stop(false, true).animate({ left: "+=" + opts.scroW }, 200);
                    } else {
                        $arrow.stop(false, true).animate({ top: "+=" + opts.scroW }, 200);
                    }
                } else {
                    if (opts.dir == "left") {
                        $smallListInner.animate({ left: -(Index - opts.fixLen + 1) * opts.scroW })
                    } else {
                        $smallListInner.animate({ top: -(Index - opts.fixLen + 1) * opts.scroW })
                    }

                }
            }
            changeBigImg(Index)

        };


        //单击小图的左按钮  
        $smallPrev.bind("click", function() {
            if (Index == 0) {
                return false }
            Index--;
            prevBtnHander(Index)
            return false
        });


        //单击小图的右按钮  
        $smallNext.bind("click", function() {
            if (Index == (totalLen - 1)) {
                return false }
            Index++;
            NextBtnHander(Index);
            return false;
        });
        $smallDataItems.each(function() {
            $(this).bind("click", function() {
                var lastIndex = Index
                Index = $smallDataItems.index(this);
                if (Index == 0) { $smallPrev.addClass(opts.smallDisPrevClass); }
                if (Index == totalLen - 1) { $smallNext.addClass(opts.smallDisNextClass) }
                if (Index != 0) { $smallPrev.removeClass(opts.smallDisPrevClass); }
                if (Index != totalLen - 1) { $smallNext.removeClass(opts.smallDisNextClass) }
                var distanceIndex = Math.abs(lastIndex - Index);
                // changeBigImg(Index);
                slideIndexChange(Index, opts.dir);
                return false;
            })
        })

        if (opts.isBigBtnShow && totalLen != 1) {
            $bigNext = $("#" + opts.bigNextId);
            var bigNextH = $bigNext.height();
            $bigPrev = $("#" + opts.bigPrevId);
            var bigPrevH = $bigPrev.height();
            $bigNext.css("top", (opts.bigPicWrapH - bigNextH) / 2);
            $bigPrev.css("top", (opts.bigPicWrapH - bigPrevH) / 2)
                //单击大图的右按钮
            $bigNext.bind("click", function() {
                    Index++;
                    if (Index != 0) { $bigPrev.show(); }
                    if (Index == totalLen - 1) { $(this).hide() }
                    NextBtnHander(Index)
                    return false;
                })
                //单击大图的左按钮
            $bigPrev.bind("click", function() {

                Index--;
                if (Index != totalLen - 1) { $bigNext.show(); }
                if (Index == 0) { $(this).hide() }
                prevBtnHander(Index);
                return false
            });
            //大图 $bigWrap hover的时候的效果
            $bigPicWrap.bind("mouseover", function(event) {
                var relateElem = event.relatedTarget;
                if ($(relateElem).closest($bigPicWrap).length > 0) {
                    return;
                } else {
                    if (Index == totalLen - 1) {
                        $bigPrev.stop(false, true).fadeIn();
                    } else if (Index == 0) {
                        $bigNext.stop(false, true).fadeIn()
                    } else {
                        $bigPrev.stop(false, true).fadeIn();
                        $bigNext.stop(false, true).fadeIn()
                    }
                }
            }).bind("mouseout", function(event) {
                var relateElem = event.relatedTarget;
                if ($(relateElem).closest($bigPicWrap).length > 0) {
                    return;
                } else {
                    $bigPrev.stop(false, true).fadeOut();

                    $bigNext.stop(false, true).fadeOut()
                }

            });
        }

    }
})(jQuery);
(function($) {
    $.fn.bannerSlider = function(options) {
        var defaults = {
            width: 950,
            height: 355,
            auto: true,
            effect: "slider",
            Pause: 3000,
            animTime: 250,
            zIndex: 10,
            parentClass: "cs-bannerWrap",
            pagination: {
                show: true,
                evtType: "click",
                className: "banner-numlist"
            },
            btn: {
                show: true,
                dynamic: true
            },
            describe: {
                show: true,
                left: 0,
                bottom: 0
            }
        };

        var opts = $.extend(true, defaults, options),
            $this = this;
        var Index = 0,
            $this = this,
            len,
            isLock = false,
            animDir = 1,
            Timer = null,
            isFirst = true,
            effectArray = ["slider", "fade"],
            isIE6 = !-[1, ] && !window.XMLHttpRequest,
            animationWay;
        var $prevBtn, $nextBtn, $pagination, $pagination_lis, $slider_lis, $parent, $describe;
        $slider_lis = this.children("li");
        $parent = this.parent();
        len = $slider_lis.length;

        //传进来的效果
        function getAnimWay(effect) {
            try {
                if (effect.constructor !== String) {
                    throw new Error(effect + "must be String");
                } else {
                    var index = $.inArray(effect, effectArray)
                    if (index >= 0) {
                        animWayInit(effect);
                        return effect;
                    } else {
                        alert(effect + " effects is not defined in the plugin");
                        return false;
                    }
                }
            } catch (e) {
                alert(e.message)
            }

        };

        function animWayInit(effect) {
            if (effect == effectArray[0]) {
                $slider_lis.css("position", "absolute").eq(Index).css({ zIndex: opts.zIndex, display: "block" }).siblings().css({ zIndex: opts.zIndex - 1 }).hide();

            } else if (effect == effectArray[1]) {
                $slider_lis.css({ position: "absolute", opacity: 0, zIndex: opts.zIndex - 1 }).eq(Index).css("zIndex", opts.Index).animate({ "opacity": 1 });
                if (isIE6) {
                    $slider_lis.css("display", "none").eq(Index).css("display", "block")
                }
            }
        }

        function btnInit() {
            if (opts.btn.show) {
                $prevBtn = $('<a href="#" class="dir-btn banner-ui-prev" style="display:none"></a>');
                $nextBtn = $('<a href="#" class="dir-btn banner-ui-next" style="display:none"></a>');
                $prevBtn.css("zIndex", opts.zIndex + 1).addClass("banner-ui-prev");
                $nextBtn.css("zIndex", opts.zIndex + 1).addClass("banner-ui-next");

                $prevBtn.appendTo($parent);
                $nextBtn.appendTo($parent);
                if (opts.btn.dynamic) {
                    $prevBtn.hide();
                    $nextBtn.hide();
                } else {
                    $prevBtn.show();
                    $nextBtn.show();
                }
                $prevBtn.bind("mouseover", thisMouseover).bind("mouseout", thisMouseout).bind("click", prevBtnScroll);
                $nextBtn.bind("mouseover", thisMouseover).bind("mouseout", thisMouseout).bind("click", nextBtnScroll);
            }
        };

        function thisMouseover(event) {
            clearTimeout(Timer);
            var relateElem = event.relatedTarget;
            if ($(relateElem).closest($parent).length > 0) {
                return;
            } else {
                if (opts.btn.dynamic) {
                    $prevBtn.stop(false, true).fadeIn();
                    $nextBtn.stop(false, true).fadeIn();
                }
                isLock = true;
                animDir = 1;
            }
        };

        function thisMouseout(event) {
            var relateElem = event.relatedTarget;
            if ($(relateElem).closest($parent).length > 0) {
                return;
            } else {

                if (opts.btn.dynamic) {
                    $prevBtn.stop(false, true).fadeOut();
                    $nextBtn.stop(false, true).fadeOut();
                }
                isLock = false;
                isFirst = true;
                animDir = 1;
                beginStart()

            }
        }

        function prevBtnScroll() {
            if (!$this.is(":animated")) {
                clearTimeout(Timer)
                Index--;
                animDir = 0;
                beginStart();
            }
            return false;
        }

        function nextBtnScroll() {
            if (!$this.is(":animated")) {
                clearTimeout(Timer)
                Index++;
                animDir = 1;
                beginStart()
            }
            return false;
        }

        function paginationInit() {
            var strLis = "";
            if (opts.pagination.show) {
                if (len > 1) {
                    $pagination = $('<ul></ul>');
                    $pagination.addClass(opts.pagination.className).css({ "zIndex": opts.zIndex + 1, "position": "absolute" })
                    for (var i = 0; i < len; i++) {
                        strLis += "<li><span>" + (i + 1) + "</span></li>";
                    }
                    $pagination.append(strLis);
                    $pagination.appendTo($parent)
                    $pagination_lis = $pagination.find("li");
                    $pagination_lis.eq(Index).addClass("oncurr");
                    $pagination_lis.each(function() {
                        $(this).bind(opts.pagination.evtType, paginationEvt);
                        $(this).bind("mouseover", thisMouseover).bind("mouseout", thisMouseout);

                    })
                }
            }
        };

        function paginationEvt() {
            var prevIndex = Index;
            isLock = true;
            clearTimeout(Timer);
            Index = $pagination_lis.index(this);
            if (prevIndex < Index) {
                animDir = 1;
                beginStart()
            } else if (prevIndex > Index) {
                animDir = 0;
                beginStart()
            } else {
                return
            }
        }

        function descInit() {
            if (opts.describe.show) {
                $describe = $('<div class="banner-ui-desc"></div>');
                $describe.appendTo($parent).css({ zIndex: opts.zIndex + 1, position: "absolute", left: opts.describe.left, bottom: opts.describe.bottom });
                if ($.trim($slider_lis.eq(Index).attr("data-title")) == "") {
                    $describe.hide()
                } else {
                    $describe.text($slider_lis.eq(Index).attr("data-title"));
                }
                $describe.bind("mouseout", thisMouseout)
            }
        };

        function switchAnimDir(animDir, animationWay) {
            if (animationWay == "slider") {
                var childrenAnimW = null,
                    parentAnimW = null;
                switch (animDir) {
                    case 0: //左按钮
                        childrenAnimW = -opts.width; //子元素右移
                        parentAnimW = opts.width; //父元素左移动
                        slideScroll(childrenAnimW, parentAnimW);
                        break;
                    case 1: //右按钮
                        childrenAnimW = opts.width;
                        parentAnimW = -opts.width;
                        slideScroll(childrenAnimW, parentAnimW)
                        break;
                }
            } else if (animationWay == "fade") {
                $slider_lis.css("zIndex", opts.zIndex - 1).stop(true).animate({ opacity: 0 }).eq(Index).css("zIndex", opts.zIndex).stop(true).animate({ opacity: 1 });
                if (isIE6) {
                    $slider_lis.css("display", "none").eq(Index).css("display", "block")
                }
            }



        };

        function slideScroll(childrenAnimW, parentAnimW) {
            $slider_lis.eq(Index).css({ left: childrenAnimW, zIndex: opts.zIndex, display: "block" });
            $this.stop(false, true).animate({ left: parentAnimW }, opts.animTime, function() {
                $slider_lis.eq(Index).css("left", 0).siblings().css({ zIndex: opts.zIndex - 1, display: "none" });
                $(this).css("left", 0);
            })
        };

        function beginStart() {
            if (Index < 0) {
                Index = len - 1;
            } else if (Index == len) {
                Index = 0
            }
            scrolling();
        };

        function scrolling() {
            if (isFirst) {
                isFirst = false
            } else {
                switchAnimDir(animDir, animationWay)
                if (opts.pagination.show) {

                    $pagination_lis.eq(Index).addClass("oncurr").siblings().removeClass("oncurr")
                }
            }
            if (opts.describe.show) {
                if ($.trim($slider_lis.eq(Index).attr("data-title")) == "") {
                    $describe.fadeOut();
                } else {
                    $describe.text($slider_lis.eq(Index).attr("data-title")).fadeIn()
                }
            }
            if (!isLock && opts.auto) {
                Timer = setTimeout(function() {
                    Index++;
                    beginStart();
                }, opts.Pause)
            }
        };
        var Init = function() {
            //初始化父元素
            $parent.addClass(opts.parentClass).css({ width: opts.width, height: opts.height, position: "relative", overflow: "hidden" });
            //初始化ul
            $this.css({ width: opts.width, height: opts.height, position: "relative" });
            //获取效果的方式
            if (len > 1) {
                animationWay = getAnimWay(opts.effect);
                btnInit();
                paginationInit();
                descInit();
                $this.bind("mouseover", thisMouseover);
                $this.bind("mouseout", thisMouseout);
                beginStart()
            }
        };
        Init();
    }
})(jQuery);


;
(function($) {

    function LoadImage(ImgD, width, height, t) {
        var smallWidth = $(ImgD).width();
        var smallHeight = $(ImgD).height();
        //    alert(smallWidth+":"+width+"|"+smallHeight+":"+height);
        var iwidth = width; //定义允许图片宽度
        var iheight = height; //定义允许图片高度
        if (smallWidth > 0 && smallHeight > 0) {

            if (smallWidth / smallHeight >= iwidth / iheight) {
                if (smallWidth > iwidth) {
                    $(ImgD).width(iwidth).height((smallHeight * iwidth) / smallWidth).css("padding", Math.floor(Math.abs((iheight - $(ImgD).height()) / 2)) + "px 0px");
                } else {
                    $(ImgD).width(smallWidth).height(smallHeight).css("padding", Math.floor(Math.abs((iheight - $(ImgD).height()) / 2)) + "px " + Math.floor(Math.abs((iwidth - $(ImgD).width()) / 2)) + "px");
                }
            } else {
                if (smallHeight > iheight) {
                    $(ImgD).width((smallWidth * iheight) / smallHeight).height(iheight).css("padding", "0px " + Math.floor(Math.abs((iwidth - $(ImgD).width()) / 2)) + "px");
                } else {
                    $(ImgD).width(smallWidth).height(smallHeight).css("padding", Math.floor(Math.abs((iheight - $(ImgD).height()) / 2)) + "px " + Math.floor(Math.abs((iwidth - $(ImgD).width()) / 2)) + "px");
                }
            }
        }
    }
    $.fn.LoadImage = function(options) {
        var opt = options;
        return this.each(function(index, el) {
            LoadImage(el, opt.width, opt.height);
        })
    }
})(jQuery)





$(function() {
    $("#J_banner").bannerSlider({
        width: "100%", //宽 (如果100%的时候请传入字符串)
        height: 368, //高
        auto: true, //是否能自动滚
        effect: "fade", //效果
        Pause: 3000, //停顿时间-两个动画滚动间隔的时间
        animTime: 500,
        //一张图滚动的时间
        zIndex: 10, //设置层级相互遮盖
        parentClass: "h-banner",
        pagination: {
            show: true,
            className: "banner-numlist"
        },
        btn: {
            show: true,
            dynamic: true //是否有鼠标移动上去显示箭头的效果
        },
        describe: {
            show: false
        }
    });
})
$(function() {
    $("table[data-roler='colortbl']").find('th:odd').addClass("odd");
});
