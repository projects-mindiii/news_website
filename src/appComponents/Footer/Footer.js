import { Col, Container, Row } from "react-bootstrap";
import "./Footer.css";
import Image1 from "../../assets/images/image1.png";
import Image2 from "../../assets/images/image2.png";
import Image3 from "../../assets/images/image3.png";
import { useTranslation } from "react-i18next";
import { footerData } from "./FooterData";
import { useLocation } from "react-router-dom";

//--------Create a Footer component----------
function Footer() {
    //set language
    const { t } = useTranslation();
    const location = useLocation();

    return (
        <>
            <Container className="screenOverride">
                {location.pathname == "/classifieds" || location.pathname == "/job-types" ?
                    <div className="bannerImg">
                        <iframe src={process.env.REACT_APP_CLASSIFIED_FOOTER_IFRAME_URL}
                            style={{
                                width: "100%",
                                height: "95%",
                                margin: "0px",
                                border: "none",
                                scrollBehavior: "none",
                                allowfullscreen: "true",
                            }}>
                        </iframe></div>
                    : ""}
            </Container>

            <section className="footer">
                <Container>
                    <div className="footerContent">
                        <Row>
                            <Col lg={5} md={5} sm={6}>
                                <div className="signAfricaImg">
                                    <img src={Image1} alt="sign-Africa" />
                                </div>

                                <div className="socialIcon">
                                    {(footerData.sociallogo).map((item, index) => (
                                        <a
                                            href={item.link}
                                            key={index}
                                            target="blank"
                                        >
                                            <img src={item.logo} alt="social-logo" />
                                        </a>
                                    ))}

                                </div>
                                <div className="signContent">
                                    <h6>{t("FOOTER_TEXT")}</h6>
                                </div>
                                <div className="appStoresImg">
                                    {(footerData.socialapp).map((item1, index1) => (
                                        <a
                                            href="#"
                                            target="blank"
                                            key={index1}
                                        >
                                            <img src={item1.socialapp} alt="apps" />
                                        </a>
                                    ))}

                                </div>
                            </Col>
                            <Col lg={3} md={3} sm={2}>
                                <div className="linkHeading">
                                    <h6>{t("QUICK_LINKS")}</h6>
                                    <div className="linkNames">
                                        {(footerData.links).map((item2, index2) => (
                                            <a href={item2.link} key={index2}>
                                                <h6>{item2.text}</h6>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4} md={4} sm={4}>
                                <div className="linkHeadingWrapper">
                                    <div className="linkHeading">
                                        <h6>{t("OUR MEDIA")}</h6>
                                        <div className="companyImg">
                                            <img src={Image2} alt="africa-print" />
                                            <img src={Image3} alt="modern-marketing" />
                                        </div>
                                        {/*<div className="subscribeForm">
                                        <h5>{t("SUBSCRIPTION_TEXT")}</h5>
                                        <Form onSubmit={handleSubmit(onsubmit)}>
                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>{t("YOUR_NAME")}</Form.Label>
                                                <Form.Control type="text" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>{t("YOUR_EMAIL")}</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    {...register("email", {
                                                        required: {
                                                            value: true,
                                                            message: "Email is required"
                                                        },
                                                        maxLength: {
                                                            value: 50,
                                                            message: "Email must be 50 character or small"
                                                        },
                                                        pattern: {
                                                            value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                            message: "Enter valid email address"
                                                        }
                                                    })}
                                                />
                                                {errors.email && (
                                                    <span className="errorMsg">
                                                        {errors.email.message}
                                                    </span>
                                                )}
                                            </Form.Group>
                                            <Button type="submit">
                                                Subscribe
                                            </Button>
                                        </Form>
                                    </div> */}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section >
            <section className="footerBottom">

            </section>
        </>
    );
}
export default Footer;