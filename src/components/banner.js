import React from "react";

export default function Banner(props) {
  const mobilePageBanner = props.title ? "mobilePageBanner" : "";

  const location = () => {
    if (props.home) {
      return (
        <div
          // style={{
          //   height: "100vh",
          // }}
          className="banner"
        >
          <p className="bannerTopText">FIXMYLIFE</p>
          <p className="bannerBottomText">NEW YORK</p>
        </div>
      );
    } else {
      return (
        <div
          className={`banner ${mobilePageBanner}`}
        >
          {props.title ? (
            <p className="bannerTitle">{props.title.toUpperCase()}</p>
          ) : (
            ""
          )}
        </div>
      );
    }
  };
  return location();
}
