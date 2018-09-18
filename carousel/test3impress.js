$(function(){
    var btn = $("li");
    var img =  document.getElementsByClassName ("img-all")[0] ;
    var pre = $(".arrow-left");
    var next = $(".arrow-right");
    var timer;

    //轮播
    show();

    //鼠标悬浮图片上和离开图片功能
    img.onmouseover = function(){
        clearInterval(timer);
    }
    img.onmouseout = function(){
        show();
    }


    //底部按钮选择图片
    $(btn).click(function () {
        clearInterval(timer);
        var index = this.getAttribute("data-index");
        imgcg(index);
        btncg();
        show();
    });
        
    
    //按钮与图片对应关系
    function imgcg(index1){
        left = -300 * index1 ;
        img.style.left = left +'px';
    }


    //选中按钮高亮显示
    function btncg(){
        for(var i=0; i< btn.length;i++){
             $(btn[i]).removeClass('current');
        }
        var index = -parseInt(img.style.left)/300;
        $(btn[index]).addClass('current');

        if(parseInt(img.style.left) == -1200){
            $(btn[0]).addClass("current");
        }
    }

    //"上一张"按钮功能
    $(pre).click(function () { 
        clearInterval(timer);
        var offset = parseInt(img.style.left);
        if(offset < 0 ){
            offset += 300;
            index = -offset/300;
            img.style.left = offset +'px';
            btncg(index);
        }
        show();
    });


    //"下一张"按钮功能
    $(next).click(function () { 
        clearInterval(timer);
        var offset = parseInt(img.style.left);
        if(offset > -900 ){
            offset -= 300;
            img.style.left = offset +'px';
            index = -offset/300;
            btncg(index);
        }
        show();
    });

    //test img change auto;
    /*var img_num = 0;
    var index_auto = 0;
    function show(){
        timer = setInterval(function (){
            img_num++;
            index_auto++;
            btncg(index_auto);
            img.style.left = -300*img_num +"px"; 
            img.style.transition = "1s";
            console.log(img_num);
            console.log(index_auto);

            //判断图片
            if(img_num > img.children.length-2){
                setTimeout(function(){
                    img_num = 0 ;
                    img.style.left = "0px";
                    img.style.transition = "0s";
                },1000);
            }

            //判断按钮
            if(index_auto > btn.length){
                index_auto = 0;
                btncg(0);
            }
        },2000);
    }*/


    //图片轮播
    function show(){
        timer = setInterval(function (){
            var left = parseInt(img.style.left);
            if(left >-1200){
                left -=300;
                img.style.left = left +'px';
                img.style.transition = "1s";
                var index = -left/300;
                btncg(index);
                setTimeout(function (){
                    if(left<=-1200){
                        img.style.transition = "0s";
                        img.style.left = "0px";
                        btncg(0);
                    }
                },1000);
            }else{
                img.style.left = "0px";
                img.style.transition = "0s";
                btncg(0);
            }
        },2000);
    }

    /*$(next).click(function (){ 
        clearInterval(timer);
        var index = this.getAttribute("data-index");
        var offet = -300 * index;
        img.style.left = offet + 'px';
        if(offet > -1200){
            offet = offet -300;
            img.style.left = offet + 'px';
        }
    });*/
});