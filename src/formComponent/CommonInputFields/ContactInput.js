import { MdPhonelinkRing } from "react-icons/md";
import PhoneInput from "react-phone-input-2";

//--------Create a email input field for profile component----------
function ContactInput(props) {

    return (

        <div className="phoneInputSet">
            <MdPhonelinkRing />
            {/* <p>{props.country.toUpperCase()} + {props.dialCode.toString()}</p> */}
            <PhoneInput
                // country={"za"}
                // value={props.dialCode.toString() +
                //     props.phone.toString()}
                // onChange={(value, country) => {
                //     let dialCode = country.dialCode;
                //     let phone = value.slice(
                //         dialCode.length,
                //         value.length
                //     );
                //     props.country1(country.countryCode)
                //     props.dialCode1(dialCode);
                //     props.phone1(phone);

                // }}
                // countryCodeEditable={false}
                // copyNumbersOnly={true}
            />
        </div>

    );
}
export default ContactInput;