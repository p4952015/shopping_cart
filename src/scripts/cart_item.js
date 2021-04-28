class Cart_item{
  constructor ( {id, title, price, quantity = 1} ){
    this.id = id;
    this.title = title;
    this.price = price;
    this.quantity = quantity;
  }
  increment( n = 1 ){
    this.quantity += n;
  }
  //單價小計
  subtotal_price(){
    return this.price * this.quantity;
  }

}

export default Cart_item
