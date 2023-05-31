import styles from "./ClassifiedFilter.module.css";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import CustomBtn from "../../formComponent/Button/Button";
import { CLASSIFIED_CATEGORY_TYPE,PAGINATION_VALUE, SEARCH_TYPE, CLASSIFIED_REFRENCE_TYPE } from "../../utils/Constants";
import {
  forSaleListApi,
  getJobOfferListApi,
  getJobSeekerListApi,
  getWantedListApi,
  setClassifiedFilterName,
} from "../../store/slices/ClassifiedSlice";
import { STATUS_CODES } from "../../utils/StatusCode";
import Loader from "../../utils/Loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { Toast } from "../../utils/Toaster";
import { guestUserLogin, userLogout } from "../../store/slices/UserSlice";

function ClassifiedFilter({ closeModal, setResultData }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isLoading, classifiedFilterValues } = useSelector(
    (state) => state.classified
  );
  const navigate = useNavigate()
  const { userToken, allMetaList } = useSelector((state) => state.user);
  const {
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const [countryOption, setCountryOption] = useState([
    {
      label:`${t("ALL_COUNTRY")}`,
      value: "0",
      id: "0",
    },
  ]);

  let countrySelectedValue = {
    label:`${t("ALL_COUNTRY")}`,
    value: "",
    id: "0",
  };

  // function for default south africa
  if (Object.keys(classifiedFilterValues).length !== 0) {
    if (classifiedFilterValues.refrenceType == CLASSIFIED_REFRENCE_TYPE.OUTSIDE_SOUTH_AFRICA) {
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
    value:`${t("REFRENCE_ID")}`,
    label:`${t("COUNTRY_NAME")}`,
    id:`${t("REFRENCE_ID")}`,
  };

   // function for Outside south africa
  if (Object.keys(classifiedFilterValues).length !== 0) {
    if (classifiedFilterValues.refrenceType == CLASSIFIED_REFRENCE_TYPE.ALL_SOUTH_AFRICA) {
      provinceSelectedValue = {
        value: classifiedFilterValues.refrenceId,
        label: classifiedFilterValues.name,
        id: classifiedFilterValues.refrenceId,
      };
    } else {
      provinceSelectedValue = { value: 0, label:`${t("OUTOF_SOUTH")}`, id: 0 };
    }
  }
  const [provinceSelected, setProvinceSelected] = useState(
    provinceSelectedValue
  );
  const [provinceOption, setProvinceOption] = useState([]);

  // function for filter api
  function searchApiCall(provinceValue) {
    let search_by = SEARCH_TYPE.ALL_SOUTH_AFRICA;
    let province = 0;
    let country = 0;

    if (provinceValue.value == `${t("REFRENCE_ID")}`) {
      search_by =  SEARCH_TYPE.ALL_SOUTH_AFRICA;
      province = "";
      country = "";
      const value = {
        name:`${t("COUNTRY_NAME")}`,
        refrenceType: CLASSIFIED_REFRENCE_TYPE.ALL_SOUTH_AFRICA,
        refrenceId:`${t("REFRENCE_ID")}`,
      };
      dispatch(setClassifiedFilterName(value));
    } else if (provinceValue.value == 0) {
      search_by =  SEARCH_TYPE.OUTSIDE_SOUTH_AFRICA;
      province = "";
      country = countrySelected.value;
      let name = `${t("OUTOF_SOUTH")}`;
      let countryId = 0;
      let city = "";

      if (countrySelected.value) {
        name = countrySelected.label;
        countryId = countrySelected.value;
        city = getValues("city") ? getValues("city") : "";
      }
      const value = {
        name: name,
        refrenceType: CLASSIFIED_REFRENCE_TYPE.OUTSIDE_SOUTH_AFRICA,
        refrenceId: 0,
        countryId: countryId,
        city: city,
      };
      dispatch(setClassifiedFilterName(value));

    } else {
      search_by = SEARCH_TYPE.PROVINCE;
      country = "";
      province = provinceValue.value;
      const value = {
        name: provinceValue.label,
        refrenceType: CLASSIFIED_REFRENCE_TYPE.ALL_SOUTH_AFRICA,
        refrenceId: provinceValue.value,
      };
      dispatch(setClassifiedFilterName(value));
    }
    const classfiedQuery = {
      limit: PAGINATION_VALUE.DEFAULT_LIMIT,
      offset: PAGINATION_VALUE.DEFAULT_OFFSET,
      search_by: search_by,
      province: province,
      country: country,
      city: getValues("city") ? getValues("city") : "",
    };

    getWebClassifiedListSearch(classfiedQuery);
  }

  function handleClick() {
    searchApiCall(provinceSelected);
    closeModal();
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
        dispatch(forSaleListApi(data)).then(async (responsejson) => {
          const response = responsejson.payload.response;
          if (response.status_code === STATUS_CODES.SUCCESS) {
            setResultData(response.data.total_count);
            closeModal();
          } else if (response.status === STATUS_CODES.INVALID_TOKEN) {
            Toast.fire({
              icon: "error",
              title: t("SESSION_EXPIRE"),
            });
            await dispatch(userLogout(userToken)).then(() => {
              dispatch(guestUserLogin());
              navigate("/login");
            })
          }
        });
      }

      if (CLASSIFIED_CATEGORY_TYPE.WANTED) {
        data.whereQuery.type = CLASSIFIED_CATEGORY_TYPE.WANTED;
        dispatch(getWantedListApi(data)).then(async(responsejson) => {
          const response = responsejson.payload.response;
          if (response.status_code === STATUS_CODES.SUCCESS) {
            setResultData(response.data.total_count);
            closeModal();
          } else if (response.status === STATUS_CODES.INVALID_TOKEN) {
            Toast.fire({
              icon: "error",
              title: t("SESSION_EXPIRE"),
            });
            await dispatch(userLogout(userToken)).then(() => {
                    dispatch(guestUserLogin());
                    navigate("/login");
        })
          }
        });
      }
    }

    if (location.pathname == "/job-types") {
      if (CLASSIFIED_CATEGORY_TYPE.JOBOFFER) {
        data.whereQuery.type = CLASSIFIED_CATEGORY_TYPE.JOBOFFER;
        dispatch(getJobOfferListApi(data)).then(async (responsejson) => {
          const response = responsejson.payload.response;
          if (response.status_code === STATUS_CODES.SUCCESS) {
            closeModal();
          }
           else if (response.status === STATUS_CODES.INVALID_TOKEN) {
            Toast.fire({
              icon: "error",
              title: t("SESSION_EXPIRE"),
            });
            await dispatch(userLogout(userToken)).then(() => {
                  dispatch(guestUserLogin());
                  navigate("/login");
        })
          }
        });
      }
      if (CLASSIFIED_CATEGORY_TYPE.JOBSEEKERS) {
        data.whereQuery.type = CLASSIFIED_CATEGORY_TYPE.JOBSEEKERS;
        dispatch(getJobSeekerListApi(data)).then(async (responsejson) => {
          const response = responsejson.payload.response;
          if (response.status_code === STATUS_CODES.SUCCESS) {
            closeModal();
          } else if (response.status === STATUS_CODES.INVALID_TOKEN) {
            Toast.fire({
              icon: "error",
              title: t("SESSION_EXPIRE"),
            });
            await dispatch(userLogout(userToken)).then(() => {
                  dispatch(guestUserLogin());
                  navigate("/login");
        })
          }
        });
      }
    }
  } 

  // function for get all metaList
  useEffect(() => {
    let countryOption = [];
    let provinceOption = [
      { value:`${t("REFRENCE_ID")}`, label:`${t("COUNTRY_NAME")}`, id:`${t("REFRENCE_ID")}` },
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
        provinceOption.push({ value: 0, label: `${t("OUTOF_SOUTH")}`, id: 0 });

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
