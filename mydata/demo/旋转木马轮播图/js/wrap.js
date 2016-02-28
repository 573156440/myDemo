/**
 * Created by Qinson on 2015/11/23.
 */
window.onload= function () {
    var wrap=document.getElementById("wrap");
    var slid=document.getElementById("slid");
    var arrow=document.getElementById("arrow");

    var json = [

        {   //  1
            width:400,
            top:20,
            left:50,
            opacity:20,
            z:2
        },
        {  // 2
            width:600,
            top:70,
            left:0,
            opacity:80,
            z:3
        },
        {   // 3
            width:800,
            top:100,
            left:200,
            opacity:100,
            z:4
        },
        {  // 4
            width:600,
            top:70,
            left:600,
            opacity:80,
            z:3
        },
        {   //5
            width:400,
            top:20,
            left:400,
            opacity:20,
            z:2
        }
    ];
    wrap.onmouseover= function () {
        arrow.style.opacity=0.4;
    }
    wrap.onmouseout= function () {
        arrow.style.opacity=0;
    }
    //×óÓÒ°´Å¥µã»÷
    //for(var i=0;i<arr) {}





}
