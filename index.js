$(function(){
    //选择要使用自定义样式的元素
    // $(".songList").mCustomScrollbar();
    //歌曲操作选项显示
    $('body').delegate('.song','mouseenter',function(){
        $(this).children('.Name').children('.oprate_list').show()
        
        $(this).children('.Time').children('span').css('display','none')
        $(this).children('.Time').children('a').css('display','block')
    })
    $('body').delegate('.song','mouseleave',function(){
        $(this).children('.Name').children('.oprate_list').hide()
        $(this).children('.Time').children('span').css('display','block')
        $(this).children('.Time').children('a').css('display','none')
    })
    //播放和暂停
    $('.songList').delegate('.fa-play-circle','click',function(){
        //控制自己变化
        $(this).removeClass('fa-play-circle').addClass('fa-pause-circle');
        $(this).parents('.song').addClass('selected');
        //添加播放动画
        $(this).parents('.oprate_list').siblings('.songName').prepend('<img style=\'margin-right: 5px;\' src="/js/QQ music/wave.gif" alt="">')
        //控制兄弟变化
        $(this).parents('.song').siblings().find('.songName').find('img').remove()
        $(this).parents('.song').siblings().find('.fa-pause-circle').removeClass('fa-pause-circle').addClass('fa-play-circle')
        $(this).parents('.song').siblings('.selected').removeClass('selected')
        // 控制底部播放按钮变化
        $('.selectAndplay_play').children('i').removeClass('fa-play').addClass('fa-pause')
    })
    $('.songList').delegate('.fa-pause-circle','click',function(){
        //控制自己变化
        $(this).removeClass('fa-pause-circle').addClass('fa-play-circle');
        $(this).parents('.song').removeClass('selected')
        //控制底部播放按钮变化
        $('.selectAndplay_play').children('i').removeClass('fa-pause').addClass('fa-play')
        //删除动画
        $(this).parents('.oprate_list').siblings('.songName').children('img').remove()
    })
    // 歌曲的选择
    $('.songList').delegate('.fa-check-square-o','click',function(){
        $(this).removeClass('fa-check-square-o').addClass('fa-check-square')
        var tf=$('.songList').children('.song').find('.fa-check-square').length==$('.songList').find('.song').length
        if (tf){
            $('.label').find('.fa-check-square-o').removeClass('fa-check-square-o').addClass('fa-check-square')
        }else{
            $('.label').find('.fa-check-square').removeClass('fa-check-square').addClass('fa-check-square-o')
        }
    })
    $('.songList').delegate('.fa-check-square','click',function(){
        $(this).removeClass('fa-check-square').addClass('fa-check-square-o')
        var tf=$('.songList').children('.song').find('.fa-check-square').length==$('.songList').find('.song').length
        if (tf){
            $('.label').find('.fa-check-square-o').removeClass('fa-check-square-o').addClass('fa-check-square')
        }else{
            $('.label').find('.fa-check-square').removeClass('fa-check-square').addClass('fa-check-square-o')
        }
    })
    $('.label').delegate('.fa-check-square-o','click',function(){
        $(this).parents('.left').children('.songList').children().find('.fa-check-square-o').removeClass('fa-check-square-o').addClass('fa-check-square')
        $(this).removeClass('fa-check-square-o').addClass('fa-check-square')
    })
    $('.label').delegate('.fa-check-square','click',function(){
        $(this).parents('.left').children('.songList').children().find('.fa-check-square').removeClass('fa-check-square').addClass('fa-check-square-o')
        $(this).removeClass('fa-check-square').addClass('fa-check-square-o')
    })

    
    // if($('.songList').find('.fa-check-square').length==$('.songList').find('.song').length){
    // $('.label').find('.fa-check-square-o').removeClass('fa-check-square-o').addClass('fa-check-square')
    // }else{
    //     $('.label').find('.fa-check-square').removeClass('fa-check-square').addClass('fa-check-square-o')
    // }


    
    // 底部播放控制选中歌曲中的高亮开始播放/从列表第一首开始播放并给上高亮
    $('.selectAndplay_play').click(function(){
        //判断底部播放按钮是否为播放状态
        if($('.selectAndplay_play').children('.fa-play').length==1){
            // 控制图标变化
            $('.selectAndplay_play').children('.fa-play').removeClass('fa-play').addClass('fa-pause')
            if ($('.song').find('.fa-check-square').length==0){
                //当没有选中的时候让列表第一个播放
                $('.song').find('.fa-play-circle').eq(0).parents('.oprate_list').siblings('.songName').prepend('<img style=\'margin-right: 5px;\' src="/js/QQ music/wave.gif" alt="">')
                $('.song').find('.fa-play-circle').eq(0).removeClass('fa-play-circle').addClass('fa-pause-circle')
                $('.song').eq(0).addClass('selected')
                //改边其他正在播放的样式
                $('song').siblings('.selected').removeClass('selected')
            }else{
                //让选中的歌曲中的第一个播放
                $('.song').find('.fa-check-square').eq(0).parents('.number').siblings('.songName').prepend('<img style=\'margin-right: 5px;\' src="/js/QQ music/wave.gif" alt="">')
                $('.song').find('.fa-check-square').eq(0).parents('.number').siblings('.oprate_list').find('.fa-play-circle').removeClass('fa-play-circle').addClass('fa-pause-circle')
                $('.song').find('.fa-check-square').eq(0).parents('.song').addClass('selected')
            }
            //控制歌曲播放
        }else{
            // 当暂停时改变正在播放歌曲的样式
            $('.selectAndplay_play').children('.fa-pause').removeClass('fa-pause').addClass('fa-play')
            $('.song').find('.fa-pause-circle').parents('.oprate_list').siblings('.songName').children('img').remove()
            $('.song').find('.fa-pause-circle').removeClass('fa-pause-circle').addClass('fa-play-circle')
            $('.song').removeClass('selected')
            
            //控制歌曲播放
        }
    })
    //删除按钮控制删除
    $('.section').delegate('.fa-trash-o','click',function(){
        $(this).parents('.song').slideToggle()
    })
    

    //喜欢与取消喜欢
    $('.fa-heart-o').click(function(){
        $(this).hide()
        $(this).siblings('.fa-heart').show()
    })
    $('.fa-heart').click(function(){
        $(this).hide()
        $(this).siblings('.fa-heart-o').show()
    })

    //音量开关
    $('.volume').delegate('.fa-volume-up','click',function(){
        // $('.fa-volume-up').removeClass('fa-volume-up').addClass('fa-volume-off')
        console.log($('.fa-volume-up').prop('title'));
        $('.fa-volume-up').prop('title','打开声音')
        $('.fa-volume-up').removeClass('fa-volume-up').addClass('fa-volume-off')
        $('.volume').css('opacity',0.5)
    })
    $('.volume').delegate('.fa-volume-off','click',function(){
        $('.fa-volume-off').prop('title','关闭声音')
        $('.fa-volume-off').removeClass('fa-volume-off').addClass('fa-volume-up')
        $('.volume').css('opacity',1)
    })


    //加载歌曲列表
    getPlayList()
    function getPlayList(){
        $.ajax({
            url:"music-info.json",
            dataType:"json",
            success: function(data){
                // console.log(data[0].name)
                // 遍历获取到的数据创建音乐列表
                $.each(data,function(index,data){
                    var $item=crateMusicItem(index,data)
                    $('.songList').append($item)
                })
            },
            error: function(e){
                console.log(e)
            }
        })
    }

    function crateMusicItem(index,data){
        var $item=$('<ul class="song"><li class="Name"><a class=\'number\' href="javascript:;"><i class="fa fa-check-square-o" aria-hidden="true"></i> </a> <div class=\'songName\'>'+data.name+'</div><div class="oprate_list"><a href="javaScript:;" class="play" title="播放"><i class="fa fa-play-circle" aria-hidden="true"></i></a><a href="javaScript:;" class="collect" title="收藏"><i class="fa fa-heart-o" aria-hidden="true"></i></a><a href="javaScript:;" class="download" title="下载"><i class="fa fa-download" aria-hidden="true"></i></a></div></li><li class="Singer">'+data.singer+'</li><li class="Time"><span>'+data.time+'</span><a href="javascript:;"><i class="fa fa-trash-o" aria-hidden="true"></i></a></li></ul>')
        return $item
    }

    
})
