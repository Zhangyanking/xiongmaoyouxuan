"use strict";var num=0,products=[];function dataUrl(){var t=location.href,e=t.indexOf("?");return t.substring(e+1).split("=")[1]}function productdata(){var t=dataUrl();$.ajax({type:"get",url:"https://www.xiongmaoyouxuan.com/api/detail",data:{id:t},success:function(t){t=t.data.detail,t={id:dataUrl(),name:t.title,picture:t.thumbnail,price:t.price,num:"0",singlePrice:"0",state:"false"};products=JSON.parse(localStorage.getItem("products")),console.log(products),products.push(t),autoAdd(),localStorage.setItem("products",JSON.stringify(products))},error:function(t){alert("网络错误")}})}function autoAdd(){var n='\n     <tr>\n     <th><input type="checkbox" class="checkbox-all">全选</th>\n     <th>序号</th>\n     <th>商品图片</th>\n     <th>商品信息</th>\n     <th>单价</th>\n     <th>数量</th>\n     <th>总价</th>\n     <th>操作</th>\n </tr>\n     ';products.forEach(function(t,e){n+='\n        <tr>\n        <td><input type="checkbox" class="checkbox-item" '+(t.state?"checked":"")+"></td>\n        <td class='id' inedx='"+e+"'>"+(e+1)+'</td>\n        <td><img src="'+t.picture+'" alt="无图片"></td>\n        <td>'+t.name+"</td>\n        <td>￥"+t.price+'</td>\n        <td><input type="button" name="minus" value="-" '+(t.num<=0?"disabled":"")+'><input type="text" name="amount" value="'+t.num+'"><input\n                type="button" name="plus" value="+"></td>\n        <td class="TotalPrice">￥'+t.singlePrice+'</td>\n        <td><a href="#" class="Collection">移入收藏</a><br><a href="#" class="delete">删除</a></td>\n        </tr>\n        '}),document.querySelector("table").innerHTML=n}function Manual(){var t=document.querySelector("#addbookbtn"),u=document.querySelector('input[ name="bookname"]'),d=document.querySelector('input[ name="bookprice"]'),a=document.querySelector('input[ name="bookpicture"]');t.onclick=function(){var t=u.value,e=a.value,n=d.value,o=products.length+1,r=(+n).toFixed(2);products.push({id:o,name:t,picture:e,price:n,num:1,singlePrice:r,state:!1}),stateAll=!1,TotalPriceOfGoods(),autoAdd()}}function ClickEvent(){document.querySelector("table").addEventListener("click",function(t){var e,n=(t=t||window.event).target||t.srcElement;"delete"==n.getAttribute("class")&&(t=n.parentNode.parentNode.firstElementChild.nextElementSibling.getAttribute("inedx"),products.splice(t,1),autoAdd(),TotalPriceOfGoods(),console.log(products)),"plus"==n.getAttribute("name")&&(e=n.parentNode.parentNode.firstElementChild.nextElementSibling.getAttribute("inedx"),products[e].num++,products[e].singlePrice=(products[e].num*products[e].price).toFixed(2),autoAdd(),TotalPriceOfGoods()),"minus"==n.getAttribute("name")&&(e=n.parentNode.parentNode.firstElementChild.nextElementSibling.getAttribute("inedx"),products[e].num--,products[e].singlePrice=(products[e].num*products[e].price).toFixed(2),autoAdd(),TotalPriceOfGoods()),"checkbox-all"==n.getAttribute("class")&&(stateAll=!stateAll,stateAll?products.forEach(function(t){return t.state=!0}):products.forEach(function(t){return t.state=!1}),autoAdd(),TotalPriceOfGoods()),"checkbox-item"==n.getAttribute("class")&&(n=n.parentNode.parentNode.firstElementChild.nextElementSibling.getAttribute("inedx"),products[n].state=!products[n].state,stateAll=products.every(function(t){return 1==t.state}),autoAdd(),TotalPriceOfGoods())})}function addTo(){document.querySelector("table").addEventListener("change",function(t){var e=(t=t||window.event).target||t.srcElement;if("amount"==e.getAttribute("name")){t=e.parentNode.parentNode.firstElementChild.nextElementSibling.getAttribute("inedx");if(0==e.value||e.value<0)return alert("请输入大于0的数"),void(e.value=products[t].num);products[t].num=e.value,products[t].singlePrice=(products[t].num*products[t].price).toFixed(2),autoAdd(),TotalPriceOfGoods()}})}function TotalPriceOfGoods(){var t=document.querySelector("#TotalPriceOfGoods"),e=products.reduce(function(t,e){return t+Number(e.singlePrice)},0);t.innerHTML="￥"+e}dataUrl(),productdata(),autoAdd(),ClickEvent(),addTo();