import React, { useState, useEffect } from "react";
import Banner from "../banner.js";
import { useParams, useHistory } from "react-router-dom";
import currency from "../currency";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import "../../CSS/individualProductPage.css";
export default function IndividualProductPage(props) {
  const [product, setProduct] = useState(false);
  const [image, setImage] = useState(false);
  // const [selectOption, setSelectOption] = useState();
  let { id } = useParams();
  if (!product) {
    axios
      .get(`${process.env.REACT_APP_DOMAIN_NAME}/shops/products/${id}`)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
        // console.log(res.data.images[0].image);
        setImage(res.data.image);
      });
  }

  const addToCart = (e) => {
    if (props.cart.find((item) => item.id === product.id)) {
      props.cart.find((item) => {
        item.id === product.id && item.quantity++;
      });
      props.addToCart(props.cart, true);
    } else {
      // product.image = product.image[0].image;
      product.quantity = 1;
      props.addToCart([...props.cart, product], true);
    }
  };

  return (
    <div>
      <Banner title="  " />
      {product ? (
        <div className="productContainer">
          <div className="productImageContainer">
            {image ? <img src={image} alt="product" /> : <CircularProgress />}
          </div>

          <div className="productInfoContainer">
            <div className="product-price-title">
              <p className="product-price">{currency(product.price)}</p>
              <p className="product-name">
                {product.product_name.toUpperCase()}
              </p>
            </div>
            {/* {options()} */}
            <button className="addToCartButton" onClick={addToCart}>
              ADD TO CART
            </button>
            <div className="descriptionContainer">{product.description}</div>
          </div>
        </div>
      ) : (
        " loading "
      )}
    </div>
  );
}
