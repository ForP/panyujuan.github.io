window.onload = function () {
    //get ID EL
    function $(id) {
        return document.getElementById(id);
    }

    //Befor ready
    var loading = $('loading');
    loading.style.display = 'none';

    //'Never Stop' animation
    var add = $('add'),
        oldImg = $('images').getElementsByTagName('img');

    var getImg = function (el, x, y) {
        var d = document.createElement('div'),
            img = document.createElement('img');

        d.className = 'new-divs';
        d.style.left = 50 * x +'%';
        d.style.top = 50 * y +'%';

        img.className = 'new-imgs';
        img.src = oldImg[Math.floor(Math.random()*oldImg.length)].src;

        img.onmousedown = function () {
            div(this.parentNode); //父亲包裹着图片一分为四
            this.parentNode.removeChild(this); //删除本身
        }
        d.appendChild(img);
        el.appendChild(d);
    };
    
    div(add);
    function div(el) {
        getImg(el, 0, 0);
        getImg(el, 1, 0);
        getImg(el, 0, 1);
        getImg(el, 1, 1);
    }
  
    //nav highlight
    var navLis = $('nav-list').children;
    for(var i = 0, len = navLis.length; i < len; i++) {
        navLis[i].onclick = function () {
            for(var j = 0; j < len; j++){
                navLis[j].className = '';
            }
            this.className = 'active';
        }
    }

    $('main').onscroll = function () {
        var scrollTop = $('main').scrollTop;
            mainChild = $('main').children;
        for(var i = 0, len = mainChild.length; i < len; i++){
            if (scrollTop + 300 >= mainChild[i].offsetTop) {
                console.log('scroll:'+scrollTop+'i:'+i+'offset:'+mainChild[i].offsetTop);
                for (var j = 0; j < len; j++) {
                    //navLis[0].className = '';
                    navLis[j].className = '';
                }
                navLis[i].className = 'active';
            }
        }
    }
}