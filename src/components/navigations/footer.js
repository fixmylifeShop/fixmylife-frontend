import React from "react";
import { Link } from "react-router-dom";
import "../../CSS/footer.css";
import InstagramIcon from "@material-ui/icons/Instagram";


export default function Footer() {
  const anchorLink = (name, link, local, icon) => {
    let space = `${icon ? "anchorSpace" : ""}`;
    if (local) {
      return (
        <Link to={link}>
          {icon}
          <span className={space}>{name}</span>
        </Link>
      );
    } else {
      return (
        <a href={link}>
          {icon}
          <span className={space}>{name}</span>
        </a>
      );
    }
  };

  return (
    <footer>
      <div className="footerTopicContainer">
        <div className="footerLinksContainer">
          <p>PRODUCTS</p>
          {anchorLink("Messenger Bags", "instagram.com/fixmylife")}
          {anchorLink("Clothing", "instagram.com/fixmylife")}
          {anchorLink("Accessories", "instagram.com/fixmylife")}
          {anchorLink("Duran Cycles", "instagram.com/fixmylife")}
        </div>

        <div className="footerLinksContainer">
          <p>PAGES</p>
          {anchorLink("Instagram", "instagram.com/fixmylife")}{" "}
          {anchorLink("Youtube", "instagram.com/fixmylife")}
          {anchorLink("Portfolio", "instagram.com/fixmylife")}
          {anchorLink("Contact", "instagram.com/fixmylife")}
        </div>
        <div className="footerLinksContainer">
          <p>SOCIAL</p>
          {anchorLink(
            "Instagram",
            "instagram.com/fixmylife",
            false,
            <InstagramIcon fontSize="small" />
          )}
        </div>
      </div>
      <div className="footer feature">
        <p>ddddd</p>
      </div>
    </footer>
  );
}
