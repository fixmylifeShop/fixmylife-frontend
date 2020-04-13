import React, { useState } from "react";
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
    if (localStorage.getItem("cart")) {
      localStorage.setItem("cart", `${localCart},${product.id}`);
    } else {
      localStorage.setItem("cart", product.id);
    }
    props.setCartChange(true);
    history.push("/cart");
  };

  // const line = (description) => {
  //   return (
  //     <div>
  //       {description.map((line) => {
  //         return <p>{line}</p>;
  //       })}
  //     </div>
  //   );
  // };

  const options = () => {
    if (product.options && product.options.length > 1) {
      console.log(product.options[1][1]);
      const option = product.options;
      return (
        <select>
          {option.map((choice, index) => {
            console.log(choice);

            return (
              <option onClick={() => setSelectOption(index)}>
                {choice[0]} {choice[1] ? " - " + currency(choice[1]) : ""}
              </option>
            );
          })}
        </select>
      );
    }
  };
  options();
  return (
    <div>
      <Banner />
      <div className="productContainer">
        <div className="productImageContainer">
          <img src={product.img} alt="product" />
        </div>

        <div className="productInfoContainer">
          <div className="product-price-title">
            <h3>{currency(product.price)}</h3>
            <h4>{product.name.toUpperCase()}</h4>
          </div>
          {options()}
          <button
            onClick={() => {
              addToCart();
            }}
          >
            buy
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
