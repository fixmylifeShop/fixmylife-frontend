import React, { useState } from "react";

import { Link, useHistory } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import SearchIcon from "@material-ui/icons/Search";
import fmllogo from "../../images/fixmylifelogo.png";
import "../../CSS/header.css";

export default function Header(props) {
  const [searchBar, setSearchBar] = useState("");
  const history = useHistory();

  const onChange = (e) => {
    // if (e.target.value !== "") {
      props.setSearch(e.target.value);
    // } 
  };

  const submitSearch = (e) => {
    e.preventDefault();
    history.push("/search");
  };

  return (
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
          <form
            className="searchContainer"
            onMouseEnter={() => {
              setSearchBar("slideIn ");
            }}
            onMouseLeave={() => {
              setSearchBar("hide");
            }}
            onSubmit={submitSearch}
          >
            <input
              type="text"
              className={`inputSearch ${searchBar}`}
              placeholder="Search..."
              onChange={onChange}
            />
            <div className="searchButton">
              <SearchIcon fontSize="small" />
            </div>
          </form>

          {/* </div> */}

          <Link className="App-link" to="/cart">
            <ShoppingCartOutlinedIcon fontSize="small" />{" "}
            {props.itemCount + " "}
            ITEMS
          </Link>
        </div>
      </nav>
    </header>
  );
}
