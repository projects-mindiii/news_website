import React, { useState, useEffect } from "react";
import mapicon from "../../assets/images/map_ico.png";
import { useSelector } from "react-redux";
import SublyApi from "../../helpers/Api";
import "../ClassiFieds/ClassiFieds.css";
import "./ClassifiedCountry.css"


function ClassifiedCountry() {
  const [CountryName, setCountryName] = useState("");
  const [CatergoryType, setCategoryType] = useState("");
  const [selectCountry, setSelectCountry] = useState("");
  const [countriesSelect, setcountriesSelect] = useState(false);
  const [CatergoryTypeIndex, setCategoryTypeIndex] = useState(0);
  const { userToken, currentUser, isLoading } = useSelector(
    (state) => state.user
  );

  //function for get classiFieds metalist
  useEffect(() => {
    async function getClassifiedLists() {
      let requestData = new FormData();
      requestData.append("limit", "");
      requestData.append("offset", "");
      requestData.append("type", 6);
      requestData.append("search_by", 1);
      requestData.append("province", 931);
      requestData.append("country", 15);
      requestData.append("city", "Free State");
      await SublyApi.getClassiFiedMeta(userToken).then((responsejson) => {
        if (responsejson.status_code == 500) {
        } else if (responsejson.status_code == 400) {
        } else {
          if (responsejson.status_code == 200) {
            setCategoryType(responsejson.data.category_type);
            setCountryName(responsejson.data.provinces);
          }
        }
      });
      // SublyApi.getClassifiedList(requestData, userToken).then((responsejson) => {
      // });
    }
    getClassifiedLists();
  }, []);

  return (
    <div className="classiFieds_map_serchbar">
      <div className="countryIcon">
        <span
          onClick={() =>
            setcountriesSelect(countriesSelect == true ? false : true)
          }
        >
          <img src={mapicon} alt={mapicon} width="25px" height="25px" />
          {"All South Africa "}

          {/* <span>
            {selectCountry
              ? selectCountry
              : CountryName && CountryName.length > 0 && CountryName[0].name}
          </span> */}
        </span>

        <div className="classiFieds_country_select">
          {CountryName &&
            CountryName.length > 0 &&
            CountryName.map((item, index) => (
              <div
                onClick={() => setSelectCountry(item.name)}
                style={{
                  display: countriesSelect == true ? "block" : "none",
                }}
              >
                {item.name}
              </div>
            ))}
        </div>
      </div>
     
    </div>
  );
}
export default ClassifiedCountry;
