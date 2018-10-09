skcrs($(".crs-pic"), $(".crs-btn"), 180);
    function skcrs(obj, btn, imgW) {
        var index = 1,
            t = 3000,  //delay time
            timer,      //setInterval
            pre,        //pre btn
            next,       //next btn
            //btn = $(".crs-btn"),        //menu btn
            offset,       //
            //imgW = 180,   //a img width
            left,       //img position
            //obj = $('.crs-pic'),        //operate object
            lastPos = -imgW * (obj.children().length - 2),
            firstPos = -imgW;

        btn.children().on("click", function (e) {
            clearInterval(timer);
            clickIndex = $(e.target).index() + 1;
            offset = (index - clickIndex) * imgW;
            index = clickIndex;
            imgChange(offset);
            btnChange();
            start();
        });

        obj
        .on("mouseover", function(){
            clearInterval(timer);
        })
        .on("mouseout", function(){
            start();
        })
        
        function imgChange(offset) {
            left = parseInt(obj.css("left"));
            left += offset;
            obj.css({transition: ".3s", left: left + "px"});
            setTimeout(function(){
                if (left < lastPos) {
                    obj.css({transition: "0s", left: (firstPos)+ "px"});
                }
            }, 300);
            if (left > firstPos) {
                obj.css({transition: "0s", left: (lastPos) + "px"});
            }
        }
        
        function autoPlay() {
            nextBtn();
        }

        function btnChange() {
            btn.children().filter(".crs-circle").removeClass("crs-circle");
            btn.children().eq(index-1).addClass("crs-circle");
        }
    
        function nextBtn() {
            index++;
            if (index > (obj.children().length - 2)) {
                index = 1;
            }
            imgChange(-imgW);
            btnChange();
        }
    
        function preBtn() {
            index--;
            if (index < 0) {
                index = (obj.children().length - 2);
            }
            imgChange(imgW);
            btnChange();
        }

        function start() {
            timer = setInterval(autoPlay, t);
        }
        start();
    }