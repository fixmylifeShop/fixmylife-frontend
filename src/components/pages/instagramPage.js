import React from "react";
import InstaGrid from "../instagram/instaGrid";
import Banner from "../banner.js";

export default function InstagramPage() {
  return (
    <div>
      <Banner title="instagram" />
      <div>
          
      </div>
      <div className="instagramContainer">
         <InstaGrid account="fixmylifenyc" /> 
      </div>
      
    </div>
  );
}
