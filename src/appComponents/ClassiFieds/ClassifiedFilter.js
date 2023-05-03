import styles from "./ClassifiedFilter.module.css";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import CustomBtn from "../../formComponent/Button/Button";

function ClassifiedFilter() {
  const [countryCode, setCountryCode] = useState("za");
  const { userToken, allMetaList, isLoading } = useSelector(
    (state) => state.user
  );
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

  function handleChange(event) {
    console.log("event", event);
    setProvinceSelected(event);
  }

  useEffect(() => {
    let countryOptions = [];
    let provinceOptions = [
      { value: "all", label: "All South Africa", id: "all" },
    ];
    async function getMetaDetails() {
      if (Object.keys(allMetaList).length > 0) {
        await allMetaList.countries.map((item) => {
          countryOptions.push({
            label: item.name,
            value: item.id,
            id: item.id,
          });
        });
        await setCountryOption(countryOptions);

        await allMetaList.provinces.map((item) => {
          provinceOptions.push({
            label: item.name,
            value: item.id,
            id: item.id,
          });
        }); //getting selection option in array as province list
        provinceOptions.push({ value: 0, label: "Out of South Africa", id: 0 });

        await setProvinceOption(provinceOptions);
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
            onChange={(event) => {
              handleChange(event);
            }}
            placeholder={t("SELECT_PROVINCE")}
            value={provinceSelected}
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
          <CustomBtn onClick={() => handleChange()}>Done</CustomBtn>
        </div>
      </div>
    </div>
  );
}
export default ClassifiedFilter;
