import React, { useState, useEffect } from "react";
import "./CSS/App.css";
// import products from "./components/products.json";
import { Route, useLocation, useHistory } from "react-router-dom";
import { Footer, Header } from "./components/navigations/";
import axios from "axios";
import {
  axiosWithAuth,
  axiosViewsSession,
} from "./components/config/axiosConfig";
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
  const [cart, setCart] = useState([]);
  const [cartInfo, setCartInfo] = useState({ itemCount: 0, subtotal: 0 });
  const [search, setSearch] = useState(false);
  let history = useHistory();
  const { pathname } = useLocation();
  console.log("cart", cart);
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
    axiosViewsSession();
    getCart();
    getTotal(cart);
  }, [pathname]);

  console.log(cartInfo);
  const getTotal = (e) => {
    let subtotal = 0;
    let itemsCount = 0;
    e.forEach((product) => {
      itemsCount += product.quantity;
      let itemTotal = product.price * product.quantity;
      subtotal = subtotal + itemTotal;
    });
    setCartInfo({ subtotal, itemsCount });
  };

  const getCart = () => {
    axiosWithAuth()
      .get("/cart/")
      .then((res) => {
        if (!res.data.message) {
          setCart(res.data);
          console.log(res.data);
          getTotal(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const addToCart = (update, push) => {
    axiosWithAuth()
      .post("/cart/", update)
      .then((res) => {
        getCart();
        // setCartChange(true);
        if (push) {
          history.push("/cart");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <Header cartInfo={cartInfo} setSearch={setSearch} />
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
            addToCart={addToCart}
            cartInfo={cartInfo}
            setCart={setCart}
          />
        )}
      />
      <Route
        path="/product/:id"
        component={() => (
          <IndividualProductPage
            addToCart={addToCart}
            cart={cart}
            setCart={setCart}
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
