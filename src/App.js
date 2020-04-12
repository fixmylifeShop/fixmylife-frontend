import React, { useState, useEffect } from "react";
import "./CSS/App.css";
import products from "./components/products.json";
import { Route } from "react-router-dom";
import { Footer, Header } from "./components/navigations/";
import {
  ContactPage,
  IndividualProductPage,
  CartPage,
  ProductsPage,
  Homepage,
  InstagramPage,
} from "./components/pages";

function App() {
  const [cart, setCart] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const [cartChange, setCartChange] = useState(false);

  const getTotal = (fullCart) => {
    let subtotal = 0;
    fullCart.forEach((product) => {
      let itemTotal = product.price * product.quantity;
      subtotal = subtotal + itemTotal;
    });
    return subtotal;
  };

  useEffect(() => {
    cartItems();
    setCartChange(false);
  }, [cartChange]);

  const cartItems = () => {
    let fullCart = [];
    let localCart = localStorage.getItem("cart");

    if (localCart) {
      let cartStorage = localCart.split(",");
      setItemCount(cartStorage.length);
      cartStorage.forEach((num) => {
        if (fullCart.find((product) => product.id == num)) {
          fullCart.find((product) => {
            product.id == num && product.quantity++;
          });
        } else {
          let product = products.find((obj) => obj.id == num);
          product.quantity = 1;
          fullCart.push(product);
        }
      });
      getTotal(fullCart);
      setCart({ items: fullCart, subtotal: getTotal(fullCart) });
      // console.log(cart);
    } else {
      setCart(false);
      setItemCount(0);
    }
  };

  return (
    <div className="App">
      <Header itemCount={itemCount} />
      <Route
        exact
        path="/"
        component={() => <Homepage products={products} />}
      />
      <Route
        exact
        path="/products"
        component={() => <ProductsPage products={products} />}
      />
      <Route
        exact
        path="/cart"
        component={() => (
          <CartPage
            cart={cart}
            itemCount={itemCount}
            setCartChange={setCartChange}
          />
        )}
      />
      <Route
        path="/product/:id"
        component={() => (
          <IndividualProductPage
            products={products}
            setCartChange={setCartChange}
          />
        )}
      />
      <Route exact path="/contact" component={() => <ContactPage />} />
      <Route exact path="/instagram" component={() => <InstagramPage />} />
      <Footer />
    </div>
  );
}

export default App;
