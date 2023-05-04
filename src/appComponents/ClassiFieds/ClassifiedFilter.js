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
import { forSaleListApi, getJobOfferListApi, getJobSeekerListApi, getWantedListApi } from "../../store/slices/ClassifiedSlice";

function ClassifiedFilter() {
  const { userToken, allMetaList, isLoading } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    register,
    setValue,
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
    value: "0",
    id: "0",
  });

  const [provinceSelected, setProvinceSelected] = useState({
    value: "all",
    label: "All South Africa",
    id: "all",
  });
  const [provinceOption, setProvinceOption] = useState([]);
  


  function handleChange(e) {
    // console.log("event", event);
    setProvinceSelected(e);
    // function for classified webList
    async function getWebClassifiedLists() {
      const forSaleQuery = { limit: 10, offset: 0, type: CLASSIFIED_CATEGORY_TYPE.FORSALE, search_by: 2, province: 1, country:2, city:"indore"};
      const data = { userToken: userToken, whereQuery: forSaleQuery };
      dispatch(forSaleListApi(data)).then((responsejson) => {});

      const wantedQuery = { limit: 10, offset: 0, type: CLASSIFIED_CATEGORY_TYPE.WANTED, search_by: 2, province: 1, country:2, city:"indore" };
      const wantedData = { userToken: userToken, whereQuery: wantedQuery };
      dispatch(getWantedListApi(wantedData)).then((responsejson) => {});
      

      const jobOfferQuery = { limit: 10, offset: 0, type: CLASSIFIED_CATEGORY_TYPE.JOBOFFER, search_by: 2, province: 1, country:2, city:"indore" };
      const jobOfferData = { userToken: userToken, whereQuery: jobOfferQuery };
      dispatch(getJobOfferListApi(jobOfferData)).then((responsejson) => {
        console.log("response", responsejson);
      });

      const jobSeekerQuery = { limit: 10, offset: 0, type: CLASSIFIED_CATEGORY_TYPE.JOBSEEKER , search_by: 2, province: 1, country:2, city:"indore" };
      const jobSeekerData = { userToken: userToken, whereQuery: jobSeekerQuery };
      dispatch(getJobSeekerListApi(jobSeekerData)).then((responsejson) => {
        console.log("response", responsejson);
      });
    }
    getWebClassifiedLists();
  }

  console.log("provinceSelected",provinceSelected)

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
                onChange={setCountrySelected}
                placeholder={t("COUNTRY_SET")}
                value={countrySelected}
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

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Input City/Town"
                {...register("city", {
                  required: {
                    value: true,
                    message: "Input City/Town",
                  },
                })}
              />
            </Form.Group>
          </>
        ) : (
          ""
        )}

        <div className="buttonAdd">
          <CustomBtn onClick={() => handleChange(provinceSelected)}>Done</CustomBtn>
        </div>
      </div>
    </div>
  );
}
export default ClassifiedFilter;
