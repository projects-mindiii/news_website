import React, { useState} from "react";
import mapicon from "../../assets/images/map_ico.png";
import "../ClassiFieds/ClassiFieds.css";
import Modal from "react-bootstrap/Modal";
import CustomBtn from "../../formComponent/Button/Button";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { Form } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import styles from './ClassifiedCountry.module.css';
import ClassifiedFilter from "./ClassifiedFilter";


function ClassifiedCountry() {
  const { t } = useTranslation();
  const [locationSelected, setLocationSelected] = useState({
    value: 1,
    label: "All South Africa",
    id: 1,
  });

  const locationOption = [
    { value: 1, label: "All South Africa", id: 1 },
    { value: 0, label: "Outside South Africa", id: 0 },
    { value: 1, label: "All South Africa", id: 1 },
    { value: 0, label: "Outside South Africa", id: 0 },
    { value: 1, label: "All South Africa", id: 1 },
    { value: 0, label: "Outside South Africa", id: 0 },
    { value: 1, label: "All South Africa", id: 1 },
    { value: 0, label: "Outside South Africa", id: 0 },
  ];
  const [isOpen, setIsOpen] = useState(false);
 

  return (
    <div className={styles.classiFieds_map_serchbar}>
      <div className={styles.countryIcon} onClick={() => setIsOpen(true)}>
        <span className={styles.imgIcon}>
          {" "}
          <img src={mapicon} alt={mapicon} width="25px" height="25px" />
          <span className={styles.countryText}>
            All South Africa -<span className={styles.resultText}>0 Results</span>{" "}
            {isOpen && <ClassifiedFilter/>}
          </span>
        </span>
      </div>
      {/* <Modal
          show={showPopup}
          onHide={handleClose}
          keyboard={false}
          backdrop="static"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
       <div className={styles.ClassifiedsearchBar}>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control type="search" placeholder={t("SEARCH_TEXT")} />
                </Form.Group>
            </Form>
            <RxCross2 />
        </div>
          <Select
          className={styles.countryIcon}
            id="location"
            name="location"
            options={locationOption}
            onChange={setLocationSelected}
            value={locationSelected}
            styles={{
              placeholder: () => ({
                fontSize: "15px",
                color: "#cacaca",
                position: "absolute",
                top: "8px",
                left: "15px",
              }),
            }}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                borderRadius: 0,
                primary25: "#f2f2f2",
                primary: "#000000;",
                primary50: "#f2f2f2",
              },
            })}
          />
          <Modal.Footer>
            <div className="buttonAdd1">
              <CustomBtn type="button" onClick={handleClose}>
                {t("CANCEL")}
              </CustomBtn>
            </div>
          </Modal.Footer>
        </Modal> */}
    </div>
  );
  
}
export default ClassifiedCountry;

