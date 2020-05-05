import React, { useState, useEffect } from "react";
import "./CSS/App.css";
// import products from "./components/products.json";
import { Route, useLocation } from "react-router-dom";
import { Footer, Header } from "./components/navigations/";
import axios from "axios";
import {
  ContactPage,
  IndividualProductPage,
  CartPage,
  ProductsPage,
  Homepage,
  InstagramPage,
} from "./components/pages";

function App() {
  const [products, setProducts] = useState(false);
  const [cart, setCart] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const [cartChange, setCartChange] = useState(false);
  const [search, setSearch] = useState(false);
  const { pathname } = useLocation();
  // console.log(search);
  // console.log("new cart", newCart);
  if (!products) {
    axios
      .get(
        `${process.env.REACT_APP_DOMAIN_NAME}/shops/${process.env.REACT_APP_USER_ID}`
      )
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const getTotal = (fullCart) => {
    let subtotal = 0;
    fullCart.forEach((product) => {
      let itemTotal = product.price * product.quantity;
      subtotal = subtotal + itemTotal;
    });
    return subtotal;
  };
  useEffect(() => {
    if (products) {
      cartItems();
    }
    setCartChange(false);
  }, [cartChange, localStorage.getItem("cart"), products]);

  const cartItems = () => {
    let fullCart = [];
    let localCart = localStorage.getItem("cart");

    if (localCart) {
      let cartStorage = localCart.split(",");
      setItemCount(cartStorage.length);
      console.log(localCart);

      cartStorage.forEach((id) => {
        if (fullCart.find((product) => product.id == 1)) {
          fullCart.find((product) => {
            product.id == id && product.quantity++;
            console.log("hello");
          });
        } else {
          let product = products.filter((obj) => obj.id == id);
          if (product) {
            product[0].quantity = 1;
            fullCart.push(product[0]);
            console.log(fullCart);
          }
        }
      });

      getTotal(fullCart);
      setCart({ items: fullCart, subtotal: getTotal(fullCart) });
      console.log(fullCart);
    } else {
      // setCart(false);
      setItemCount(0);
    }
  };

  return (
    <div className="App">
      <Header itemCount={itemCount} setSearch={setSearch} />
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
        path="/search"
        component={() => <ProductsPage products={products} search={search} />}
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
