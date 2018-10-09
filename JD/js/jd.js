$(function() {
    $("#close-ad i").on("click", function () {
        $("#close-ad").addClass("none");
    });

    var selectArea = function () {
        var area = document.getElementById("show-area"),
            areaContent = document.getElementById("area-content"),
            clSelect = area.getElementsByTagName("a");
        area.onclick = function (e) {
            var e = e || window.event,
                target = e.target || e.srcElement;
            if (target.nodeName.toLocaleLowerCase() === "a") {
                for (let i = 0; i < area.children.length; i++) {
                    clSelect[i].classList.remove("selected");
                }
                target.classList.add("selected");
                areaContent.innerHTML = target.innerHTML;
            }
        }
    }
    selectArea();

    var showMenu = function () {
        var sub = $('#sub'),
            activeNav,
            activeSub,
            timer,
            mouseInSub = false,
            mouseTrack = [];

        sub
        .on('mouseenter',function () {
            mouseInSub = true;
        })
        .on('mouseleave',function () {
            mouseInSub = false;
        });

        //获取并储存鼠标位置
        var moveHandler = function (e) {
            mouseTrack.push({
                x: e.pageX,
                y: e.pageY
            });

            //只需保存当前位置以及上一次位置
            if(mouseTrack.length > 3) {
                //shift() 移除数组第一个元素
                mouseTrack.shift();
            }
        }

        $('#nav')
        .on('mouseenter', function () {
            sub.removeClass('none');

            //鼠标在菜单中的位置跟踪，在鼠标移除菜单时，需解绑movehandler，以免影响其他元素；
            $(document).bind('mousemove', moveHandler);
        })
        .on('mouseleave', function () {
            sub.addClass('none');

            if(activeNav) {
                activeNav.removeClass('active');
                activeNav = null;
            }

            if(activeSub) {
                activeSub.addClass('none');
                activeSub = null;
            }

            $(document).unbind('mousemove', moveHandler);
        })
        .on('mouseenter', 'li', function (e) {
            if(!activeNav) {
                activeNav = $(e.target);
                activeNav.addClass('active');
                activeSub = $('#' + activeNav.data('id'));
                activeSub.removeClass('none');
                return;
            }

            //切换频繁触发的时候，子菜单层叠切换；利用debounce去抖(定时器影响)；所以在没用到之前清除计时器
            if(timer) {
                clearTimeout(timer);
            }

            //判断切换菜单是否需要延迟
            var curMousePos = mouseTrack[mouseTrack.length - 1],  //当前鼠标位置
                lastMousePos = mouseTrack[mouseTrack.length - 2], //上一次鼠标位置
                delay = needDelay(sub, curMousePos, lastMousePos); //传入sub，需要获取子菜单上下边缘坐标
            if (delay) {
                timer = setTimeout(function () {
                    if(mouseInSub) {
                        return;
                    }else {
                        //一个li进入另一个li时
                        activeNav.removeClass('active');
                        activeSub.addClass('none');
                        //当前的li
                        activeNav = $(e.target);
                        activeNav.addClass('active');
                        activeSub = $('#' + activeNav.data('id'));
                        activeSub.removeClass('none');
                    }
                    timer = null;
                }, 300);
            }else {
                //如果鼠标不在三角形内，则直接切换菜单；
                //一个li进入另一个li时
                activeNav.removeClass('active');
                activeSub.addClass('none');
                //当前的li
                activeNav = $(e.target);
                activeNav.addClass('active');
                activeSub = $('#' + activeNav.data('id'));
                activeSub.removeClass('none');

                //与上面代码效果相同
                /*var preActiveNav = activeNav,
                    preActiveSub = activeSub;
                activeNav = $(e.target);
                activeSub = $('#' + activeNav.data('id'));

                preActiveNav.removeClass('active');
                preActiveSub.addClass('none');

                activeNav.addClass('active');
                activeSub.removeClass('none');*/
            }
        })


        //预判用户鼠标移动
        //向量是否为相同方向，相同方向则当前鼠标在三角形内，否则在三角形外
        function sameSign(a, b) {
            return (a ^ b) >= 0; //利用异或判断
        }

        //定义向量：重点坐标-起点坐标
        function vector(a, b) {
            var x,
                y;
            return ( {
                x: b.x - a.x,
                y: b.y - a.y
            })
        }
        
        //向量叉乘公式：v1*v2 = |v1||v2|sinθ；根据θ判断方向
        function vectorProduct(v1, v2) {
            return v1.x * v2.y - v1.y * v2.x;
        }

        //鼠标移动三角形判断
        function isTrangle(p, a, b, c) {
            var pa = vector(p, a),
                pb = vector(p, b),
                pc = vector(p, c), //三个向量

                d1 = vectorProduct(pa, pb),
                d2 = vectorProduct(pb, pc),
                d3 = vectorProduct(pc, pa); //叉乘向量的值（包括大小和反向），这里只需要方向

            return sameSign(d1, d2) && sameSign(d2, d3);
        }

        //获取子菜单上下边缘坐标，并判断当前鼠标是否在三角形内
        function needDelay(el, curMousePos, lastMousePos) {
            var offset = el.offset(),
                subTopPos = {
                    x: offset.left,
                    y: offset.top
                },
                subBotPos = {
                    x: offset.left,
                    y: offset.top + el.height()
                };

            return isTrangle(curMousePos, lastMousePos, subTopPos, subBotPos); //返回true/false
        }
    }
    showMenu();

    $(".symbol").hover(function() {
        $(".report-hd-active").css({left: "9px"});
        $(".report-cx").show();
        $(".report-gg").hide();
    });

    $(".gonggao").hover(function() {
        $(".report-hd-active").css({left: "55px"});
        $(".report-cx").hide();
        $(".report-gg").show();
    });

    function lifeDown() {
        var index;
        $(".life")
        .on("mouseover mouseout", ".life-dropdown", function () {
            index = $(this).index();
            $(".life-dropdown").css({top: "-37px"}).filter(".life-show-active").removeClass("life-show-active");
            $(this).addClass("life-show-active");
            $(".life-show").addClass("none").eq(index).removeClass("none");
            $(".huafei-ct").addClass("none");
            $(".life-show").eq(index).find(".huafei-ct").eq(0).removeClass("none");
            $(".life-show").eq(index).find(".huafei-hd li").eq(0).addClass("life-active");
        })
        .on("click", ".huafei-del", function () {
            $(".life-show").addClass("none");
            $(".life-dropdown").css({top: "0"}).filter(".life-show-active").removeClass("life-show-active");
        })
        .on("mouseover mouseout", ".huafei-hd li", function () {
            var subIndex = $(this).index();
            $(".huafei-hd li").filter(".life-active").removeClass("life-active");
            $(this).addClass("life-active");
            $(".huafei-ct").addClass("none");
            $(".life-show").eq(index).find(".huafei-ct").eq(subIndex).removeClass("none");
            //$(".huafei-ct").addClass("none").eq(subIndex).removeClass("none");
        });

        $(window).on("scroll", function () {
            if ($(window).scrollTop() > $(window).innerHeight()) {
                $("#search").addClass("search");
                $(".search-logo").removeClass("none");
                $(".search-bar").css({top: "4px"});
                $("#search-inp").css({backgroundColor: "#ccc"});
            }else {
                $("#search").removeClass("search");
                $(".search-logo").addClass("none");
                $(".search-bar").css({top: "25px"});
                $("#search-inp").css({backgroundColor: "#fff"});
            }
        });
    }
    lifeDown();

    function getDate() {
        var now = +new Date(),
            end = +new Date(2018, 9, 7),
            dVal = end - now,
            d = Math.floor(dVal/(1000*60*60*24)),
            h = Math.floor((dVal/(1000*60*60)%24)),
            min = Math.floor((dVal/(1000*60)%60)),
            s = Math.floor((dVal/1000%60));
        d = d>9? d:"0"+d;
        h = h>9? h:"0"+h;
        min = min>9? min:"0"+min;
        s = s>9? s:"0"+s;
        if (parseInt(dVal) <=0) {
            $(".cd-day span").html("00");
            $(".cd-hrs span")[0].innerHTML = "00";
            $(".cd-min span")[0].innerHTML = "00";
            $(".cd-sec span")[0].innerHTML = "00";
            $(".cd-hd").eq(3).html("抢购结束");
            clearInterval(cdTimer);
        }
        if (parseInt(d)<=0) {
            $(".cd-day").remove();
        }
        $(".cd-day span").html(d);
        $(".cd-hrs span")[0].innerHTML = h;
        $(".cd-min span")[0].innerHTML = min;
        $(".cd-sec span")[0].innerHTML = s;
    }
    getDate();
    var cdTimer = setInterval(getDate, 500); 

    //skcrs(move obj, a img width, time, bottom btn, bottom highlight className, preBtn, nextBtn);
    skcrs($(".cp-lists"), 390, 10000, $(".chan1-cpbtn"), "bdshow-active");
    skcrs($(".chan1-lists"), 390, 3000, $(".chan1-cirbtn"), "bdshow-active", $(".chan1-pre"), $(".chan1-next"));
    skcrs($(".slide-move"), 800, 60000, false, "undefined", $(".slide-pre"), $(".slide-next"));
    skcrs($("#pics"), 590, 5000, $(".btn-circle"), "btncir-active", $(".pre"), $(".next"));
    skcrs($(".crs-pic"), 180, 3000, $(".crs-btn"), "crs-circle");
    function skcrs(obj, imgW, t, btn, clsName, preArrow, nextArrow) {
        var index = 1,
            //t = 3000,  //delay time
            timer,      //setInterval
            //pre,        //pre btn
            //next,       //next btn
            //btn = $(".crs-btn"),        //menu btn
            offset,       //
            //imgW = 180,   //a img width
            left,       //img position
            //obj = $('.crs-pic'),        //operate object
            lastPos = -imgW * (obj.children().length - 2),
            firstPos = -imgW;

        if (btn) {
            btn.children()
            .on("mouseover", function (e) {
                clearInterval(timer);
                clickIndex = $(e.target).index() + 1;
                offset = (index - clickIndex) * imgW;
                index = clickIndex;
                imgChange(offset);
                if (btn) {
                    btnChange();
                }
                start();
            });
        }

        if (preArrow || nextArrow) {
            preArrow.on("click", function () {
                clearInterval(timer);
                preBtn();
                start();
            });
    
            nextArrow.on("click", function () {
                clearInterval(timer);
                nextBtn();
                start();
            });
        }

        obj
        .on("mouseover", function(){
            clearInterval(timer);
        })
        .on("mouseout", function(){
            start();
        });
        
        function imgChange(offset) {
            left = parseInt(obj.css("left"));
            left += offset;
            obj.css({transition: ".3s", left: left + "px"});
            setTimeout(function () {
                if (left < lastPos) {
                    obj.css({transition: "0s", left: (firstPos)+ "px"});
                }
            }, 300);
            setTimeout(function () {
                if (left > firstPos) {
                    obj.css({transition: "0s", left: (lastPos) + "px"});
                }
            }, 300);
        }
        
        function autoPlay() {
            nextBtn();
        }

        if (btn) {
            function btnChange() {
                btn.children().filter("."+clsName).removeClass(clsName);
                btn.children().eq(index-1).addClass(clsName);
            }
        }
    
        function nextBtn() {
            index++;
            if (index > (obj.children().length - 2)) {
                index = 1;
            }
            imgChange(-imgW);
            if (btn) {
                btnChange();
            }
        }
    
        function preBtn() {
            index--;
            if (index < 1) {
                index = (obj.children().length - 2);
            }
            imgChange(imgW);
            if (btn) {
                btnChange();
            }
        }

        function start() {
            timer = setInterval(autoPlay, t);
        }
        start();
    }

    function channelShow() {
        var index,
            subIndex,
            init = false;
        $(".chan1-bdhd").on("mouseover mouseout", "li", function (e) {
            index = $(this).index();
            $(".chan1-bdhd li").removeClass("bdhd-active");
            $(this).addClass("bdhd-active");
            $(".bdshow-box").addClass("none").eq(index).removeClass("none");
            if (!init) {
                for ( var i = 0; i < $(".bdshow-box li").length; i++) {
                    $(".bdshow-box").eq(i).find(".bdshow-btn li").eq(0).addClass("bdshow-active");
                }
                init = true;
                return;
            }
        });

        $(".bdshow-btn").on("mouseover mouseout", "li", function (e) {
            var L;
            if (!init) {
                $(".bdshow-box li").removeClass("bdshow-active");
            }
            subIndex = $(this).index();
            $(".bdshow-box").eq(index).find(".bdshow-btn li").removeClass("bdshow-active");
            $(this).addClass("bdshow-active");
            L = -subIndex * 350;
            $(".bdshow-move").css({left: L + "px"});
        })
    }
    channelShow();
});