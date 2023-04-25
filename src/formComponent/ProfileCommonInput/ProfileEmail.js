import { useTranslation } from "react-i18next";
import { Form } from "react-bootstrap";
import { AiOutlineMail } from "react-icons/ai";

//--------Create a email input field for profile component----------
function ProfileEmail({ register }) {
    //set language
    const { t } = useTranslation();

    return (
        <>
            <Form.Group className="mb-3 emailSet">
                <Form.Control
                    type="text"
                    placeholder={t("EMAIL")}
                    {...register("email", {
                        required: {
                            value: true,
                            message: `${t("ENTER_EMAIL")}`,
                        },
                        pattern: {
                            value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: `${t("INVALID_EMAIL")}`,
                        },
                    })}
                />
                <AiOutlineMail />
            </Form.Group>
        </>
    );
}
export default ProfileEmail;