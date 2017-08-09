/*
* 思路分析 ：
* 1.获取要操作的元素
* 2.为了实现无缝滚动 我们需要把第一张复制一份放到最后
* 3.自动播放
* 4.焦点自动播放
* 5.鼠标移入的时候 停止播放，同时左右按钮显示  鼠标移出的时候，动画继续播放，同时按钮要隐藏
* 6.点击焦点的时候 切换到对应的图片
* 7.点击左右按钮的时候，切换到对应的图片
* */

   // 1.获取要操作的元素

    var oBox=document.getElementById('box');
    var banner=oBox.getElementsByTagName('div')[0];
    var aDivs=banner.getElementsByTagName('div');
    var aImg=oBox.getElementsByTagName('img');
    var oUl=oBox.getElementsByTagName('ul')[0];
    var aLis=oUl.getElementsByTagName('li');
    var btnL=oBox.getElementsByTagName('a')[0];
    var btnR=oBox.getElementsByTagName('a')[1];
    var step=0;
    var timer=null;

   //2.为了实现无缝滚动 我们需要把第一张复制一份放到最后

    banner.innerHTML+='<div><a href="javaScript:;"><img src="images/nav-2.jpg" alt=""></a></div>';
    css(banner,'width',aDivs.length*aDivs[0].offsetWidth);

    //自动播放
    clearInterval(timer);
    timer=setInterval(autoMove,3000);
    function autoMove() {
        if(step>=aDivs.length-1){
            step=0;
            css(banner,'left',0);
        }
        step++;
        //css(banner,'left',-step*aDivs[0].offsetWidth);
        animate({
            curEle:banner,
            target:{
                left:-step*aDivs[0].offsetWidth
            },
            duration:1000
        });
        bannerTip();
    }

    //4.焦点自动播放

    function bannerTip() {
        var temp=step>=aDivs.length-1?0:step;
        for(var i=0;i<aLis.length;i++){
            aLis[i].className=i===temp?'on':null;
        }
    }

    //5.鼠标移入的时候 停止播放，同时左右按钮显示  鼠标移出的时候，动画继续播放，同时按钮要隐藏

    oBox.onmouseover=function () {
        clearInterval(timer);
        css(btnL,'display','block');
        css(btnR,'display','block');
    };
    oBox.onmouseout=function () {
        clearInterval(timer);
        timer=setInterval(autoMove,3000);
        css(btnL,'display','none');
        css(btnR,'display','none');
    };

    //6.点击焦点的时候 切换到对应的图片

    handleChange();
    function handleChange() {
        for(var i=0;i<aLis.length;i++){
            aLis[i].index=i;
            aLis[i].onclick=function () {
                step=this.index;
                animate({
                    curEle:banner,
                    target:{
                        left:-step*aDivs[0].offsetWidth
                    },
                    duration:1000
                });
                bannerTip();
            }
        }
    }

    //7.点击左右按钮的时候，切换到对应的图片

    btnR.onclick=autoMove;
    btnL.onclick=function () {
        if(step<=0){
            step=aDivs.length-1;
            css(banner,'left',-step*aDivs[0].offsetWidth);
        }
        step--;
        animate({
            curEle:banner,
            target:{
                left:-step*aDivs[0].offsetWidth
            },
            duration:1000
        });
        bannerTip();
    };





