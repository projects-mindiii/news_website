import { useTranslation } from "react-i18next";
import { Form } from "react-bootstrap";

//--------Create a email input field component----------
function EmailInput({register}) {
    //set language
    const { t } = useTranslation();

    return (
        <>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder={t("EMAIL")}
                    {...register("email", {
                        required: {
                            value: true,
                            message: `${t("INCOMPLETE")}`,
                        },
                        maxLength: {
                            value: 50,
                            message: `${t("EMAIL_MAXLENGTH")}`,
                        },
                        pattern: {
                            value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: `${t("INVALID_EMAIL")}`,
                        },
                    })}
                    autoFocus={true}
                />
            </Form.Group>
        </>
    );
}
export default EmailInput;