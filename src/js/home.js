$(function(){

    var slider = document.querySelector('.slider');
    var sliderCtrl = document.querySelector('.slider-ctrl');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var liS = slider.children;
    var width = slider.offsetWidth;
    var timer1 = null;

    var index = 0;
    for(var i=0;i<liS.length;i++){
        liS[i].style.left = width+'px';
    }
    liS[index].style.left = 0 +'px';

    for(var i=0;i<liS.length;i++){
        var newSpan = document.createElement('span');
        newSpan.num = i;
        newSpan.className = "slider-con";
        sliderCtrl.append(newSpan);
    }
        light();
    function light(){
        var spanS = sliderCtrl.children;
        for(var i=2;i<spanS.length;i++){
            spanS[i].className = "slider-con";
        }
        spanS[index+2].className = "slider-con current";
    }
    timer1 = setInterval(nextFn,2000);
    slider.onmouseover = function(){
        clearInterval(timer1)
    }
    slider.onmouseout = function(){
        clearInterval(timer1);
        timer1 = setInterval(nextFn,2000);
    }
    sliderCtrl.onclick = function(e){
        e = window.event||e;
        var target = e.target||e.srcElement;
        if(target.className.indexOf('slider-con')>-1){
            if(target.num<index){
                liS[target.num].style.left = -width+'px';
                animation(liS[target.num],{left:0});
                animation(liS[index],{left:width});
            }
            if(target.num>index){
                liS[target.num].style.left = width+'px';
                animation(liS[target.num],{left:0});
                animation(liS[index],{left:-width});
              
            }
            index = target.num;
            light();
        }
        if(target.className == "prev"){
           prevFn();
        }
        if(target.className == "next"){
           nextFn();
        }

    }

    function prevFn(){
        var current = index-1;
        if(current<0){
            current = liS.length-1
        }
        liS[current].style.left = -width+'px';
        animation(liS[current],{left:0});
        animation(liS[index],{left:width});
        index = current;
        light();
    }
    function nextFn(){
        var current = index+1;
        if(current>liS.length-1){
            current = 0;
        }
        liS[current].style.left = width+'px';
        animation(liS[current],{left:0});
        animation(liS[index],{left:-width});
        index = current;
        light();
    }

    //用户登录信息
    var dataname = localStorage.getItem('un')
    $('.text-left').children('span').eq(1).html('欢迎你！'+ dataname );

    // hover部分
    $('.menu1>ul>li').hover(function(){
        var index = $(this).index();
        $(this).parent().siblings('.product').eq(index).addClass('active')
    },function(){
        $(this).parent().siblings('.product').eq(index).siblings('.product').removeClass('active')

    })
    
    //头部输入框
    $(window).scroll(()=>{
        if($(window).scrollTop()>=$(window).height()){
            $('#head-inp').stop().animate({
               top:0
            },250,"linear")
        }else{
            $('#head-inp').stop().animate({
                top:-60
            },250,"linear")
        }
    })
    // 零食部分
    $('.hot .hot-container>div>p:even').addClass('active');
    // $('.hot .hot-container>div>p').eq(2).addClass('active');
    $('.detail:even').addClass('act')
    var timer2 = setInterval(function(){
        change();
    },3000);
    function change(){
        var flag = true;
        if(flag){
            $('.hot .hot-container>div>p:even')
            .toggleClass('active')
            .siblings().toggleClass('active')
            .parent().siblings('.detail:even')
            .toggleClass('act')
            .siblings('.detail').toggleClass('act');
            return flag=false;
        }
    }
    $('.hot').hover(()=>{
        clearInterval(timer2);
    },
    ()=>{
        clearInterval(timer2);
      timer2 = setInterval(change,3000)
    })

    //天猫倒计时
        //获取节点
        var time1 = document.getElementById('time1');
        var time2 = document.getElementById('time2');
        var time3 = document.getElementById('time3');
        getTime();
        //声明时间差
        function getTime(){
            var now = new Date();
            var Today = new Date(2020,7,19);
        // setInterval(getTime,1000);
            var diff = Today-now;

        //获取小时
            var hour = diff/(60*60*1000);
                hour = Math.floor(hour);
        //获取分钟
                diff = diff-hour*60*60*1000
            var min = diff/(60*1000);
                min = Math.floor(min);
        //获取秒
                diff = diff-min*60*1000
            var second = diff/1000;
                second = Math.floor(second);

                time1.innerHTML=double(hour);
                time2.innerHTML=double(min);
                time3.innerHTML=double(second);
            //加倍数字
            function double(num){
                if(num<10){
                    num = '0'+num;
                    return num;
                }else{
                    return num;
                }
            }
        }
        setInterval(getTime,1000);

        //回到顶部
    $(window).scroll(function(){
        if($(window).scrollTop()>1500){
            $(".footnav").show(500,'linear',function(){
            
            })
        }else{
            $(".footnav").hide(500,'linear',function(){

            }) 
        }
    })
    $('.backTop').click(function(){
        $("html").animate({
        scrollTop:0
        },1000,'linear')
    }) 
})

