import React from "react";
import emailicon from "../assets/images/email_ico.png"
import callicon from "../assets/images/call_ico.png"
import WhatsApp from "./Whatappshare";

//-------Create a Deals Header component--------
function WhatsappshareContact(props) {
    return (
        <React.Fragment >
            <div className="classiFields_contactPerson">
                <p className="heading">Contact Person</p>
                {props.yourdata.contact_company &&

                <div className="classiFields_PersonAboutShow">
                    <div className="classiFields_iconBackGround">
                        <img src={emailicon} alt={emailicon} />
                    </div>
                    <div className="classiFields_emailHeadingText">
                        <p>COMPANY</p>
                        <p>{props.yourdata.contact_company ? props.yourdata.contact_company : "None"}</p>
                    </div>
                </div>}
               { props.yourdata.email &&
                <div className="classiFields_PersonAboutShow">
                    <div className="classiFields_iconBackGround">
                        <img src={emailicon} alt={emailicon} />
                    </div>
                    <div className="classiFields_emailHeadingText">
                        <p>EMAIL</p>
                        <p>{props.yourdata.email} </p>
                    </div>
                    <div>
                    </div>
                </div>}
                {props.yourdata.contact &&
                <div className="classiFields_PersonAboutShow classiFields_mobileMargingRemove">
                    <div className="classiFields_iconBackGround">
                        <img src={callicon} alt={callicon} />
                    </div>
                    <div className="classiFields_emailHeadingText">
                        <p>CONTACT NUMBER</p>
                        <p> + {props.yourdata.contact}</p>
                    </div>
                    <div>
                    </div>
                </div>}
                <WhatsApp/>
            </div>

        </React.Fragment>
    );
}
export default WhatsappshareContact;