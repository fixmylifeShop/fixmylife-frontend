import React from "react";
// import products from "./products.json";
import { Link } from "react-router-dom";
import Currency from "./currency";

export default function AllProducts(props) {
  let products = props.products;
  if (props.search) {
    products = props.products.filter((obj) => {
      return obj.product_name.toLowerCase().indexOf(props.search.toLowerCase()) !== -1;
    });
  }

  const card = (product) => {
    if (product) {
      return (
        <Link
          className="card"
          to={{
            pathname: `/product/${product.id}`,
            state: { product: "hello" },
          }}
        >
          <div className="imgcontainer">
            <img src={product.image} className="cardImg" alt="product" />
            <div className="hover-message">Shop now</div>
          </div>
          <p>{Currency(product.price)}</p>
          <p> {product.product_name.toUpperCase()}</p>
        </Link>
      );
    }
  };
  // console.log(
  //   products.map((product) => {
  //     return card(product);
  //   })
  // );

  // console.log(
  //   props.search &&
  //     props.products.filter((obj) => {
  //       return (
  //         obj.product_name.toLowerCase().indexOf(props.search.toLowerCase()) !== -1
  //       );
  //     }).length
  // );
  const pageLimit = () => {
    if (props.slice) {
      return products.slice(0, props.slice).map((product) => {
        return card(product);
      });
    }
    if (products.length === 0) {
      return (
        <div className="cartContainer">
          <p className="emptyCartText">No products found.</p>
        </div>
      );
    } else {
      return products.map((product) => {
        return card(product);
      });
    }
  };

  return <div className="cardContainer">{products ? pageLimit() : ""}</div>;
}
