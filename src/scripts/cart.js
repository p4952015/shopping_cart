class Cart{
  constructor(){
    this.items = [];
  }
  add(item){
    const find_item = this.items.find( (t) => t.id == item.id )


    if(find_item){
      find_item.increment();
    }else{
      this.items.push(item);
    }
    // console.log(this.items)
  }

  empty(){
    this.items = [];
  }

  remove_item_id(id){
    this.items = this.items.filter( (item) => item.id != id );
  }

  //總項目總計
  total_price(){
    let total = 0;
    this.items.forEach( (item) => {
      total += item.subtotal_price();
    })
    return Math.round(total * 100)/100;

    //reduce寫法(高級寫法)
    // return this.items.reduce(
    //   (total, currentItem) => total + currentItem.totalPrice(),
    //   0
    // )

  }
}

export default Cart
