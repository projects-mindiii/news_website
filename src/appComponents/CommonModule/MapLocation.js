import React from "react";
import mapIcon from "../../assets/images/socialMedia_icon/map_ico1.svg";
import { useTranslation } from "react-i18next";

// --------function for showing address in view company-------
function MapLocation({ address }) {
  //set language
  const { t } = useTranslation();

  return (
    <section>
      <div className="mapBox">

      </div>
      <div className="mapDetails">
        <img src={mapIcon} alt="mapIcon" />
        <div className="mapAddress">
          <h5>{t("ADDRESS")}</h5>
          <p>{address}</p>
        </div>
      </div>
    </section>
  );
}

export default MapLocation;
