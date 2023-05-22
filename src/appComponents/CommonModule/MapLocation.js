import React from "react";
import mapIcon from "../../assets/images/socialMedia_icon/map_ico1.svg";
import { useTranslation } from "react-i18next";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";

// --------function for showing address in view company-------
function MapLocation({ address }) {
  //set language
  const { t } = useTranslation();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const center = useMemo(() => ({ lat: parseFloat(address.latitude), lng: parseFloat(address.longitude) }), []);

  return (
    <section>
      <div className="mapBoxCls">
        {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap
            mapContainerClassName="map-container"
            center={center}
            zoom={10}
          >
            <Marker position={{ lat: parseFloat(address.latitude), lng: parseFloat(address.longitude) }} />
          </GoogleMap>
        )}
      </div>
      <div className="mapDetails">
        <img src={mapIcon} alt="mapIcon" />
        <div className="mapAddress">
          <h5>{t("ADDRESS")}</h5>
          <p>{address.address}</p>
        </div>
      </div>
    </section>
  );
}

export default MapLocation;
