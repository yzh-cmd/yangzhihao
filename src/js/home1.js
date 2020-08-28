$(function(){
    var mySwiper = new Swiper('.swiper-container',{
        loop:true,
        effect : 'fade',
        fade: {
        crossFade: false,
        },
        autoplay:true,
        pagination:'.swiper-pagination'
    })


    // 切换
    $('.tab div').each(function(index,item){
        // console.log(item)
        $(item).click(function(){
            var index = $(this).index();
            $('.tab div').eq(index).css('borderColor','#000').siblings().css('borderColor','#fff');
            if(index==0){
                $('.mainInp>.loginBox').css('display','block').siblings('.registerBox').css('display','none');
            }else if(index==1){
                $('.mainInp>.registerBox').css('display','block').siblings('.loginBox').css('display','none');
            }
        })
    })
   
    
    $('.loginBox>form').submit(function(e){
        e = window.event||e;
        e.preventDefault?e.preventDefault():returnValue=false;
            // console.log(1111)
        var un = $('.un').val();
        var pw = $('.pw').val();
        if(un ==""||pw ==""){
            $('.un').focus();
            $('label').eq(0).css('borderColor',"red");
            $('.loginBox>.logintips').css('display','block').html('请输入账户名和密码');
        }
        if(un!=""&&pw!=""){
            $.ajax({
                url:"../lib/login.php",
                dataType:"json",
                type:"post",
                data:{
                    username:un,
                    password:pw
                },
                success:function(res){
                    if(res.code==1){
                        window.location.href = "../pages/index.html";
                        localStorage.setItem('un',res.data.un);
                    }
                    if(res.text=="失败"){
                        $('.loginBox>.logintips').css('display','block').html('账户名密或者密码有误！')
                    }
                }
            })
        }
       return false;
    })
     // 注册
    
     $(".un1").blur(()=>{
        
       var reg = /^[^_$].{6,}@(163|126|qq|sina)\.(com|cn|net)$/;
       var flag = reg.test($('.un1').val());
        if(!flag){
            $('.registerBox>.logintips').css({
                display:'block',
                color:"red"
            }).html('账号不符合规则！')
        }else{
            
            $.ajax({
                url:"../lib/verify.php",
                dataType:"json",
                type:"post",
                data:{
                    username:$('.un1').val(),
                },
                success:function(res){
                    if(res.code==1){
                        $('.registerBox>.logintips').css({
                            display:"block",
                            color:'green'
                        }).html('恭喜你可以注册了！')
                    }
                    if(res.msg=="失败"){
                        $('.registerBox>.logintips').css({
                            display:"block",
                            color:'red'
                        }).html('该账号已经注册了!')
                    }
                }
            })

            }
     })
     $('.registerBox>form').submit(function(e){
        e = window.event||e;
        e.preventDefault?e.preventDefault():returnValue=false;
        var un1 = $('.un1').val();
        var pw1 = $('.pw1').val();
        if(un1 ==""||pw1 ==""){
            $('.un1').focus();
            $('label').eq(0).css('borderColor',"red");
            $('.registerBox>.logintips').css('display','block').html('请输入账户名和密码');
        }
        $.ajax({
            url:"../lib/register.php",
            dataType:"json",
            type:"post",
            data:{
                username:un1,
                password:pw1
            },
            success:function(res){
                if(res.text=="成功"){
                    window.location.href = "../pages/success.html";
                }
            }
        })
    })
})