window.onload = function () {
    var closeAd = function () {
        var close = document.getElementById("close-ad");
        close.onclick = function (e) {
            var e = e || window.event,
            target = e.target || e.srcElement;
            if (target.nodeName.toLocaleLowerCase() === "i") {
                close.classList.add("none");
            }
        }
    }
    closeAd();

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
        var nav = document.getElementById("nav"),
            sub = document.getElementById("sub"),
            activeNav,
            activeSub;
        nav.onmouseover = function (e) {
            sub.classList.remove("none");
        }
        nav.onmouseout = function (e) {
            sub.classList.add("none");
        }
    }
    showMenu();
}