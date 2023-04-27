import { BsWhatsapp } from "react-icons/bs";
import PhoneInput from "react-phone-input-2";

//--------Create a email input field for profile component----------
function WatsappInput(props) {

    return (

        <div className="phoneInputSet watsappInput">
            <BsWhatsapp />
            {/* <p>{props.countryCodeWatsapp.toUpperCase()} + {props.dialCodeWatsapp.toString()}</p> */}
            <PhoneInput
             
                // country={"za"}
                // value={props.dialCodeWatsapp.toString() +
                //     props.watsappNo.toString()}
                // onChange={(value, country) => {
                //     let dialCode = country.dialCode;
                //     let phone = value.slice(
                //         dialCode.length,
                //         value.length
                //     );
                //     props.setCountryCodeWatsapp(country.countryCode)
                //     props.setDialCodeWatsapp(dialCode);
                //     props.setWatsappNo(phone);

                // }}
                // countryCodeEditable={false}
                // copyNumbersOnly={true}
            />
        </div>

    );
}
export default WatsappInput;