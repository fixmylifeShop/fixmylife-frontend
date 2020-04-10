import React, { useState } from "react";
import "./CSS/App.css";
import fmllogo from "./images/fixmylifelogo.png";
import products from "./components/products.json";
import { Switch, Route, Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import SearchIcon from "@material-ui/icons/Search";

function App(props) {
  const [searchBar, setSearchBar] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <nav className="navigation">
          <div className="navLinkContainer navContentWidth">
            <Link to="/products" className="navLinks">
              PRODUCTS
            </Link>
            <Link to="/instagram" className="navLinks">
              INSTAGRAM
            </Link>
            <Link to="/contact" className="navLinks">
              CONTACT
            </Link>
          </div>
          <div className="navContentWidth">
            <Link to="/">
              <img src={fmllogo} alt="logo" className="App-logo" />
            </Link>
          </div>

          {/* <div className="navLeftContent navContentWidth"> */}

          <div class="navContentWidth navLeftContent ">
            <div
              className="searchContainer"
              onMouseEnter={() => {
                setSearchBar("slideIn ");
              }}
              onMouseLeave={() => {
                setSearchBar("hide");
              }}
            >
              <input
                type="text"
                className={`inputSearch ${searchBar}`}
                placeholder="Search..."
              />
              <div className="searchButton">
                <SearchIcon fontSize="small" />
              </div>
            </div>

            {/* </div> */}

            <Link className="App-link" to="/cart">
              <ShoppingCartOutlinedIcon fontSize="small" /> 0 ITEMS
            </Link>
          </div>
        </nav>
      </header>
      <div
        style={{
          height: props.bannersize || "100vh",
        }}
        className="banner"
      >
        <p className="bannerTopText">FIXMYLIFE</p>
        <p className="bannerBottomText">NEW YORK</p>
      </div>

      <div className="cardContainer">
        {products.map((project) => {
          return (
            <div className="card">
              <div>
                </div>
              <div className="imgcontainer">
                <img src={project.img} className="cardImg" />
              </div>
              <p >{project.price}</p>
              <p> {project.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
