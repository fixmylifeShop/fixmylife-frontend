import React, { useState, useEffect } from "react";
import Banner from "../banner.js";
import { useParams, useHistory } from "react-router-dom";
import currency from "../currency";
import axios from "axios";

export default function IndividualProductPage(props) {
  const [product, setProduct] = useState(false);
  const [image, setImage] = useState(false);
  // const [selectOption, setSelectOption] = useState();
  let { id } = useParams();
  if (!product) {
    axios
      .get(`${process.env.REACT_APP_DOMAIN_NAME}/shops/products/${id}`)
      .then((res) => {
        console.log(res.data)
        setProduct(res.data);
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

  // useEffect(() => {
  //   // if (product.options && !selectOption) {
  //   //   setSelectOption(0);
  //   // }

  // });

  // const options = () => {
  //   if (product.options && product.options.length > 1) {
  //     const options = product.options;
  //     return (
  //       <select onChange={(event) => setSelectOption(event.target.value)}>
  //         {options.map((choice, index) => {
  //           return (
  //             <option value={index}>
  //               {choice[0]} {choice[1] ? " - " + currency(choice[1]) : ""}
  //             </option>
  //           );
  //         })}
  //       </select>
  //     );
  //   }
  // };
  return (
    <div>
      <Banner title="  " />
      <div className="productContainer">
        <div className="productImageContainer">
          <img src={image} alt="product" />
        </div>

        <div className="productInfoContainer">
          <div className="product-price-title">
            <p className="product-price">{currency(product.price)}</p>
            <p className="product-name">
              {product && product.product_name.toUpperCase()}
            </p>
          </div>
          {/* {options()} */}
          <button className="addToCartButton" onClick={addToCart}>
            ADD TO CART
          </button>
          <div className="descriptionContainer">{product.description}</div>
        </div>
      </div>
    </div>
  );
}
