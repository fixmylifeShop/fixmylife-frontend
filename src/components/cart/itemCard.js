import React from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import Currency from "../currency.js";
export default function ItemCard(props) {
  const product = props.product;

  return (
    <div className="cartCard">
      <div
        className="cartCardImageContainer"
        style={{ backgroundImage: `url(${product.image})` }}
      >
        <button onClick={() => props.deleteItem(product.id)}>
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
          onSubmit={(e) => {
            // e.preventDefault();
            props.editQuantity(product.id, props.quantity || product.id);
          }}
        >
          <span>QTY. </span>
          <input
            defaultValue={parseInt(product.quantity)}
            onChange={props.handleChange}
            // onMouseDownCapture={() => editQuantity(product.id, quantity || product.id)}
          />
        </form>
      </div>
    </div>
  );
}
