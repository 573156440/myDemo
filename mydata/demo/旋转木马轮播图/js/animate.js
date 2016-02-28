/**
 * Created by Qinson on 2015/11/24.
 */



function animate(obj,json,fn){
//        var flag=true;      //用来判断是否所有属性都运动完成
    clearInterval(obj.timer);
    obj.timer=setInterval(function () {
        var flag=true;
        //计算步长
        for(var k in json){
            var current=0;
            if(k=="opacity"){                           //判断透明
                //current=Math.round(parseInt(getStyle(obj,k)*100))||0;
                current=parseInt(getStyle(obj,k)*100);
                step=(json[k]*100-current)/10;
                step=step>0?Math.ceil(step):Math.floor(step);
            }else{
                current=parseInt(getStyle(obj,k));
                var step=getStyle(obj,json[k])-current;
                step=(json[k]-current)/10;                  //json[k]得到json里面的属性值
                step=step>0?Math.ceil(step):Math.floor(step);
            };   //当前属性值
//
            if(k=="opacity"){                //判断透明
                if("opacity"in obj.style){
                    obj.style.opacity=(current+step)/100;

                }else{
                    obj.style.filter= "alpha(opacity="+(current+step)+")";
                }
            }else if(k=="zIndex"){                      //判断索引
                obj.style.zIndex=json[k];
            } else{                                    //没有索引和透明的普通情况
                obj.style[k]=current+step+"px";
            }

            if(current!=json[k] && (current/100)!=json[k]) {
                flag=false;
                console.log(flag);
            }

        }
        if(flag){
            clearInterval(obj.timer);
            console.log("所有运动完成，停止了定时器");
            if(fn){fn();}
        }
    },30)
}

function getStyle(obj,attr) {  //  谁的      那个属性
    if(obj.currentStyle)  // ie 等
    {
        return obj.currentStyle[attr];  // 返回传递过来的某个属性
    }
    else
    {
        return window.getComputedStyle(obj,null)[attr];  // w3c 浏览器
    }
}
//alert("aa");





