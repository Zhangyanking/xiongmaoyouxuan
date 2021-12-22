class Enlarge {
    //节点
    constructor(id) {
        this.centerEvl = document.querySelector(id)
        this.pictureEvl = this.centerEvl.querySelector('.picture')
        this.pictureImgEvl = this.centerEvl.querySelector('.picture>img')
        this.coverEvl = this.centerEvl.querySelector('.cover')
        this.rightEvl = this.centerEvl.querySelector('.right')
        this.rightimgEvl = this.centerEvl.querySelector('.right>img')
        this.listEvl = this.centerEvl.querySelector('.list')
        this.listImgEvl = this.centerEvl.querySelectorAll('.list>img')
        this.listImgEvlFirst = this.listEvl.firstElementChild
        

    }
    //放大镜移动功能
    move() {
        //移动事件
        this.pictureEvl.onmousemove = (e) => {
            //放大镜移动
            e = e || window.event
            let x = e.offsetX - this.coverEvl.offsetWidth / 2
            let y = e.offsetY - this.coverEvl.offsetHeight / 2
            if (x < 0) {
                x = 0
            }
            if (x > this.pictureEvl.offsetWidth - this.coverEvl.offsetWidth) {
                x = this.pictureEvl.offsetWidth - this.coverEvl.offsetWidth
            }
            if (y < 0) {
                y = 0
            }
            if (y > this.pictureEvl.offsetHeight - this.coverEvl.offsetHeight) {
                y = this.pictureEvl.offsetHeight - this.coverEvl.offsetHeight
            }
            this.coverEvl.style.left = x + 'px'
            this.coverEvl.style.top = y + 'px'
            //放大图移动
            /**
  *
  * 计算背景图比例
  *   遮罩层mask            放大镜bigGlass
  *  ---------------   =   ------------------
  *   显示图片showbox        背景图bigPicBox
  *
  *   背景图片bigpicbox = 放大镜bigGlass*显示图片showbox/遮罩层mask
  */
            let a = this.pictureEvl.offsetWidth / this.coverEvl.offsetWidth
            let b = this.pictureEvl.offsetHeight / this.coverEvl.offsetHeight
            let picturewidth = this.rightEvl.offsetWidth * a
            let pictureheight = this.rightEvl.offsetHeight * b
            this.rightimgEvl.style.width = picturewidth + "px"
            this.rightimgEvl.style.height = pictureheight + "px"
            let pictureX = a * x * -1
            let pictureY = b * y * -1
            this.rightimgEvl.style.left = pictureX + 'px'
            this.rightimgEvl.style.top = pictureY + 'px'
        }
        //移入事件
        this.pictureEvl.onmouseover = () => {
           let src= this.pictureImgEvl.getAttribute('src')
           this.rightimgEvl.setAttribute('src', src)
            this.coverEvl.style.display = 'block'
            this.rightEvl.style.display = 'block'
        }
        //移出事件
        this.pictureEvl.onmouseout = () => {
            this.coverEvl.style.display = 'none'
            this.rightEvl.style.display = 'none'
        }
    }
    //切换功能
    //点击功能
    switch() {
        this.listEvl.addEventListener('click', (e) => {
            e = e || window.event
            let target = e.target || e.srcElement
            transfer.eliminate()
            let src = target.getAttribute('src')
           
            this.pictureImgEvl.setAttribute('src', src)
            this.rightimgEvl.setAttribute('src', src)
           
            
        })
    }
    //消除功能
    eliminate() {
        for (let i = 0; i < this.listImgEvl.length; i++) {
            this.listImgEvl[i].classList.remove('p1')
        }
    }
    //id号
    dataUrl() {
        let url = location.href
        let index = url.indexOf('?')
        let subUrl = url.substring(index + 1)
        let id = subUrl.split('=')[1]
        return id
    }
    // 数据提取和渲染
    data() {
        let id = transfer.dataUrl()
        $.ajax({
            type: 'get',
            url: 'https://www.xiongmaoyouxuan.com/api/detail',
            data: {
                id: id
            },
            success: function (data) {
                let shopForm = data.data.detail
                let photoForm = data.data.detail.photo
                /*图片部分*/
                let Default = photoForm[0].url
                $('.picture>img').attr('src', Default)
                let htmlphoto = template('index-1', { photoForm })
                $('.list').html(htmlphoto)
                $('.photo').html(htmlphoto)
                /*文字部分*/
                let htmlTxt = template('index-2',shopForm)
                $('.text>.box2').html(htmlTxt)
            },
            error: function (err) {
                alert('网络错误')
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

}
let transfer = new Enlarge('#conten')
transfer.move()
transfer.switch()
transfer.dataUrl()
transfer.data()
transfer.bcakTop()
//点击跳转
function extract() {
    location.href='../pages/Shopping.html?id='+transfer.dataUrl()

 }
