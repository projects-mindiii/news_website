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
  setClassifiedFilterName,
} from "../../store/slices/ClassifiedSlice";
import { STATUS_CODES } from "../../utils/StatusCode";
import Loader from "../../utils/Loader/Loader";
import { useLocation } from "react-router-dom";

function ClassifiedFilter({ closeModal, setResultData }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isLoading, classifiedFilterValues } = useSelector(
    (state) => state.classified
  );

  const { userToken, allMetaList } = useSelector((state) => state.user);
  const {
    register,
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

  let countrySelectedValue = {
    label: "All Country",
    value: "",
    id: "0",
  };

  // function for default south africa
  if (Object.keys(classifiedFilterValues).length !== 0) {
    if (classifiedFilterValues.refrenceType == "2") {
      if (classifiedFilterValues.countryId > 0) {
        countrySelectedValue = {
          value: classifiedFilterValues.countryId,
          label: classifiedFilterValues.name,
          id: classifiedFilterValues.countryId,
        };
      } else {
        countrySelectedValue = countrySelectedValue;
      }
    }
  }

  const [countrySelected, setCountrySelected] = useState(countrySelectedValue);
  let provinceSelectedValue = {
    value: "all",
    label: "All South Africa",
    id: "all",
  };

   // function for Outside south africa
  if (Object.keys(classifiedFilterValues).length !== 0) {
    if (classifiedFilterValues.refrenceType == "1") {
      provinceSelectedValue = {
        value: classifiedFilterValues.refrenceId,
        label: classifiedFilterValues.name,
        id: classifiedFilterValues.refrenceId,
      };
    } else {
      provinceSelectedValue = { value: 0, label: "Out of South Africa", id: 0 };
    }
  }
  const [provinceSelected, setProvinceSelected] = useState(
    provinceSelectedValue
  );
  const [provinceOption, setProvinceOption] = useState([]);

  // function for filter api
  function searchApiCall(provinceValue) {
    let search_by = 0;
    let province = 0;
    let country = 0;

    if (provinceValue.value == "all") {
      search_by = 0;
      province = "";
      country = "";
      const value = {
        name: "All South Africa",
        refrenceType: "1",
        refrenceId: "all",
      };
      dispatch(setClassifiedFilterName(value));
    } else if (provinceValue.value == 0) {
      search_by = 2;
      province = "";
      country = countrySelected.value;
      let name = "Out of South Africa";
      let countryId = 0;
      let city = "";

      if (countrySelected.value) {
        name = countrySelected.label;
        countryId = countrySelected.value;
        city = getValues("city") ? getValues("city") : "";
      }
      const value = {
        name: name,
        refrenceType: "2",
        refrenceId: 0,
        countryId: countryId,
        city: city,
      };
      dispatch(setClassifiedFilterName(value));

    } else {
      search_by = 1;
      country = "";
      province = provinceValue.value;
      const value = {
        name: provinceValue.label,
        refrenceType: "1",
        refrenceId: provinceValue.value,
      };
      dispatch(setClassifiedFilterName(value));
    }
    const classfiedQuery = {
      limit: 10,
      offset: 0,
      search_by: search_by,
      province: province,
      country: country,
      city: getValues("city") ? getValues("city") : "",
    };

    getWebClassifiedListSearch(classfiedQuery);
  }

  function handleClick() {
    searchApiCall(provinceSelected);
  }

  function handleChange(data) {
    setProvinceSelected(data);
    if (data.value != "0") {
      searchApiCall(data);
      closeModal();
    }
  }

  // function for categoryList api
  async function getWebClassifiedListSearch(classfiedQuery) {
    const data = { userToken: userToken, whereQuery: classfiedQuery };
    if (location.pathname == "/classifieds") {
      if (CLASSIFIED_CATEGORY_TYPE.FORSALE) {
        data.whereQuery.type = CLASSIFIED_CATEGORY_TYPE.FORSALE;
        dispatch(forSaleListApi(data)).then((responsejson) => {
          const response = responsejson.payload;
          if (response.status_code === STATUS_CODES.SUCCESS) {
            setResultData(response.data.total_count);
            closeModal();
          }
        });
      }

      if (CLASSIFIED_CATEGORY_TYPE.WANTED) {
        data.whereQuery.type = CLASSIFIED_CATEGORY_TYPE.WANTED;
        dispatch(getWantedListApi(data)).then((responsejson) => {
          const response = responsejson.payload;
          if (response.status_code === STATUS_CODES.SUCCESS) {
            setResultData(response.data.total_count);
            closeModal();
          }
        });
      }
    }

    if (location.pathname == "/job-types") {
      if (CLASSIFIED_CATEGORY_TYPE.JOBOFFER) {
        data.whereQuery.type = CLASSIFIED_CATEGORY_TYPE.JOBOFFER;
        dispatch(getJobOfferListApi(data)).then(async (responsejson) => {
          const response = responsejson.payload;
          if (response.status_code === STATUS_CODES.SUCCESS) {
            closeModal();
          }
        });
      }
      if (CLASSIFIED_CATEGORY_TYPE.JOBSEEKERS) {
        data.whereQuery.type = CLASSIFIED_CATEGORY_TYPE.JOBSEEKERS;
        dispatch(getJobSeekerListApi(data)).then(async (responsejson) => {
          const response = responsejson.payload;
          if (response.status_code === STATUS_CODES.SUCCESS) {
            closeModal();
          }
        });
      }
    }
  }

  // function for get all metaList
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
                value={provinceSelected && provinceSelected}
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
