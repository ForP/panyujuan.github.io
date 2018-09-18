window.onload = function () {
    var loading = document.getElementById('loading');
    loading.style.display = 'none';

    var add = document.getElementById('add'),
        oldImg = document.getElementById('images').getElementsByTagName('img');

    img = function img (el, x, y) {
        var d = document.createElement('div'),
            img = document.createElement('img');

        d.className = 'new-divs';
        d.style.left = 50 * x +'%';
        d.style.top = 50 * y +'%';

        img.className = 'new-imgs';
        img.src = oldImg[Math.floor(Math.random()*oldImg.length)].src;

        img.onmousedown = function () {
            div(this.parentNode);
            this.parentNode.removeChild(this);
        }
        d.appendChild(img);
        el.appendChild(d);
    };
    
    div(add);
    function div(el) {
        img(el, 0, 0);
        img(el, 1, 0);
        img(el, 0, 1);
        img(el, 1, 1);
    }
}