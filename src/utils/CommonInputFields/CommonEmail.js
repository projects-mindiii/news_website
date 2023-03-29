import { t } from "i18next";



const CommonEmail = [
  {
    name: "email",
    placeholder:`{t("EMAIL")}`,
    required: "true",
    message: `${t("INCOMPLETE")}`,
  },

  {
    maxLength:"value.50",
    message: `${t("EMAIL_MAXLENGTH")}`,
  },

  {
    pattern:`Value./^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/`,
    message: `${t("INVALID_EMAIL")}`,
  },
];

export default CommonEmail;
