import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.css'
// 實作寫在這裡！
import Cart from './cart'
import Cart_item from './cart_item'
import { build_item_list } from './ui';

const cart = new Cart();

const renderUi = function(){
  const result = build_item_list(cart);
  document.querySelector('.cart tbody').innerHTML = result;
  document.querySelector('.cart .total-price').textContent = '$' + cart.total_price();
  //移除項目
  const btn_remove = document.querySelectorAll('.remove-item-btn');
  btn_remove.forEach( function(e){
    e.addEventListener('click', (e) =>{
      cart.remove_item_id(e.currentTarget.dataset['id']);
      renderUi();
    })
  })
  update_cart();
}

function update_cart(){
  //手動調整數量
  const inputs = document.querySelectorAll('input');
  inputs.forEach( input => {
    input.addEventListener('change', (e) => {
      let input_value = e.target.value
      let quantity = input_value;

      const item_tr = e.target.parentElement.parentElement;
      const price = item_tr.querySelector('.price').textContent.replace('$', '');
      item_tr.querySelector('.subtotal').innerText = `$${quantity * price}`;
      
      cart_total_price()
    });
  })
}

function cart_total_price(){
  //重新計算更新後的總價錢
  let total = 0;
  const tr_item = document.querySelectorAll('.tr_item');
  tr_item.forEach(item => {
    let subtotal = parseFloat(item.querySelector('.subtotal').textContent.replace('$', ''));
    total += subtotal;
  })
  document.querySelector('.total-price').innerText = '$' + Math.round(total * 100)/100;
}

function add_to_cart (btn){
  btn.addEventListener('click', (e) => {
    const card = e.currentTarget.parentElement.parentElement;
    const price = parseFloat(card.querySelector('p').textContent.replace('$', ''));
    const title = card.querySelector('.card-title').textContent;
    const id = card.dataset['productId'];
    
    //加入購物車
    const item = new Cart_item( {id, title, price} );
    cart.add(item);
    renderUi();
  })
}

document.addEventListener('DOMContentLoaded', ()=>{
  const btn_add = document.querySelectorAll('.card .btn');
  btn_add.forEach(add_to_cart);
  //清空購物車
  document.querySelector('.empty-cart').addEventListener('click',() => {
    cart.empty();
    renderUi();
  })
})