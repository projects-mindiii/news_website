import mapicon from "../assets/images/map_ico.png";
import { Row, Col } from "react-bootstrap";
import bookmarkicon from "../assets/images/bookmark_ico.png";
import forsale from "../assets/images/for_sale_img.png";
import watchicon from "../assets/images/watch_ico.png";

function CommonDataShow(props) {
    return (
        <div className="classiFieds_forSaleBox">
                  <div className="classiFieds_forSale_about">
                    <div className="classiFieds_forSale">
                      <img src={props.yourdata.img_url} alt={forsale} />
                    </div>
                    <div className="classiFields_heading">
                      <p className="text">{props.yourdata.heading}</p>
                      <div className="classiFieds_time_action">
                        <div className="classiFieds_time">
                          <button
                            className="classiFieds_forSale_button"
                            style={{
                              background: `linear-gradient(to right, ${props.yourdata.color_code && props.yourdata.color_code.start_color}, ${props.yourdata.color_code && props.yourdata.color_code.end_color})`,
                              color: `text-color(to text color, ${props.yourdata.color_code &&props.yourdata.color_code.text_color})`,
                            }}
                          >
                            {props.yourdata.category_name ? props.yourdata.category_name : ""}
                          </button>

                          <span>
                            <span>
                              <img src={watchicon} alt={watchicon} />{" "}
                            </span>{" "}
                            {props.yourdata.created_date}
                          </span>
                        </div>
                        <div className="classiFieds_bookmarkicon">
                          <img src={bookmarkicon} alt={bookmarkicon} />
                        </div>
                      </div>
                    </div>
                  </div>
                 
                   {/* {classifiedDataType == 6 || classifiedDataType==7?(
                    <div className="jobType">
                    <p>{(item.job_type_name)?item.job_type_name+`-`:"" }{item.job_location_type_name}</p>
                   </div>

                  ): ""} */}
                 

                  
                    {/* <div className="classiFieds_RupeesText">
                      <p>
                        {item.currency_code} {new Intl.NumberFormat().format(item.amount)}
                      </p>
                      <span>{(classifiedDataType == 6)?item.earning_name:item.currency_name} {(item.is_negotiable)?"(Negotiable)":""}</span>
                    </div> */}
                  

                  <div className="classiFieds_countryName ">
                    <span>
                      <img src={mapicon} alt={mapicon} />{" "}
                      <span>
                        {" "}
                        {props.yourdata.country_name},{props.yourdata.province_name},{props.yourdata.city}
                      </span>
                    </span>
                  </div>
                  <div className="classiFieds_aboutText">
                    <p> {props.yourdata.description}</p>
                  </div>
        </div>
    );
}

export default CommonDataShow;
