let num=0
let products = []
function dataUrl() {
    let url = location.href
    let index = url.indexOf('?')
    let subUrl = url.substring(index + 1)
    let id = subUrl.split('=')[1]
    return id
}

function productdata(){
    let id = dataUrl()
    $.ajax({
        type: 'get',
        url: 'https://www.xiongmaoyouxuan.com/api/detail',
        data: {
            id: id
        },
        success: function (data) {
            let shopForm = data.data.detail
            let shopproduct={
                id:dataUrl(),
                name:shopForm.title,
                picture:shopForm.thumbnail,
                price:shopForm.price,
                num:'0',
                singlePrice:'0',
                state:'false'
            }
            products =JSON.parse(localStorage.getItem('products'))
            console.log(products) 
            products.push(shopproduct)
             autoAdd()
            localStorage.setItem('products', JSON.stringify(products)) 
        },
        error: function (err) {
            alert('网络错误')
        }
    })
   
     
   
}
//添加数据数组添加

function autoAdd() {
    let stateAll = false
    let str = `
     <tr>
     <th><input type="checkbox" class="checkbox-all"${stateAll ? 'checked' : ''}>全选</th>
     <th>序号</th>
     <th>商品图片</th>
     <th>商品信息</th>
     <th>单价</th>
     <th>数量</th>
     <th>总价</th>
     <th>操作</th>
 </tr>
     `
    products.forEach((itme, inedx) => {
        str += `
        <tr>
        <td><input type="checkbox" class="checkbox-item" ${itme.state ? 'checked' :''}></td>
        <td class='id' inedx='${inedx}'>${inedx + 1}</td>
        <td><img src="${itme.picture}" alt="无图片"></td>
        <td>${itme.name}</td>
        <td>￥${itme.price}</td>
        <td><input type="button" name="minus" value="-" ${itme.num <= 0 ? 'disabled' : ''}><input type="text" name="amount" value="${itme.num}"><input
                type="button" name="plus" value="+"></td>
        <td class="TotalPrice">￥${itme.singlePrice}</td>
        <td><a href="#" class="Collection">移入收藏</a><br><a href="#" class="delete">删除</a></td>
        </tr>
        `
    })
    let tableEgl = document.querySelector('table')
    tableEgl.innerHTML = str

}
//手动添加
function Manual() {
    var addbookbtnEgl = document.querySelector('#addbookbtn')
    var booknameEgl = document.querySelector('input[ name="bookname"]')
    var bookpriceEgl = document.querySelector('input[ name="bookprice"]')
    var bookpictureEgl = document.querySelector('input[ name="bookpicture"]')
    addbookbtnEgl.onclick = function () {
        let name = booknameEgl.value
        let picture = bookpictureEgl.value
        let price = bookpriceEgl.value
        let id = products.length + 1//注意删除不会改变数组里的id号
        let num = 1//为了第一次添加时数量为1
        let singlePrice = (price * num).toFixed(2)//可以进行第一次计算
        let product = {
            id, name, picture, price, num, singlePrice, state: false
        }
        products.push(product)
        stateAll = false
        TotalPriceOfGoods()//商品总价
        autoAdd()

    }

}
//_______________________________________________________________________________________________
//点击事件
function ClickEvent() {
    var tableEgl = document.querySelector('table')
    tableEgl.addEventListener('click', function (e) {
        e = e || window.event
        let target = e.target || e.srcElement
        //删除
        if (target.getAttribute('class') == 'delete') {
            let product = target.parentNode.parentNode.firstElementChild.nextElementSibling.getAttribute('inedx')//因为在模板字符串里给id自定义了一个自己对象的下标属性
            products.splice(product, 1)
            autoAdd()//重新新加载
            TotalPriceOfGoods()//商品总价
            console.log(products)
        }
        //加数量
        if (target.getAttribute('name') == 'plus') {
            let product = target.parentNode.parentNode.firstElementChild.nextElementSibling.getAttribute('inedx')//因为在模板字符串里给id自定义了一个自己对象的下标属性
            products[product].num++
            products[product].singlePrice = (products[product].num * products[product].price).toFixed(2)
            autoAdd()//重新新加载
            TotalPriceOfGoods()//商品总价
        }
        //减数量
        if (target.getAttribute('name') == 'minus') {
            let product = target.parentNode.parentNode.firstElementChild.nextElementSibling.getAttribute('inedx')//因为在模板字符串里给id自定义了一个自己对象的下标属性
            products[product].num--
            products[product].singlePrice = (products[product].num * products[product].price).toFixed(2)
            autoAdd()//重新新加载
            TotalPriceOfGoods()//商品总价
        }
        //全选框
        if (target.getAttribute('class') == 'checkbox-all') {
            //console.log(products)
            stateAll = !stateAll//点击后取反
            if (stateAll) {
                products.forEach((item) => (item.state = true))
            } else {
                products.forEach((item) => (item.state = false))
            }
            autoAdd()
            TotalPriceOfGoods()
        }
        //单选框全选
        if (target.getAttribute('class') == 'checkbox-item') {
            let product = target.parentNode.parentNode.firstElementChild.nextElementSibling.getAttribute('inedx')//因为在模板字符串里给id自定义了一个自己对象的下标属性
            products[product].state = !products[product].state//点击后取反
            stateAll = products.every(function (item) {
                return item.state == true
            })
            autoAdd()
            TotalPriceOfGoods()
        }
    })
}
//_____________________________________________________________________________________________________________________________________________________________
//添加数量事件
function addTo() {
    let tableEgl = document.querySelector('table')
    tableEgl.addEventListener('change', function (e) {
        e = e || window.event//事件对象
        let target = e.target || e.srcElement// 事件目标对象
        if (target.getAttribute('name') == 'amount') {
            let product = target.parentNode.parentNode.firstElementChild.nextElementSibling.getAttribute('inedx')//因为在模板字符串里给id自定义了一个自己对象的下标属性
            if (target.value == 0 || target.value < 0) {
                alert('请输入大于0的数')
                target.value = products[product].num
                return
            }
            products[product].num = target.value
            products[product].singlePrice = (products[product].num * products[product].price).toFixed(2)
            autoAdd()//重新新加载
            TotalPriceOfGoods()//商品总价
        }
    })
}
//______________________________________________________________________________________________________________
//商品总价
function TotalPriceOfGoods() {
    let TotalPriceEgl = document.querySelector('#TotalPriceOfGoods')
    //从数组对象里求和（关于.reduce的用法）
    let sum = products.reduce((s, cur) => (s + Number(cur.singlePrice)), 0)
    TotalPriceEgl.innerHTML = '￥' + sum
}
// window.onunload=()=>{
//     localStorage.clear()
// }
dataUrl()

productdata()
autoAdd()
ClickEvent()
addTo()


