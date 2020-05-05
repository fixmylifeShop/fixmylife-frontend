import React, { useState } from "react";
import Banner from "../banner.js";
import { Link } from "react-router-dom";
import Currency from "../currency.js";
import { useHistory } from "react-router-dom";
import CancelIcon from "@material-ui/icons/Cancel";
import PaypalCheckoutButton from "../paypal/paypal";
import Dialog from "@material-ui/core/Dialog";

export default function CartPage(props) {
  const [quantity, setQuantity] = useState();
  const [open, setOpen] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState();
  let history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const editCart = (id) => {
    let array = [];
    let localCart = localStorage.getItem("cart");
    localCart
      .split(",")
      .filter((num) => num != id)
      .forEach((num) => {
        if (num) {
          array.push(num);
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
          style={{ backgroundImage: `url(${product.image})` }}
        >
          <button onClick={() => deleteItem(product.id)}>
            <CancelIcon fontSize="medium" />
          </button>
        </div>
        <div className="cartCardDescription">
          <div>
            <p className="cartCardCurrency">{Currency(product.price)}</p>
            <p className="cartCardName"> {product.product_name.toUpperCase()}</p>
            <p className="cartCartOption">
              {product.choice ? product.choice : ""}
            </p>
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
          </form>
        </div>
      </div>
    );
  };
  const cartContent = () => {
    if (props.cart.items && localStorage.getItem("cart")) {
      return props.cart.items.map((product) => {
        return card(product);
      });
    }
    if (purchaseComplete) {
      return (
        <p className="emptyCartText">
          Thank your for your order.
          {/* <Link to="/products"> Return to </Link>. */}
        </p>
      );
    } else {
      return (
        <p className="emptyCartText">
          Your cart is empty! Sounds like a good time to
          <Link to="/products"> start shopping</Link>.
        </p>
      );
    }
  };

  return (
    <div>
      <Banner title="Cart" />
      <div className="cartContainer">
        {cartContent()}
        <div
          className={
            props.cart.items && localStorage.getItem("cart")
              ? "cartTotalCheckout"
              : "hidden"
          }
        >
          <div className="cartSubtotal">
            SUBTOTAL {Currency(props.cart.subtotal)}
          </div>
          <div className="cartOptions">
            <button
              onClick={() => {
                history.push("/products");
              }}
            >
              CONTINUE SHOPPING
            </button>
            {/* <CustomizedDialogs total={props.cart.subtotal} /> */}
            <button onClick={handleClickOpen}>CHECKOUT</button>
            <Dialog
              onClose={handleClose}
              // aria-labelledby="customized-dialog-title"
              open={open}
            >
              <PaypalCheckoutButton
                total={props.cart.subtotal}
                handleClose={handleClose}
                setPurchaseComplete={setPurchaseComplete}
              />
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
