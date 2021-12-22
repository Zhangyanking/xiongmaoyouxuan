class Title {
    constructor() {
        this.aEvl = $('.centaner a')


    }
    /*默认页面*/
    defaultPage() {
        //先做一个会话缓存sessionStorage的开关，以方便储存购物车商品数据。
        let listSwitch=sessionStorage.getItem('products')
        if(!listSwitch){
        let listShop=[]
        sessionStorage.setItem("products",JSON.stringify(listShop))
        localStorage.setItem("products",JSON.stringify(listShop))
        }
        titleAction.bcakTop()
        $("#more>.moreBut").unbind();
        $.ajax({
            type: 'get',
            url: 'https://www.xiongmaoyouxuan.com/api/tab/1',
            headers: {
                'x-platform': 'pc'
            },
            success: function (data) {
                let homePageProduct = data.data.items.list
                let bannerData = data.data.banners
                let str = titleAction.showRotation(bannerData) + titleAction.showPage(homePageProduct)
                $('aside').html(str)
                new Swiper('.swiper-container', {
                    loop: true, // 循环模式选项
                    initialSlide: 0,
                    autoplay: true, //自动轮播
                    effect: 'coverflow',
                    // 如果需要分页器
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    // 如果需要前进后退按钮
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                })
            },
            error: function (err) {
                alert('网络错误')
            }
        })
        let num = 0
        $('#more>.moreBut').one('click', function () {
            num = num + 20
            let url = 'https://www.xiongmaoyouxuan.com/api/tab/1/feeds?'
            titleAction.move(num, url)
            titleAction.scroll(num, url)
        })


    }
    /*导航点击*/
    navigationClick() {
        let _this = this
        $('.centaner').on('click', 'a', function (e) {
            _this.aEvl.removeClass('style')
            $(this).addClass('style')
            let index = 'index-' + $(this).attr('index')
            let content = template(index)
            $('aside').html(content)
        })
    }
    /* 首页 */
    index() {
        $('#index').on('click', function () {
            $('#more>p').addClass('hide')
            $('#more>.moreBut').removeClass('hide')
            $(window).unbind()
            titleAction.defaultPage()
        })
    }
    /*9块9包邮*/
    indexTwo() {
         
        $('#shipping').on('click', function () {
    
            $('#more>p').addClass('hide')
            $('#more>.moreBut').removeClass('hide')
            $("#more>.moreBut").unbind();
            $(window).unbind()
            $.ajax({
                type: 'get',
                url: 'https://www.xiongmaoyouxuan.com/api/sub_column/7/items?start=0',
                success: function (data) {
                    titleAction.bcakTop()
                    let homePageProduct = data.data.list
                    titleAction.showPage(homePageProduct)
                    let str = titleAction.showPage(homePageProduct)
                    $('aside').html(str)
                    $('#homePage-title>h2').html('9块9包邮')
                },
                error: function (err) {
                    alert('网络错误')
                }
            })
            let num = 0
            $('#more>.moreBut').on('click', function () {
                num = num + 20
                let url = 'https://www.xiongmaoyouxuan.com/api/sub_column/7/items?'
                titleAction.move(num, url)
                titleAction.scroll(num, url)
            })

        })
    }
    /*超值大额卷*/
    indexThree() {
        $('#coupon').on('click', function () {
            $('#more>p').addClass('hide')
            $('#more>.moreBut').removeClass('hide')
            $("#more>.moreBut").unbind();
            $(window).unbind()
            $.ajax({
                type: 'get',
                url: 'https://www.xiongmaoyouxuan.com/api/sub_column/174/items?start=0',
                success: function (data) {
                    titleAction.bcakTop()
                    let homePageProduct = data.data.list
                    titleAction.showPage(homePageProduct)
                    let str = titleAction.showPage(homePageProduct)
                    $('aside').html(str)
                    $('#homePage-title>h2').html('超值大额巻')
                },
                error: function (err) {
                    alert('网络错误')
                }
            })
            let num = 0
            $('#more>.moreBut').on('click', function () {
                num = num + 20
                let url = 'https://www.xiongmaoyouxuan.com/api/sub_column/174/items?'
                titleAction.move(num, url)
                titleAction.scroll(num, url)
            })

        })

    }
    /*降温穿搭*/
    indexFour() {
        $('#wear').on('click', function () {
            $('#more>p').addClass('hide')
            $('#more>.moreBut').removeClass('hide')
            $("#more>.moreBut").unbind();
            $(window).unbind()
            $.ajax({
                type: 'get',
                url: 'https://www.xiongmaoyouxuan.com/api/column/3183/items?start=0',
                success: function (data) {
                    titleAction.bcakTop()
                    let homePageProduct = data.data.list
                    titleAction.showPage(homePageProduct)
                    let str = titleAction.showPage(homePageProduct)
                    $('aside').html(str)
                    $('#homePage-title>h2').html('降温救急穿搭')
                },
                error: function (err) {
                    alert('网络错误')
                }
            })
            let num = 0
            $('#more>.moreBut').on('click', function () {
                num = num + 20
                let url = 'https://www.xiongmaoyouxuan.com/api/column/3183/items?'
                titleAction.move(num, url)
                titleAction.scroll(num, url)
            })
        })

    }
    /*搜索*/
    search() {
        $('form>.button').on('click', function () {
            $(window).unbind()
            $('#more>p').addClass('hide')
            $('#more>.moreBut').removeClass('hide')
            $("#more>.moreBut").unbind();
            let searchStr = $('form>.text').val()
            let url = `https://www.xiongmaoyouxuan.com/api/search?word=${searchStr}&start=0`
            let UrlTrans = encodeURI(url)
            $.ajax({
                type: 'get',
                url: UrlTrans,
                success: function (data) {
                    titleAction.bcakTop()
                    let homePageProduct = data.data.list
                    titleAction.showPage(homePageProduct)
                    let str = titleAction.showPage(homePageProduct)
                    $('aside').html(str)
                    $('#homePage-title>h2').html(`相关${searchStr}的搜索`)
                },
                error: function (err) {
                    alert('网络错误')
                }
            })
            let num = 0
            $('#more>.moreBut').on('click', function () {
                num = num + 20
                let url = `https://www.xiongmaoyouxuan.com/api/search?word=${searchStr}&`
                titleAction.move(num, url)
                titleAction.scroll(num, url)
            })
        })
    }
    /*更多按钮*/
    move(num, url) {
        $('#more>.moreBut').addClass('hide')
        // $('#more>.moreBut').remove()
        $.ajax({
            type: 'get',
            url: url,
            data: {
                start: `${num}`
            },
            success: function (data) {
                let homePageProduct = data.data.list
                let str = titleAction.showPagemove(homePageProduct)
                $('#homePage-contentData').append(str)
            },
            error: function (err) {
                alert('网络错误')
            }
        })
    }
    /*滚动条更多*/
    scroll(num, url) {
        let startSwitch = true
        $(window).scroll(function () {
            if ($(document).height() - $(document).scrollTop() < 800) {

                if (startSwitch == true) {
                    startSwitch = false
                    num = num + 20
                    $.ajax({
                        type: 'get',
                        url: url,
                        data: {
                            start: `${num}`
                        },
                        success: function (data) {
                            let homePageProduct = data.data.list
                            if (homePageProduct.length == 0) {
                                $('#more>p').removeClass('hide')
                                startSwitch = false
                            } else {
                                let str = titleAction.showPagemove(homePageProduct)
                                $('#homePage-contentData').append(str)
                                setTimeout(function () {
                                    startSwitch = true
                                }, 1000)
                            }
                        },
                        error: function (err) {
                            alert('网络错误')
                        }
                    })
                }
            }
        })
    }
    /*回到顶部*/
    bcakTop() {
        $(window).scroll(function () {
            if ($(document).scrollTop()>50) {
            $("#top").css('display','block')
            }else{
                $("#top").css('display','none')
            }
        })
         $("#top").on('click',function(){
                $('html,body').animate({scrollTop:0},500)
                return
            })


    }
    /*数据提取*/
    
    /* 页面渲染*/
    showPage(homePageProduct) {
        let data = { homePageProduct }
        let htmlstr = template('index-1', data)
        return htmlstr
    }
    showPagemove(homePageProduct) {
        let data = { homePageProduct }
        let htmlstr = template('index-2', data)
        return htmlstr
    }
    showRotation(bannerData) {
        titleAction.bcakTop()
        console.log('bcaktop >>>>>');
        let data = { bannerData }
        let bannerstr = template('index-0', data)
       
        return bannerstr
    }
}
let titleAction = new Title()
titleAction.defaultPage()
titleAction.navigationClick()
titleAction.index()
titleAction.indexTwo()
titleAction.indexThree()
titleAction.indexFour()
titleAction.search()
titleAction.bcakTop()
//点击跳转页面
 function extract(id) {
   location.href='../pages/Detail.html?id='+id
}
    
