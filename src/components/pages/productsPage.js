import React from "react";
import Products from "../allProducts";
import Banner from "../banner.js";

export default function ProductsPage(props) {
  return (
    <div>
      <Banner title="PRODUCTS"/>
      <Products products={props.products} />
    </div>
  );
}
