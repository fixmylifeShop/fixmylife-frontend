import React from "react";
// import products from "./products.json";
import { Link } from "react-router-dom";
import Currency from './currency'

export default function AllProducts(props) {
  let products = props.products;

  const card = (product) => {
    return (
      <Link
        className="card"
        to={{ pathname: `/product/${product.id}`, state: { product: "hello" } }}
      >
        <div className="imgcontainer">
          <img src={product.img} className="cardImg" alt="product" />
          <div className="hover-message">Shop now</div>
        </div>
        <p>{Currency(product.price)}</p>
        <p> {product.name.toUpperCase()}</p>
      </Link>
    );
  };

  const pageLimit = () => {
    if (props.slice) {
      return products.slice(0, props.slice).map((product) => {
        return card(product);
      });
    } else {
      return products.map((product) => {
        return card(product);
      });
    }
  };

  return <div className="cardContainer">{pageLimit()}</div>;
}
