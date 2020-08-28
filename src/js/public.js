function move(dom,attr,target,fn){
    /* 
        move:
            实现dom这个节点的attr属性缓动到target位置(实现div这个节点的width缓动到400)
        形参:
            dom:元素节点
            attr:要缓动的属性,字符串
            target:属性要运动到的目标位置,数值型,如果是透明度请乘以100传入
            fn:是一个函数,这个函数会在动画完成以后执行,是可选参数
    */
    //在函数内部定义的timer是局部变量,只能在本次调用的使用获得,下次调用就会重新产生一个timer
    clearInterval(dom.timer);
    dom.timer = setInterval(function(){
        //1 起始点
        if(attr == "opacity"){
            var start = parseInt(getStyle(dom,attr)*100);
        }else{
            var start = parseInt(getStyle(dom,attr))
        }  
        //2 计算速度
        var speed = (target - start )/10;
        speed = speed>0?Math.ceil(speed):Math.floor(speed);

        //3 下一个位置
        var next = start + speed;

        //4 定位元素
        if(attr == "opacity"){
            dom.style[attr] = next/100;
            dom.style.filter = "alpha(opacity="+next+")";//兼容ie78
        }else{
            dom.style[attr] = next+"px";
        }
        //停止运动
        if(next==target){
            clearInterval(dom.timer);
            if(fn){
                fn();//动画完成以后执行函数
            }
        }
    },1000/60)

}

function animation(dom,json,callback){
    /* 
        animation:
            实现dom元素缓动到json里面定义的位置
        形参:
            dom:要运动的节点
            json:
                格式如:{left:800,top:600,opacity:50,zIndex:900000},这个对象用于定义要运动到的目标集合
                属性名要求驼峰命名
                如果属性是透明度,目标值要乘以100传入
            callback:运动完以后调用的函数,可选    
    
    */
    //要用定时器,先清定时器
    clearInterval(dom.timer);
    //一段时间运动一段距离
    dom.timer = setInterval(function(){
        var flag = true;    
        //json里面有几个键值对,就要运动几次,那么要遍历json对象
        for(var key in json){
            //key 是遍历到的那个成员名,也就是要运动的属性
            //json[key]  是遍历到的那个成员的值,也就是目标值
            
            //1 单个属性的目标值
            var target = json[key];//因为key是一个变量,所以要写在[]里面
            //2 单个属性的起始点
            if(key=='opacity'){
                var start = parseInt(getStyle(dom,key)*100);
            }
            else if(key=='zIndex'){
                var start = json[key];//如果是zIndex,他是不要运动的,所以设置速度为0,start==target
            }
            else{
                var start = parseInt(getStyle(dom,key));
            }         
            //3 计算速度
            var speed = (target - start)/10
            speed = speed>0?Math.ceil(speed):Math.floor(speed);
            //4 计算下一个位置
            var next = start+speed;
            //5 定位元素
            if(key=='opacity'){
                dom.style.opacity = next/100;
                dom.style.filter = 'alpha(opacity='+next+')';
            }
            else if(key=='zIndex'){
                dom.style.zIndex = next;
            }
            else{
                dom.style[key] = next+"px";
            }
            //6 判断这个运动的属性是否到达            
            if(next!=target){
                flag = false;
            }
        } 

        //每次left和top运动完以后,要判断是否要停止定时器
        if(flag==true){
            clearInterval(dom.timer)
            if(callback){
                callback()
            }
        }
    },1000/60)
}


//为了考虑兼容性问题,单独封装一个方法,用于获取元素的某个属性值,并返回        
function getStyle(dom,attr){
    if(window.getComputedStyle){
        //因为attr是变量,所以要加[]
        return window.getComputedStyle(dom,null)[attr]
    }else{
        return dom.currentStyle[attr];//IE7,8
    }
}

//获取页面滚动的距离
function getScroll(){
    return {
        left:document.body.scrollLeft||document.documentElement.scrollLeft,
        top:document.body.scrollTop||document.documentElement.scrollTop
    }
}