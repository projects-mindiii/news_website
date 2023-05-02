import styles from "./ClassifiedFilter.module.css";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import { useTranslation } from "react-i18next";
import Select from "react-select";
// import styles from '../ClassiFieds/ClassifiedCountry/ClassifiedCountry.module.css';

function ClassifiedFilter() {
  const { t } = useTranslation();
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };
  const options = [
    { value: "All South Africa", label: "All South Africa" },
    { value: "opSouth Africa", label: "South Africa" },
    { value: "option3", label: "Option 3" },
  ];
  return (
    <div className={styles.filterBox}>
      <div className={styles.ClassifiedsearchBar}>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control type="search" placeholder={t("SEARCH_TEXT")} />
          </Form.Group>
        </Form>
        <RxCross2 />
      </div>
      <div className={styles.inputBox}>
        <div
          className="optionBox"
          value={selectedLocation}
          onChange={handleLocationChange}
        >
          <input 
          type="text"
          placeholder="Select a location"
          value=""></input>
          {/* <input value="New York">New York</input>
          <input value="Los Angeles">Los Angeles</input>
          <input value="Chicago">Chicago</input>
          <input value="Houston">Houston</input>
          <input value="Philadelphia">Philadelphia</input> */}
        </div>

  
      </div>
    </div>
  );
}
export default ClassifiedFilter;
