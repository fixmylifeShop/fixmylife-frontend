import React from "react";
import Products from "../allProducts";
import Banner from "../banner.js";


export default function HomePage(props) {
  return (
    <div>
      <Banner home={true}/>
      <Products products={props.products} slice={6} />
    </div>
  );
}
