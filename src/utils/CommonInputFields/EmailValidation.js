
import { t } from "i18next";

export const EmailValidation = 
  {
    name: "email",
    required: {
      value: "true",
      message: `${t("INCOMPLETE")}`,
     
    },
    maxLength: {
      value: 50,
      message: `${t("EMAIL_MAXLENGTH")}`,
    },

    pattern: {
      value:
      /\S+@\S+\.\S+/,
      message: `${t("INVALID_EMAIL")}`,
    },
  }


export default EmailValidation;
