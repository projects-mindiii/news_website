import { useTranslation } from "react-i18next";
import { Form } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

//--------Create a password input field component----------
function PasswordInput({ register }) {
    //set language
    const { t } = useTranslation();
    const [shown, setShown] = useState(false);

    return (
        <>
            <Form.Group className="mb-3 passwordinput">
                <Form.Control
                    type={shown ? "text" : "password"}
                    placeholder={t("PASSWORD")}
                    {...register("password", {
                        required: {
                            value: true,
                            message: `${t("INCOMPLETE")}`,
                        },
                        pattern: {
                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                            message: `${t("INVALID_PASSWORD")}`,
                        },
                        // maxLength: {
                        //     value: 8,
                        //     message: `${t("PASS_MAXLENGTH")}`,
                        // },
                        // minLength: {
                        //     value: 4,
                        //     message: `${t("PASS_MINLENGTH")}`,
                        // },
                    })}
                />
                <div className="passwordicon">
                    {shown ? (
                        <FaEye className="icon" onClick={() => setShown(!shown)} />
                    ) : (
                        <FaEyeSlash
                            className="icon"
                            onClick={() => setShown(!shown)}
                        />
                    )}
                </div>
            </Form.Group>
        </>
    )
}
export default PasswordInput;