import styles from "./ClassifiedFilter.module.css";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import CustomBtn from "../../formComponent/Button/Button";
import { CLASSIFIED_CATEGORY_TYPE } from "../../utils/Constants";
import {
  forSaleListApi,
  getJobOfferListApi,
  getJobSeekerListApi,
  getWantedListApi,
  setClassifiedFilterData,
} from "../../store/slices/ClassifiedSlice";
import { STATUS_CODES } from "../../utils/StatusCode";
import Loader from "../../utils/Loader/Loader";

function ClassifiedFilter({
  countryData,
  closeModal,
  setCountryData,
  setResultData,
}) {
  const { classifiedType, isLoading } = useSelector(
    (state) => state.classified
  );
  console.log("country data", countryData);
 
  const { userToken, allMetaList } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const [countryOption, setCountryOption] = useState([
    {
      label: "All country ",
      value: "0",
      id: "0",
    },
  ]);

  const [countrySelected, setCountrySelected] = useState({
    label: "All Country",
    value: "",
    id: "0",
  });

  const [provinceSelected, setProvinceSelected] = useState({
    value: "all",
    label: "All South Africa",
    id: "all",
  });
  const [provinceOption, setProvinceOption] = useState([]);

  function searchApiCall(provinceValue) {
    let search_by = 0;
    let province = 0;
    let country = 0;

    if (provinceValue == "all") {
      search_by = 0;
      province = "";
      country = "";
    } else if (provinceValue == 0) {
      search_by = 2;
      province = "";
      country = countrySelected.value;
      setCountryData(countrySelected);
    } else {
      search_by = 1;
      country = "";
      province = provinceValue;
    }
    const classfiedQuery = {
      limit: 10,
      offset: 0,
      type: classifiedType,
      search_by: search_by,
      province: province,
      country: country,
      city: getValues("city"),
    };

    getWebClassifiedListSearch(classfiedQuery);
    dispatch(setClassifiedFilterData([{'isFilterApply':1,"search_by":search_by,"province":province,"country":country}]))
  }

  function handleClick() {
    searchApiCall(provinceSelected.value);
  }

  

  function handleChange(data) {
    setCountryData(data);
    setProvinceSelected(data);
    if (data.value != "0") {
      searchApiCall(data.value);
    }
  }

  async function getWebClassifiedListSearch(classfiedQuery) {
    const data = { userToken: userToken, whereQuery: classfiedQuery };
    if (classifiedType == CLASSIFIED_CATEGORY_TYPE.FORSALE) {
      dispatch(forSaleListApi(data)).then((responsejson) => {
        const response = responsejson.payload;
        if (response.status_code === STATUS_CODES.SUCCESS) {
          setResultData(response.data.total_count);
          closeModal();
         
        }
      });
    }

    if (classifiedType == CLASSIFIED_CATEGORY_TYPE.WANTED) {
      dispatch(getWantedListApi(data)).then((responsejson) => {
        const response = responsejson.payload;
        if (response.status_code === STATUS_CODES.SUCCESS) {
          setResultData(response.data.total_count);
          closeModal();
          
        }
      });
    }

    if (classifiedType == CLASSIFIED_CATEGORY_TYPE.JOBOFFER) {
      dispatch(getJobOfferListApi(data)).then((responsejson) => {
        const response = responsejson.payload;
        if (response.status_code === STATUS_CODES.SUCCESS) {
          setResultData(response.data.total_count);
          closeModal();
        }
      });
    }

    if (classifiedType == CLASSIFIED_CATEGORY_TYPE.JOBSEEKERS) {
      dispatch(getJobSeekerListApi(data)).then((responsejson) => {
        const response = responsejson.payload;
        if (response.status_code === STATUS_CODES.SUCCESS) {
          setResultData(response.data.total_count);
          closeModal();
        }
      });
    }
  }

  useEffect(() => {
    let countryOption = [];
    let provinceOption = [
      { value: "all", label: "All South Africa", id: "all" },
    ];
    async function getMetaDetails() {
      if (Object.keys(allMetaList).length > 0) {
        await allMetaList.countries.map((item) => {
          countryOption.push({
            label: item.name,
            value: item.id,
            id: item.id,
          });
        });
        await setCountryOption(countryOption);

        await allMetaList.provinces.map((item) => {
          provinceOption.push({
            label: item.name,
            value: item.id,
            id: item.id,
          });
        }); //getting selection option in array as province list
        provinceOption.push({ value: 0, label: "Out of South Africa", id: 0 });

        await setProvinceOption(provinceOption);
      }
    }
    getMetaDetails();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <Loader />
        </div>
      ) : null}
      <div className={styles.filterBox}>
        <div className={styles.CrossIcon}>
          <div className="inputBox">
            <Form.Group className="mb-3">
              <Select
                id="province"
                options={provinceOption}
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder={t("SELECT_PROVINCE")}
                // value={provinceSelected && provinceSelected}
                value={
                  countryData
                    ? countryData
                    : provinceSelected && provinceSelected
                }
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
            </Form.Group>

            {provinceSelected.value == 0 ? (
              <>
                <Form.Group className={`mb-3 `}>
                  <Select
                    id="country"
                    options={countryOption}
                    isSearchable={true}
                    onChange={setCountrySelected}
                    placeholder={t("COUNTRY_SET")}
                     value={countrySelected && countrySelected}
                      // value={countryData? countryData: countrySelected ? countrySelected:null}
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
                </Form.Group>

                {countrySelected.value !== "" ? (
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder={t("CITY_TEXT")}
                      {...register("city", {
                        required: {
                          value: true,
                          message: `${t("CITY_TEXT")}`,
                        },
                      })}
                    />
                  </Form.Group>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}

            <div className="buttonAdd">
              {provinceSelected.value == 0 ? (
                <CustomBtn onClick={() => handleClick()}>
                  {t("DONE_BUTTON")}
                </CustomBtn>
              ) : (
                ""
              )}
            </div>
          </div>
          <span className={styles.cancelIcon}>
            {" "}
            <RxCross2 onClick={closeModal} />
          </span>
        </div>
      </div>
    </>
  );
}
export default ClassifiedFilter;
