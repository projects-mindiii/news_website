import React from "react";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import styles from "./LoginAlertModel.module.css";
import "../../assets/styles/Common.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CustomBtn from "../../formComponent/Button/Button";

function LoginAlertModel(props) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <section>
      <Modal
        show={props.modalValue}
        className={`${styles.loginAlertBox} alertBody`}
      >
        <Modal.Body>
          <div className={styles.alertSubBody}>
            <h5>{t("LOGIN_REQUIRED")}</h5>
            <p>{t("LOGIN_SUB_TEXT")}</p>
            <div className={styles.createProfileBtn}>
              <CustomBtn
                children={t("CREATE_PROFILE")}
                type={"button"}
                onClick={() => navigate("/sign-up")}
              />
            </div>
            <h6 className={styles.orText}>{t("OR")}</h6>
            <div className={`${styles.loginToProfile}`}>
              <CustomBtn
                children={t("LOGIN_TO_PROFILE")}
                type={"button"}
                onClick={() => navigate("/login")}
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </section>
  );
}

export default LoginAlertModel;
