$(function(){
    // 详情页小图索引
        $('.tb-booth-warp').children(0).children().hover(function(){
           var imgSrc = $(this).children().children().attr('src');
           $(this).children().children().css({marginLeft:-2})
           $('.tb-booth').children('a').children('span').children('img').attr('src',imgSrc)
        },function(){
            $(this).children().children().css({marginLeft:0})
        })



        // 放大镜
        $('.tb-booth').children().children('span').hover(function(){
            $(this).children('.mask').css('display','block');
            $('.tb-booty').css('display','block');

            var src = $(this).children('img').attr('src');
            $('.tb-booty').children('img').attr('src',src);
        },function(){
            $(this).children('.mask').css('display','none');
            $('.tb-booty').css('display','none');
        })
        //选中小盒子
        var small = $('.tb-booth').children().children('span')
        $(document).mousemove(function(e){
            // console.log(111)
            e = window.event||e;

            var aa = e.pageX-small.offset().left;
            var bb = e.pageY-small.offset().top;

           var smailX = aa-$('.mask').width()/2;
           var smailY = bb-$('.mask').height()/2;

            if(smailX<0){
                smailX = 0;
            }
            if(smailX>small.width()-$('.mask').width()){
                smailX = small.width()-$('.mask').width()
            }
            if(smailY<0){
                smailY = 0;
            }
            if(smailY>small.height()-$('.mask').height()){
                smailY = small.height()-$('.mask').height()
            }

            $('.mask').css({
                left:smailX+'px',
                top:smailY+'px'
            })

            var bigX = -smailX/small.width()*$('.tb-booty').children().width();
            var bigY = -smailY/small.height()*$('.tb-booty').children().height();

            $('.tb-booty').children().css({
                left:bigX+'px',
                top:bigY+'px'
            })
        })

        // 购物车
       $('#carb').click(function(){
           //获取的数据
        var $id = $('.tb-booth').find('img').attr('data-id')
        var $name = $('.tb_head').children('p').html()
        var $price = $('.price').find('span').html()
        var $img = $('.tb-booth').find('img').attr('src')
        var $num = 1;
         console.log($name)
         console.log($price)
        $.ajax({
            url:"../lib/addwq.php",
            type:'post',
            dataType:'json',
            data:{
                id:$id,
                name:$name,
                price:$price,
                img:$img,
                num:$num,
            },
            success:function(res){
                if(res.code==1){
                    alert('成功加入购物车！')
                }
            }
        })
       })
})