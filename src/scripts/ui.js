function build_item_list (cart) {
  const r = cart.items.map( item => {
    return `
    <tr class="tr_item">
      <td>${item.title}</td>
      <td><input type="number" min="1" class="quantity" value="${item.quantity}"></td>
      <td class="price">$ ${item.price}</td>
      <td class="subtotal">$ ${item.subtotal_price()}</td>
      <td><button data-id="${item.id}" class="remove-item-btn btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td>
    </tr>`
  })
  return r.join('');
}

export { build_item_list }