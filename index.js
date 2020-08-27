$(function(){
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
        var $item=$('<ul class="song"><li class="Name"><a class=\'number\' href="javascript:;"><i class="fa fa-check-square-o" aria-hidden="true"></i> </a> <div class=\'songName\'><span>'+data.name+'</span></div><div class="oprate_list"><a href="javaScript:;" class="play" title="播放"><i class="fa fa-play-circle" aria-hidden="true"></i></a><a href="javaScript:;" class="collect" title="收藏"><i class="fa fa-heart-o" aria-hidden="true"></i></a><a href="javaScript:;" class="download" title="下载"><i class="fa fa-download" aria-hidden="true"></i></a></div></li><li class="Singer">'+data.singer+'</li><li class="Time"><span>'+data.time+'</span><a href="javascript:;"><i class="fa fa-trash-o" aria-hidden="true"></i></a></li></ul>')
        return $item
    }


    // 获取歌曲资源
    function getSongSource(){
        //获取现在正在播放的是第几首歌
        var getSongNum=$('.selected').index();
        //获取这首歌的资源
        $.ajax({
            type:'get',
            url:'music-source.json',
            dataType:'json',
            success:function(data){
                var songLink=data[getSongNum].link_url;
                var songCover=data[getSongNum].cover;
                $('.myMusic').prop({
                    'src':songLink
                });
                console.log($('.myMusic')[0].paused);
                if ($('.myMusic')[0].paused){
                    $('.myMusic')[0].play()
                }else{
                    $('.myMusic')[0].pause()
                }
                $('.maskPic').css({
                    'background':'url("'+songCover+'")'
                });
            },
            error:function(e){
                console.log(e);
            }
        })
        
    }
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
        //播放
    $('.songList').delegate('.fa-play-circle','click',playAction)
        //暂停
    $('.songList').delegate('.fa-pause-circle','click',pauseAction)
        //播放时的变化
    function playAction(){
        $(this).removeClass('fa-play-circle').addClass('fa-pause-circle');
        $(this).parents('.song').addClass('selected');
        //添加播放动画
        $(this).parents('.oprate_list').siblings('.songName').prepend('<img style=\'margin-right: 5px;\' src="pic/wave.gif" alt="">')
        //控制兄弟变化
        $(this).parents('.song').siblings().find('.songName').find('img').remove()
        $(this).parents('.song').siblings().find('.fa-pause-circle').removeClass('fa-pause-circle').addClass('fa-play-circle')
        $(this).parents('.song').siblings('.selected').removeClass('selected')
        // 控制底部播放按钮变化
        $('.selectAndplay_play').children('i').removeClass('fa-play').addClass('fa-pause')

        // 控制底部信息变化
        change()
        //加载歌曲资源
        getSongSource()
    }
        //暂停后得变化
    function pauseAction(){
        //控制自己变化
        $(this).removeClass('fa-pause-circle').addClass('fa-play-circle');
        //控制底部播放按钮变化
        $('.selectAndplay_play').children('i').removeClass('fa-pause').addClass('fa-play');
        //删除动画
        $(this).parents('.oprate_list').siblings('.songName').children('img').remove();
        //歌曲暂停
        getSongSource()
    }

    // 歌曲的选择
    //选中
    $('.songList').delegate('.fa-check-square-o','click',function(){
        $(this).removeClass('fa-check-square-o').addClass('fa-check-square')
        var tf=$('.songList').find('.fa-check-square').length==$('.songList').find('.song').length
        if (tf){
            $('.label').find('.fa-check-square-o').removeClass('fa-check-square-o').addClass('fa-check-square')
        }else{
            $('.label').find('.fa-check-square').removeClass('fa-check-square').addClass('fa-check-square-o')
        }
        IsLike()
    })
    //取消选中
    $('.songList').delegate('.fa-check-square','click',function(){
        $(this).removeClass('fa-check-square').addClass('fa-check-square-o')
        var tf=$('.songList').find('.fa-check-square').length==$('.songList').find('.song').length
        if (tf){
            $('.label').find('.fa-check-square-o').removeClass('fa-check-square-o').addClass('fa-check-square')
        }else{
            $('.label').find('.fa-check-square').removeClass('fa-check-square').addClass('fa-check-square-o')
        }
        IsLike()
    })
    //选中全部
    $('.label').delegate('.fa-check-square-o','click',function(){
        $(this).parents('.left').children('.songList').children().find('.fa-check-square-o').removeClass('fa-check-square-o').addClass('fa-check-square')
        $(this).removeClass('fa-check-square-o').addClass('fa-check-square')
        if($(this).parents('.songList').find('.fa-heart').length==$('.songList').find('.fa-check-square').length){
            $('.someOperate').find('i').eq(1).removeClass().addClass('fa fa-heart')
        }
        IsLike()
    })
    //取消选中全部
    $('.label').delegate('.fa-check-square','click',function(){
        $(this).parents('.left').children('.songList').children().find('.fa-check-square').removeClass('fa-check-square').addClass('fa-check-square-o')
        $(this).removeClass('fa-check-square').addClass('fa-check-square-o')
        IsLike()
    })
    //调起底部'喜欢'按钮样式
    function IsLike(){
        var numCheck=$('.songList').find('.fa-check-square').length;
        var numLike=$('.songList').find('.fa-check-square').parents('.song').find('.fa-heart').length;

        if (numCheck==numLike&&numCheck!=0){
            $('.someOperate').find('i').eq(1).removeClass().addClass('fa fa-heart')
        }else{
            $('.someOperate').find('i').eq(1).removeClass().addClass('fa fa-heart-o')
        }
    }
    //删除按钮控制删除
    $('.section').delegate('.fa-trash-o','click',function(){
        $(this).parents('.song').slideUp(500,function(){
            $(this).remove()
            IsLike()
        })
        
    })
 


    
    // 底部播放控制选中歌曲中的高亮开始播放/从列表第一首开始播放并给上高亮\改变进度条的时间
    $('.selectAndplay_play').click(function(){
        //判断底部播放按钮是否为播放状态
        if($('.selectAndplay_play').children('.fa-play').length==1){
            // 控制图标变化
            $('.selectAndplay_play').children('.fa-play').removeClass('fa-play').addClass('fa-pause')
            if ($('.song').find('.fa-check-square').length==0){
                //判断有没有在播放的
                if ($('.selected').length==0){
                    //当没有选中的时候让列表第一个播放
                    $('.song').find('.fa-play-circle').eq(0).parents('.oprate_list').siblings('.songName').prepend('<img style=\'margin-right: 5px;\' src="pic/wave.gif" alt="">');
                    $('.song').find('.fa-play-circle').eq(0).removeClass('fa-play-circle').addClass('fa-pause-circle');
                    $('.song').eq(0).addClass('selected');
                    //改边其他正在播放的样式
                    $('song').siblings('.selected').removeClass('selected')
                    change();
                }else{
                    $('.selected').find('.songName').prepend('<img style=\'margin-right: 5px;\' src="pic/wave.gif" alt="">');
                    $('.selected').find('.fa-play-circle').removeClass('fa-play-circle').addClass('fa-pause-circle');
                }
            }else{
                //判断有没有在播放的
                if ($('.selected').length==0){
                    //让选中的歌曲中的第一个播放
                    $('.fa-check-square').eq(0).parents('.number').siblings('.songName').prepend('<img style=\'margin-right: 5px;\' src="/js/QQ music/wave.gif" alt="">')
                    $('.fa-check-square').eq(0).parents('.number').siblings('.oprate_list').find('.fa-play-circle').removeClass('fa-play-circle').addClass('fa-pause-circle')
                    $('.fa-check-square').eq(0).parents('.song').addClass('selected')
                    $('.fa-check-square').eq(0).parents('.song').siblings().removeClass('selected')
                }else{
                    $('.selected').find('.songName').prepend('<img style=\'margin-right: 5px;\' src="pic/wave.gif" alt="">');
                    $('.selected').find('.fa-play-circle').removeClass('fa-play-circle').addClass('fa-pause-circle');
                }
            }
            //控制歌曲播放
        }else{
            // 当暂停时改变正在播放歌曲的样式
                //改变播放状态样式
            $('.selectAndplay_play').children('.fa-pause').removeClass('fa-pause').addClass('fa-play')

            $('.song').find('.fa-pause-circle').removeClass('fa-pause-circle').addClass('fa-play-circle')
                //移除播放动图
            $('.song').find('.fa-pause-circle').parents('.oprate_list').siblings('.songName').children('img').remove()
                //删除选中状态
            $('.song').find('img').remove()
        }
        getSongSource()
    })
    //改变进度条的时间与演唱者和歌曲名,改变背景图片
    function change(){
        //改变歌曲信息
        var songTimeValue=$('.selected').find('.Time').children('span').html();
        var songSingerValue=$('.selected').find('.Singer').html();
        var songNameValue=$('.selected').find('.songName').children('span').html();
        $('.bottom').find('.total').html(songTimeValue)
        $('.bottom').find('.singer').html(songSingerValue)
        $('.bottom').find('.songName').html(songNameValue)
        
    }

    //喜欢与取消喜欢
        //歌曲
    $('.songList').delegate('.fa-heart-o','click',function(){
        $(this).removeClass('fa-heart-o').addClass('fa-heart');
        IsLike()
    })
    $('.songList').delegate('.fa-heart','click',function(){
        $(this).removeClass('fa-heart').addClass('fa-heart-o');
        IsLike()
    })
        //底部
    $('.bottom').delegate('.fa-heart-o','click',function(){
        $(this).removeClass('fa-heart-o').addClass('fa-heart');
        $('.songList').find('.fa-check-square').parents('.song').find('.fa-heart-o').removeClass('fa-heart-o').addClass('fa-heart')
    })
    $('.bottom').delegate('.fa-heart','click',function(){
        $(this).removeClass('fa-heart').addClass('fa-heart-o');
        $('.songList').find('.fa-check-square').parents('.song').find('.fa-heart').removeClass('fa-heart').addClass('fa-heart-o')
    })

    //上一首和下一首
    
    //上一首
    $('.bottom').find('.fa-step-backward').click(function(){
        var NoSong=$('.selected').index();
        NoSong=NoSong-1
        var ListLength=$('.songList').find('.song').length;
        var prevone;
        if (NoSong<0){
            NoSong=parseInt(ListLength)-1
        }
        prevone=$('.songList').find('.song').eq(NoSong).find('.fa-play-circle')
        playother(prevone)
    })
    //下一首
    $('.bottom').find('.fa-step-forward').click(function(){
        var NoSong=$('.selected').index();
        NoSong=NoSong+1
        var ListLength=$('.songList').find('.song').length;
        var nextone
        if (NoSong==ListLength){
            NoSong=0
        }
        nextone=$('.songList').find('.song').eq(NoSong).find('.fa-play-circle')
        playother(nextone)
    })
    function playother(other){
        
        $(other).removeClass('fa-play-circle').addClass('fa-pause-circle');
        $(other).parents('.song').addClass('selected');
        //添加播放动画
        $(other).parents('.oprate_list').siblings('.songName').prepend('<img style=\'margin-right: 5px;\' src="pic/wave.gif" alt="">')
        //控制兄弟变化
        $(other).parents('.song').siblings().find('.songName').find('img').remove()
        $(other).parents('.song').siblings().find('.fa-pause-circle').removeClass('fa-pause-circle').addClass('fa-play-circle')
        $(other).parents('.song').siblings('.selected').removeClass('selected')
        // 控制底部播放按钮变化
        $('.selectAndplay_play').children('i').removeClass('fa-play').addClass('fa-pause')
        change()
        getSongSource()
    }

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





    
})
/* <ul class="song">
    <li class="Name">
        <a class='number' href="javascript:;">
            <i class="fa fa-check-square-o" aria-hidden="true"></i>
        </a> 
        <div class='songName'>
        <span>data.name</span>
        </div><div class="oprate_list">
            <a href="javaScript:;" class="play" title="播放">
                <i class="fa fa-play-circle" aria-hidden="true"></i>
            </a>
            <a href="javaScript:;" class="collect" title="收藏">
                <i class="fa fa-heart-o" aria-hidden="true"></i>
            </a>
            <a href="javaScript:;" class="download" title="下载">
                <i class="fa fa-download" aria-hidden="true"></i>
            </a>
        </div>
    </li>
    <li class="Singer">'+data.singer+'</li>
    <li class="Time">
        <span>'+data.time+'</span>
        <a href="javascript:;">
            <i class="fa fa-trash-o" aria-hidden="true"></i>
        </a>
    </li>
</ul> */
