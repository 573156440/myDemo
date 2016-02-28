/**
 * Created by guoxin on 2015/11/19.
 */
function $(id) {
    return document.getElementById(id);
}

function hide(obj) {
    obj.style.display = "none";
}

function show(obj) {
    obj.style.display = "block";
}

/*封装scroll top/left*/
function scroll() {
        if(window.pageYOffset != null)  //  ie9+ 和其他浏览器
        {
            return {
                left: window.pageXOffset,
                top: window.pageYOffset
            }
        }
        else if(document.compatMode == "CSS1Compat")  // 声明的了 DTD
          // 检测是不是怪异模式的浏览器 -- 就是没有 声明<!DOCTYPE html>
        {
            return {
                left: document.documentElement.scrollLeft,
                top: document.documentElement.scrollTop
            }
        }
        return { //  剩下的肯定是怪异模式的
            left: document.body.scrollLeft,
            top: document.body.scrollTop
        }
    }

    window.onscroll = function() {
        console.log(scroll().top);
    }

/*封装可视区域大小*/
function client(){
    if(window.innerWidth!=null){         //ie9及以上版本
        return{
            width:window.innerWidth,
            height:window.innerHeight
        }
    }else if(document.documentElement.clientWidth){   //标准浏览器
        return{
            width:document.documentElement.clientWidth,
            height:document.documentElement.clientWidth
        }
    }else{
        return {                     //怪异浏览器
            width: document.body.clientWidth,
            height: document.body.clientHeight
        }
    }
}

/*封装匀速运动*/
function animateUniform(obj, target) {
    var speed = obj.offsetLeft < target ? 10 : -10; //为什么不能用target-obj.offsetleft>0 ？
    obj.timer = setInterval(function() {
        var result = target - obj.offsetLeft;
        obj.style.left = obj.offsetLeft + speed + "px";
        if (Math.abs(result) < 10) {
            clearInterval(obj.timer);
            obj.style.left = target + "px"
        }
    }, 30)
}
/*封装缓动动画*/
function animate(obj, json, fn) {
      //        var flag=true;      //用来判断是否所有属性都运动完成
      clearInterval(obj.timer);
      obj.timer = setInterval(function() {
        var flag = true;
        //计算步长
        for (var k in json) {
          var current = 0;
          if (k == "opacity") { //判断透明
            current = parseInt(getStyle(obj, k) * 100);
            step = (json[k] * 100 - current) / 10;
            console.log(step);
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
          } else {
            current = parseInt(getStyle(obj, k));
            var step = getStyle(obj, json[k]) - current;
            step = (json[k] - current) / 10; //json[k]得到json里面的属性值
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
          }; //当前属性值
          //
          if (k == "opacity") { //判断透明
            if ("opacity" in obj.style) {
              obj.style.opacity = (current + step) / 100;
              //
            } else {
              obj.style.filter = "alpha(opacity=" + (current + step) + ")";
            }
          } else if (k == "zIndex") { //判断索引
            obj.style.zIndex = json[k];
            console.log(obj.style.zIndex);
          } else { //没有索引和透明的普通情况
            obj.style[k] = current + step + "px";
          }

          if (current != json[k] && (current / 100) != json[k]) {
            //                        console.log(current+"+"+json[k]);       //opacity的current不一致 所以一没有停止定时器
            flag = false;
            console.log(flag)
          }
        }
        if (flag) {
          clearInterval(obj.timer);
          alert("所有运动完成，停止了定时器");
          if (fn) {
            fn();
          }
        }

      }, 30)
    }
/*封装获取样式*/
    function getStyle(obj, attr) { //  谁的      那个属性
      if (obj.currentStyle) // ie 等
      {
        return obj.currentStyle[attr]; // 返回传递过来的某个属性
      } else {
        return window.getComputedStyle(obj, null)[attr]; // w3c 浏览器
      }
    }

