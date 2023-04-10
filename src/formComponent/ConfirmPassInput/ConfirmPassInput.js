import { useTranslation } from "react-i18next";
import { Form } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

//--------Create a confirm password input field component----------
function ConfirmPassInput({ register, watch }) {

    //set language
    const { t } = useTranslation();
    //-------state for showing and hiding password------
    const [passwordShow, setPasswordShow] = useState(false);


    return (
        <>
            <Form.Group className="mb-3 passwordinput">
                <Form.Control
                    type={passwordShow ? "text" : "password"}
                    placeholder={t("CONFIRM_PASSWORD")}
                    {...register("confirmPassword", {
                        required: {
                            value: true,
                            message: `${t("INCOMPLETE")}`,
                        },

                        validate: (value) =>
                            value === watch("password") || "Passwords have to match",
                    })}

                />
                <div className="passwordicon">
                    {passwordShow ? (
                        <FaEye
                            className="icon"
                            onClick={() => setPasswordShow(!passwordShow)}
                        />
                    ) : (
                        <FaEyeSlash
                            className="icon"
                            onClick={() => setPasswordShow(!passwordShow)}
                        />
                    )}
                </div>
            </Form.Group>
        </>
    )
}
export default ConfirmPassInput;