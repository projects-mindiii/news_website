import React from "react";
import mapIcon from "../../assets/images/socialMedia_icon/map_ico.png";

function MapLocation(address) {
  console.log("address",address)
  return (
    <section>
      <div className="mapBox"></div>
      <div className="mapDetails">
        <img src={mapIcon} alt="mapIcon" />
        <div className="mapAddress">
          <h5>ADDRESS</h5>
          <p>104/c mitra bandhu nagar indore</p>
        </div>
      </div>
    </section>
  );
}

export default MapLocation;
