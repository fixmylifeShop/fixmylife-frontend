import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";

export default function MobileMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Menu
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        // style={{marginTop:"90px"}}
        className="mobileOptions"
      >
        <MenuItem>
          <input
            type="text"
            //   className={`inputSearch ${searchBar}`}
            placeholder="Search..."
            onChange={props.onChange}
          />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/products" className="navLinks">
            PRODUCTS
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/instagram" className="navLinks">
            INSTAGRAM
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/contact" className="navLinks">
            CONTACT
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link className="App-link" to="/cart">
            <ShoppingCartOutlinedIcon fontSize="small" />{" "}
            {props.itemsCount + " "}
            ITEMS
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <a href="https://www.duranirving.com" className="mobileBrand">
            BY IRVING DURAN
          </a>
        </MenuItem>
      </Menu>
    </div>
  );
}
