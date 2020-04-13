import React, { useState, useEffect } from "react";
import Banner from "../banner.js";
import { useParams, useHistory } from "react-router-dom";
import currency from "../currency";

export default function IndividualProductPage(props) {
  const [selectOption, setSelectOption] = useState();
  let { id } = useParams();
  let history = useHistory();
  let product = props.products.find((obj) => obj.id == id);

  const addToCart = () => {
    let localCart = localStorage.getItem("cart");
    let productOption = id;
    // if (product.options) {
    //   productOption = id + "o" + selectOption;
    // }

    if (localCart) {
      localStorage.setItem("cart", `${localCart},${productOption}`);
    } else {
      localStorage.setItem("cart", productOption);
    }
    props.setCartChange(true);
    history.push("/cart");
  };

  useEffect(() => {
    if (product.options && !selectOption) {
      setSelectOption(0);
    }
  });

  const options = () => {
    if (product.options && product.options.length > 1) {
      const options = product.options;
      return (
        <select onChange={(event) => setSelectOption(event.target.value)}>
          {options.map((choice, index) => {
            return (
              <option value={index}>
                {choice[0]} {choice[1] ? " - " + currency(choice[1]) : ""}
              </option>
            );
          })}
        </select>
      );
    }
  };
  return (
    <div>
      <Banner />
      <div className="productContainer">
        <div className="productImageContainer">
          <img src={product.img} alt="product" />
        </div>

        <div className="productInfoContainer">
          <div className="product-price-title">
            <p className="product-price" >{currency(product.price)}</p>
            <p className="product-name" >{product.name.toUpperCase()}</p>
          </div>
          {/* {options()} */}
          <button className="addToCartButton"
            onClick={() => {
              addToCart();
            }}
          >
            ADD TO CART
          </button>
          <div className="descriptionContainer">
            {product.description.map((description, index) => {
              return (
                <div className="descriptionParagraph">
                  {description.map((line) => {
                    return <p className="paragraphLine">{line}</p>;
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
