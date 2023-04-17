import whatsappicon from "../assets/images/whatsapp_icon_only.png"
import React from "react";
//-------Create a Deals Header component--------
function WhatsApp() {  
    return (
        <React.Fragment >    
                    <button className="classiFields_whatAppIcon"><img src={whatsappicon} alt={whatsappicon} /><span>WhatsApp</span></button>
        </React.Fragment>
    );
}
export default WhatsApp;