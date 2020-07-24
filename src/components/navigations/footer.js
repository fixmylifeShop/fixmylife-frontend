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
          <span className={space}> {name}</span>
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
        {/* <div className="footerLinksContainer">
          <p>PRODUCTS</p>
          {anchorLink("Messenger Bags", "instagram.com/fixmylife", true)}
          {anchorLink("Clothing", "instagram.com/fixmylife")}
          {anchorLink("Accessories", "instagram.com/fixmylife")}
          {anchorLink("Duran Cycles", "instagram.com/fixmylife")}
        </div> */}

        <div className="footerLinksContainer">
          <p>PAGES</p>
          {anchorLink("Instagram", "https://www.instagram.com/fixmylifenyc")}
          {anchorLink("Youtube", "https://www.youtube.com/grving")}
          {anchorLink("Portfolio", "https://www.duranirving.com")}
          {anchorLink("Contact", "/contact", true)}
        </div>
        <div className="footerLinksContainer">
          <p>SOCIAL</p>
          {anchorLink(
            "Instagram",
            "https://www.instagram.com/fixmylifenyc",
            false,
            <InstagramIcon fontSize="small" />
          )}
        </div>
      </div>
      <div className="footerFeature">
        <a href="https://www.duranirving.com">
          BY IRVING DURAN
        </a>
      </div>
    </footer>
  );
}
