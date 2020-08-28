$(function(){
    (function(){
    $('.item').on('click','.car a',function(){
        //获取的数据
        var $id = $(this).parent().siblings('a').children('.imgPro').children().attr("data-id")
        var $name =  $(this).parent().siblings('a').children('.er').html();
        var $price = $(this).parent().siblings('a').children('.yuan').html();
        var $img = $(this).parent().siblings('a').children('.imgPro').children().attr("src")
        var $num = 1;
        $.ajax({
            url:"../lib/addwq.php",
            type:"post",
            dataType:"json",
            data:{
                id:$id,
                name:$name,
                price:$price,
                img:$img,
                num:$num,
            },
            success:function(res){
                if(res.code==1){
                    showCart()
                }
            }
        })
    })
    showCart()
    //查询并显示购物车
    function showCart(){
        $('#banner').css('display','none');
        $('#shopCar').css('display','block');
        $.ajax({
            url:'../lib/showlist.php',
            dataType:'json',
            success:function(res){
                if(res.code==1){
                    $('.list-item').remove();
                    $.each(res.data,function(index,item){
                        var isHead = $('.list-head').length;
                        if(isHead<1){
                        $('.container').append(
                            ` <div class="list-body">
                                <div class='list-head'>
                                    <div class='checkBox'>
                                        <input type="checkbox" class='checkmax' checked><span>全选</span>
                                    </div>
                                    <div class='checkimg'>&nbsp;</div>
                                    <div class='checkname'>商品名称</div>
                                    <div class='checkprice'>单价</div>
                                    <div class='checknum'>数量</div>
                                    <div class='checktotal'>小计</div>
                                    <div class='checkaction'>操作</div>
                                </div>
                                <div class='list-item'>
                                    <div class='check'>
                                        <input type="checkbox" class="listcheck" checked>
                                    </div>
                                    <div class='img'><img src="${item.product_img}" data-id="${item.product_id}" alt=""></div>
                                    <div class='name'>${item.product_name}</div>
                                    <div class='price'>${item.product_price}</div>
                                    <div class='num'>
                                        <div class='change-goods'>
                                            <a class='minus' href="javascript:;">-</a>
                                            <input type="text" value="${item.product_num}">
                                            <a class='add' href="javascript:;">+</a>
                                        </div>
                                    </div>
                                    <div class='total'>
                                        ${parseInt(item.product_price)*item.product_num}元
                                    </div>
                                    <div class='action'>
                                        <a href="javascript:;">X</a>
                                    </div>
                                </div>
                                <div class='car-bar'>
                                    <div class="goshoping">
                                        <a href="javascript:;">继续购物</a>
                                        <span class='bar'>|</span>
                                        <p>共<span>2</span>件商品，已选择<span>2</span>件</p>
                                    </div>
                                    <div class='totally'>
                                        <div class='tolprice'>
                                            <span>合计：</span>
                                            <span class="import">99</span>
                                            <span>元</span>
                                        </div>
                                        <a href="javascript:;">去结算</a>
                                    </div>
                                </div>
                            </div> `
                        )
                    }else{
                        $('.list-item').remove();
                        $.each(res.data,function(index,item){
                            $('.list-head').after(
                            ` <div class='list-item'>
                                    <div class='check'>
                                        <input type="checkbox" class="listcheck" checked>
                                    </div>
                                    <div class='img'><img src="${item.product_img}" data-id="${item.product_id}" alt=""></div>
                                    <div class='name'>${item.product_name}</div>
                                    <div class='price'>${item.product_price}</div>
                                    <div class='num'>
                                        <div class='change-goods'>
                                            <a class='minus' href="javascript:;">-</a>
                                            <input type="text" value="${item.product_num}">
                                            <a class='add' href="javascript:;">+</a>
                                        </div>
                                    </div>
                                    <div class='total'>
                                        ${parseInt(item.product_price)*item.product_num}元
                                    </div>
                                    <div class='action'>
                                        <a href="javascript:;">X</a>
                                    </div>
                                </div>`
                            )
                        })
                        
                    }

                    })    
                }

            }       
            
        })
        
    } 
   
     $('.container').on('click','.checkmax',function(){
        if(this.checked==true){
            $('.listcheck').prop('checked',true)
        }else{
            $('.listcheck').prop('checked',false)
        }
     })
    $('.container').on('click','.listcheck',function(){
        if($('.listcheck').size()!=$('.listcheck:checked').size()){
            $('.checkmax').prop('checked',false)
        }else{
            $('.checkmax').prop('checked',true)
        }
        
       
    })
    function total(){
        var count = 0;
        $('.list-item').each(function(index,item){
            
        })
    }
    $(this).each(function(index,item){
        if($(item).prop('checked',true)){
            var price = parseInt($(this).parent().siblings('.total').html())
            count += price;
        }
        }

    )

    // $(this).parent().parent().remove();
    //删除节点
    $('.container').on('click','.action>a',function(){
      var item = $(this).parent().parent()
      var $id = $(this).parent().siblings('.img').children().attr('data-id');
        $('.mask').css('display','block').stop().animate({
            height:2481,
            opacity:0.5,
            zIndex:999,
            position: 'absolute'
        },500,'linear')
        $('.card').css('display','block').stop().animate({
            background:'white',
            top:200,
            left:430,
            position: 'fixed',
            zIndex: 10000,
            opacity: 1,
        },500,'linear',function(){
            $('.confirm').click(function(){
                item.remove();
                $.ajax({
                    url:'../lib/delwq.php',
                    dataType:'json',
                    data:{
                        id:$id
                    },
                    success:function(res){
                    }
                })
                $('.mask').stop().animate({
                    height:560,
                    opacity:0,
                    zIndex:999,
                    position: 'absolute'
                },500,'linear',function(){
                    $('.mask').css('display','none')
                })
                $('.card').stop().animate({
                    background:'white',
                    top:160,
                    position: 'absolute',
                    zIndex: 10000,
                    opacity: 0,
                },500,'linear',function(){
                    $('.card').css('display','none')
                })
            })
            $('.cancel').click(function(){
                $('.mask').stop().animate({
                    height:560,
                    opacity:0,
                    zIndex:999,
                    position: 'absolute'
                },500,'linear',function(){
                    $('.mask').css('display','none')
                })
                $('.card').stop().animate({
                    background:'white',
                    top:160,
                    position: 'absolute',
                    zIndex: 10000,
                    opacity: 0,
                },500,'linear',function(){
                    $('.card').css('display','none')
                })
            })
        })
        // var $id = $(this).parent().siblings('.img').children().attr('data-id');
    })

    //增加
    $('.container').on('click','.add',function(){
        var num = parseInt($(this).siblings('input').val());
        if(num<10){
            num++;
            $(this).siblings('input').val(num)
           var price = $(this).parent().parent().siblings('.price').html();
               price = parseInt(price);
           $(this).parent().parent().siblings('.total').html('')
           $(this).parent().parent().siblings('.total').html(price*num+'元');
        }else{
            alert('购买数量不能超过10！')
        }
        var $id = $(this).parent().parent().siblings('.img').children().attr('data-id')
        $.ajax({
            url:'../lib/updatewq.php',
            type:'post',
            dataType:'json',
            data:{
                type:'add',
                id:$id
            },
            success:function(res){
                
            }
        })
    })
    //减少
    $('.container').on('click','.minus',function(){
        var num = parseInt($(this).siblings('input').val());
        if(num>1){
            num--;
            $(this).siblings('input').val(num);
            var price = $(this).parent().parent().siblings('.price').html();
                price = parseInt(price);
            $(this).parent().parent().siblings('.total').html('')
            $(this).parent().parent().siblings('.total').html(price*num+'元');
            
        }else{
            alert('数量不能为小于1！')
        }
        var $id = $(this).parent().parent().siblings('.img').children().attr('data-id')
        $.ajax({
            url:'../lib/updatewq.php',
            type:'post',
            dataType:'json',
            data:{
                type:'minus',
                id:$id
            },
            success:function(res){
                
            }
        })
    })

    //合计
 })()
    
})

