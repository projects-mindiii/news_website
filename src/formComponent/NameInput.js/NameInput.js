import { useTranslation } from "react-i18next";
import { Form } from "react-bootstrap";

//--------Create a name input field component----------
function NameInput({ register }) {
  //set language
  const { t } = useTranslation();

  return (
    <>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Control
          type="text"
          placeholder={t("NAME")}
          {...register("fullName", {
            required: {
              value: true,
              message: `${t("INCOMPLETE")}`,
            },
            minLength: {
              value: 2,
              message: `${t("NAME_MINLENGTH")}`,
            },
            maxLength: {
              value: 20,
              message: `${t("NAME_MAXLENGTH")}`,
            },
            pattern: {
              value: /^(?![\s.]+$)[a-zA-Z\s.]*$/,
              message: `${t("INVALID_NAME")}`,
            },
          })}

        />
      </Form.Group>
    </>
  );
}
export default NameInput;