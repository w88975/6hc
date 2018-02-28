function parseDom(arg) {
    var objE = document.createElement("div");
    objE.innerHTML = arg;
    return objE.childNodes;
};
var dom = parseDom('<div class="k6_content" style="cursor: pointer;background: #f94b4b;border: 1px solid #000;width: 180px;position: fixed;top:170px;left:0;z-index: 9999;"><img style="width: 100%;" class="k6_img" src="http://localhost:3000/d1" /></div>')
dom[0].addEventListener('click',function(){
    window.open('http://wpa.qq.com/msgrd?v=3&uin=1990991593&site=qq&menu=yes')
})
document.body.appendChild(dom[0])