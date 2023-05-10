import React from "react";
import { useTranslation } from "react-i18next";
import CustomBtn from "../../formComponent/Button/Button";
import { Modal } from "react-bootstrap";

function DeleteAlertBox(props) {
  //set language
  const { t } = useTranslation(); 
  return (
    <section>
      <Modal
        show={props.showPopup}
        onHide={props.handleClose}
        className="deletePopup"
        keyboard={false}
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title>{t("ALERT")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.alertText}</Modal.Body>
        <Modal.Footer>
          <div className="buttonAdd1">
            <CustomBtn type="button" onClick={props.handleClose}>
              {t("CANCEL")}
            </CustomBtn>
          </div>
          <div>
            <CustomBtn
              onClick={() => {
                props.deleteHandle();
              }}
            >
              {t("DELETE")}
            </CustomBtn> 
          </div>
        </Modal.Footer>
      </Modal>
    </section>
  );
}

export default DeleteAlertBox;
