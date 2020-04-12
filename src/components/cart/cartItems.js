import products from '../allProducts'

 function cartItems() {
    let fullCart = [];
    let itemcount = 0;
    let cartStorage = localStorage.getItem("cart").split(", ");
    // setItemCount(cartStorage.length)
    itemcount = cartStorage.length
    console.log(cartStorage.length)
    cartStorage.forEach((num) => {

      if (fullCart.find((obj) => obj.id == num)) {
        products.find((obj) => obj.id == num && obj.quanity++);
        console.log(num);
      } else {
        let product = products.find((obj) => obj.id == num);
        product.quanity = 1;
        fullCart.push(product);
      }
    });
    // setCart(fullCart);
    console.log(fullCart);
    return fullCart
}

export {cartItems}
