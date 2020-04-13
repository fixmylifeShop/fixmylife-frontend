import React, { useState } from "react";
import Banner from "../banner.js";
import { Link } from "react-router-dom";
import Currency from "../currency.js";
import Allproducts from "../allProducts";
import { useHistory } from "react-router-dom";
import CancelIcon from "@material-ui/icons/Cancel";

export default function CartPage(props) {
  const [quantity, setQuantity] = useState();
  let history = useHistory();

  const editCart = (id) => {
    let array = [];
    let localCart = localStorage.getItem("cart");
    localCart
      .split(",")
      .filter((num) => num != id)
      .forEach((num) => {
        if (num) {
          array.push(Number(num));
        }
      });
    return array;
  };

  const deleteItem = (id) => {
    if (props.cart.items.length <= 1) {
      localStorage.removeItem("cart");
    } else {
      let array = editCart(id);
      localStorage.setItem("cart", array);
      console.log(array);
    }
    props.setCartChange(true);
  };

  console.log(quantity);
  const handleChange = (e) => {
    setQuantity(e.target.value);
  };

  const editQuantity = (id, count) => {
    if (Number.isInteger(parseInt(count))) {
      let array = editCart(id);
      for (let i = 0; i < count; i++) array.push(id);
      localStorage.setItem("cart", array);
      console.log(array);
      props.setCartChange(true);
    }
  };

  const card = (product) => {
    return (
      <div className="cartCard">
        <div
          className="cartCardImageContainer"
          style={{ backgroundImage: `url(${product.img})` }}
        >
          <button onClick={() => deleteItem(product.id)}>
            <CancelIcon fontSize="medium" />
          </button>
        </div>
        <div className="cartCardDescription">
          <div>
            <p className="cartCardCurrency">{Currency(product.price)}</p>
            <p className="cartCardName"> {product.name.toUpperCase()}</p>
            <p className="cartCartOption"> 3</p>
          </div>
        </div>
        <div className="cartCardQuantityContainer">
          <form
            className="quantityContainer"
            onSubmit={() => editQuantity(product.id, quantity || product.id)}
            
          >
            <span>QTY. </span>
            <input
              placeholder={product.quantity}
              onChange={handleChange}
              // onMouseDown={() => editQuantity(product.id, quantity || product.id)}
              name="password"
            />

            {/* <button
              onClick={() => {
                editQuantity(product.id, 3);
              }}
            >
              {product.quantity}
            </button> */}
          </form>
        </div>
      </div>
    );
  };
  const cartContent = () => {
    if (props.cart.items) {
      return props.cart.items.map((product) => {
        return card(product);
      });
    } else {
      return (
        <p className="emptyCartText">
          Your cart is empty! Sounds like a good time to
          <Link to="/products"> start shopping</Link>.
        </p>
      );
    }
  };
  console.log(props.cart.subtotal);
  return (
    <div>
      <Banner title="Cart" />
      <div className="cartContainer">
        {cartContent()}
        <div className={props.cart.items ? "cartSubtotal" : "hidden"}>
          SUBTOTAL {Currency(props.cart.subtotal)}
        </div>
        <div className={props.cart.items ? "cartOptions" : "hidden"}>
          <button
            onClick={() => {
              history.push("/products");
            }}
          >
            CONTINUE SHOPPING
          </button>
          <button>CHECKOUT</button>
        </div>
      </div>
    </div>
  );
}
