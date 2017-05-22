$(function () {
    // 获取对像
    var fullpage=$('.fullpage');
    var slides=fullpage.children();
    // 初始化数据
    var state ={
        vh:$(window).height(),
        flag:true,
        current:0
    };
    var list=$('.list li');
    console.log(list);
    // 添加事件
   var displayN=function () {
       slides.removeClass('active')
        var value='translate3d(0,'+ -state.current*state.vh +'px,0)'
       fullpage.css('transform',value)
        list.removeClass('active').eq(state.current).addClass('active')
    };
   var next =function () {
        state.current=(state.current+1>slides.length-1) ? 0: state.current+1
        // displayN()
        state.flag=false
    };
    var prov =function () {
        state.current=(state.current-1<0) ? slides.length-1 : state.current-1
        // displayN()
        state.flag=false
    };
    var onresize=function () {
         // alert(1)
        slides.vh=$(window).height()
         console.log(slides.vh)
    };

    var  mouseScroon=function (e) {
        if(state.flag){
           if( e.originalEvent.wheelDeltaY<0){
               next()
               displayN()
           }else if(e.originalEvent.wheelDeltaY>0){
               prov()
               displayN()
           }
          slides.eq(state.current).addClass('active')
        }
    };

     var transitionend=function () {
        state.flag=true
    };

     var keydown=function (e) {
        if (state.flag){
            if(e.keyCode===40){
                next()
                displayN()
            }else if(e.keyCode===38){
                prov()
                displayN()
            }
        }
        slides.eq(state.current).addClass('active')
    };

    $(window).on('wheel',mouseScroon);
    $(window).on('keydown',keydown);
    $(window).on('resize',onresize);
    fullpage.on('transitionend',transitionend);
    // console.log(keydown)

    var btn=$('.btn-arrow');
    // console.log(btn)
    $(btn).on('click',function () {
        next();
        displayN();
        slides.eq(state.current).addClass('active');
    });
    list.on('click',function () {
        state.current =$(this).index();
        console.log($(this).index());
        // next()
        displayN();
        slides.eq(state.current).addClass('active');
        // list.eq(state.current).addClass('active')
    })
})