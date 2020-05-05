import React, { useState, useEffect } from "react";
import Banner from "../banner.js";
import { useParams, useHistory } from "react-router-dom";
import currency from "../currency";
import axios from "axios";
export default function IndividualProductPage(props) {
  const [product, setProduct] = useState(false);
  const [image, setImage] = useState(false);
  const [selectOption, setSelectOption] = useState();
  let { id } = useParams();
  let history = useHistory();


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
    if (!product) {
      axios
        .get(`${process.env.REACT_APP_DOMAIN_NAME}/shops/products/${id}`)
        .then((res) => {
          setProduct(res.data);
          setImage(res.data.image[0].image);
          console.log(res.data.image[0].image);
        });
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
      <Banner  title=" "/>
      <div className="productContainer">
        <div className="productImageContainer">
          <img src={image} alt="product" />
        </div>

        <div className="productInfoContainer">
          <div className="product-price-title">
            <p className="product-price">{currency(product.price)}</p>
            <p className="product-name">{product && product.product_name.toUpperCase()}</p>
          </div>
          {/* {options()} */}
          <button
            className="addToCartButton"
            onClick={() => {
              addToCart();
            }}
          >
            ADD TO CART
          </button>
          <div className="descriptionContainer">
            {product.description}
          </div>
        </div>
      </div>
    </div>
  );
}
