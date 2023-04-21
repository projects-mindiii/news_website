import mapicon from "../../assets/images/map_ico.png";
import React, { useState, useEffect } from "react";
import { Row, Col} from "react-bootstrap";
import "../ClassiFieds/ClassiFieds.css";
import WhatsApp from "../../CommonComponent/Whatappshare";
import SocialMedaiShare from "../../CommonComponent/SocialMediaShare";
import ContactPerson from "../../CommonComponent/ContactPerson";
import bookmarkicon from "../../assets/images/bookmark_ico.png";
import forsale from "../../assets/images/for_sale_img.png";
import watchicon from "../../assets/images/watch_ico.png";



function ClassifiedCategoryList(props) {
  console.log("props", props.forSaleListData)
  return (
    <div className="main">
    {props.forSaleListData.map((item,index)=>{
      return(
        <Row>
       <Col xs={12} sm={12} md={12} lg={6}>
         <div className="classiFieds_forSaleBox" key={index}>
           <div className="classiFieds_forSale_about">
             <div className="classiFieds_forSale">
               <img src={forsale} alt={forsale} />
             </div>
             <div className="classiFields_heading">
               <p className="text">
               {item.heading}
               </p>
               <div className="classiFieds_time_action">
                 <div className="classiFieds_time">
                   <button className="classiFieds_forSale_button">
                     {item.category_name}
                   </button>
                   <span>
                     <span>
                       <img src={watchicon} alt={watchicon} />{" "}
                     </span>{" "}
                   {item.created_at}
                   </span>
                 </div>
                 <div className="classiFieds_bookmarkicon">
                   <img src={bookmarkicon} alt={bookmarkicon} />
                 </div>
               </div>
             </div>
           </div>
           <div className="classiFieds_RupeesText ">
             <p>
               {item.amount}<span>PER WEEK</span>
             </p>
           </div>
           <div className="classiFieds_countryName ">
             <span>
               <img src={mapicon} alt={mapicon} />{" "}
               <span>{item.city}</span>
             </span>
           </div>
           <div className="classiFieds_aboutText">
             <p>
              {item.description}
             </p>
           </div>
           <ContactPerson />
           <WhatsApp />
           <SocialMedaiShare />
         </div>
       </Col>
     </Row>
      )
    })}
     
    </div>
  );
}

export default ClassifiedCategoryList;
