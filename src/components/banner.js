import React from "react";

export default function Banner(props) {
  const location = () => {
    if (props.home) {
      return (
        <div
          style={{
            height: "100vh",
          }}
          className="banner"
        >
          <p className="bannerTopText">FIXMYLIFE</p>
          <p className="bannerBottomText">NEW YORK</p>
        </div>
      );
    } else {
      return (
        <div
          style={{
            height: "40vh",
          }}
          className="banner"
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
