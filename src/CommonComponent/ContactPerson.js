import React from "react";
import emailicon from "../assets/images/email_ico.png"
import callicon from "../assets/images/call_ico.png"

//-------Create a Deals Header component--------
function ContactPerson() {
    return (
        <React.Fragment >
            <div className="classiFields_contactPerson">
                <p className="heading">Contact Person</p>
                <div className="classiFields_PersonAboutShow">
                    <div className="classiFields_iconBackGround">
                        <img src={emailicon} alt={emailicon} />
                    </div>
                    <div className="classiFields_emailHeadingText">
                        <p>COMPANY</p>
                        <p>ACME Manufacturing</p>
                    </div>
                </div>
                <div className="classiFields_PersonAboutShow">
                    <div className="classiFields_iconBackGround">
                        <img src={emailicon} alt={emailicon} />
                    </div>
                    <div className="classiFields_emailHeadingText">
                        <p>EMAIL</p>
                        <p>email@domain.com</p>
                    </div>
                    <div>
                    </div>
                </div>
                <div className="classiFields_PersonAboutShow classiFields_mobileMargingRemove">
                    <div className="classiFields_iconBackGround">
                        <img src={callicon} alt={callicon} />
                    </div>
                    <div className="classiFields_emailHeadingText">
                        <p>CONTACT NUMBER</p>
                        <p>+27 11 012 3156</p>
                    </div>
                    <div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    );
}
export default ContactPerson;