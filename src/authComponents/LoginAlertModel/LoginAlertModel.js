import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import styles from "./LoginAlertModel.module.css";
import "../../assets/styles/Common.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CustomBtn from "../../formComponent/Button/Button";
import { RxCross2 } from "react-icons/rx";

function LoginAlertModel(props) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [show,setShow]=useState(props.modalValue)

  function closeModal(){
    setShow(false);
    navigate('/login')
  }
  
  return (
    <section>
      <Modal
        show={show}
        className={`${styles.loginAlertBox} alertBody`}
      >
        <Modal.Body>

          <div className={styles.alertSubBody}>
            <div className={styles.loginAlertCancel}>
              <h5>{t("LOGIN_REQUIRED")}</h5>
              <RxCross2 onClick={() => closeModal() } />
            </div>
            <p>{t("LOGIN_SUB_TEXT")}</p>
            <div className={styles.createProfileBtn}>
              <CustomBtn
                children={t("CREATE_FREE_PROFILE")}
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
