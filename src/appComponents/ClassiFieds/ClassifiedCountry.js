import React, { useState } from "react";
import Modal from "react-modal";
import mapicon from "../../assets/images/map_ico.png";
import Select from "react-select";


function ClassifiedCountry() {
  const [isOpen, setIsOpen] = useState(false);
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
  const toggleSelectBox = () => {
    setIsOpen(!isOpen);
  }
 
  return (
    <>


    <div className="classiFieds_map_serchbar">
      <div className="countryIcon">
        <div className="selectOption">
        <img src={mapicon} alt={mapicon} width="25px" height="25px" onClick={toggleSelectBox}/>
     <span className="countryText" onClick={toggleSelectBox}>
          All South Africa -<span className="resultText">0 Results</span>{" "}
        </span>
        </div>
      </div>

    </div>
   
   {isOpen && (
    <Select
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
  )}

  </>

    // <div>
    //   <button onClick={() => setModalIsOpen(true)}>
    //     <img src={mapicon} alt={mapicon} width="25px" height="25px" />
    //     <span className="countryText">
    //       All South Africa -<span className="resultText">0 Results</span>{" "}
    //     </span>
    //   </button>
    //   <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
    //     <Select
    //       id="location"
    //       name="location"
    //       options={locationOption}
    //       onChange={setLocationSelected}
    //       value={locationSelected}
    //       styles={{
    //         placeholder: () => ({
    //           fontSize: "15px",
    //           color: "#cacaca",
    //           position: "absolute",
    //           top: "8px",
    //           left: "15px",
    //         }),
    //       }}
    //       theme={(theme) => ({
    //         ...theme,
    //         colors: {
    //           ...theme.colors,
    //           borderRadius: 0,
    //           primary25: "#f2f2f2",
    //           primary: "#000000;",
    //           primary50: "#f2f2f2",
    //         },
    //       })}
    //     />
    //     <button onClick={() => setModalIsOpen(false)}>Close Modal</button>
    //   </Modal>
    // </div>
  );
}

export default ClassifiedCountry;
