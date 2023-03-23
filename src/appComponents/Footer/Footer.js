import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./Footer.css";
import Facebook from "../../assets/images/facebook_ico.png";
import Twitter from "../../assets/images/twitter_ico.png";
import Linkedin from "../../assets/images/linkdin_ico.png";
import Instragram from "../../assets/images/instagram_ico.png";
import Youtube from "../../assets/images/youtube_ico.png";
import Telegram from "../../assets/images/send_ico.png";
import Image1 from "../../assets/images/image1.png";
import AppStore from "../../assets/images/appStore.png";
import GooglePlay from "../../assets/images/googlePlay.png";
import AppGallery from "../../assets/images/appGallery.png";
import Image2 from "../../assets/images/image2.png";
import Image3 from "../../assets/images/image3.png";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

//--------Create a Footer component----------
function Footer() {
    //set language
  const { t, i18n } = useTranslation();

    //-----react useform use for validation-----
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    //----- function for submit login form-----
    const onsubmit = (data) => {
        console.log(data);
    }

    return (
        <>
            <section className="footer">
                <Container>
                    <div className="footerContent">
                        <Row>
                            <Col lg={4} md={4}>
                                <div className="signAfricaImg">
                                    <img src={Image1} alt="sign-Africa" />
                                </div>

                                <div className="socialIcon">
                                    <img src={Facebook} alt="facebook" />
                                    <img src={Twitter} alt="twitter" />
                                    <img src={Linkedin} alt="linkedin" />
                                    <img src={Instragram} alt="instragram" />
                                    <img src={Youtube} alt="youtube" />
                                    <img src={Telegram} alt="telegram" />
                                </div>
                                <div className="signContent">
                                    <h6>{t("FOOTER_TEXT")}</h6>
                                </div>
                                <div className="appStoresImg">
                                    <a
                                        href="#"
                                        target="_blank"
                                    >
                                        <img src={AppStore} alt="appstore" />
                                    </a>
                                    <a
                                        href="#"
                                        target="_blank"
                                    >
                                        <img src={GooglePlay} alt="googlePlay" />
                                    </a>
                                    <a
                                        href="#"
                                        target="_blank"
                                    >
                                        <img src={AppGallery} alt="appGallery" />
                                    </a>
                                </div>
                            </Col>
                            <Col lg={4} md={4}>
                                <div className="linkHeading">
                                    <h6>{t("QUICK_LINKS")}</h6>
                                    <div className="linkNames">
                                        <h6>{t("NEWS_LINKS")}</h6>
                                        <h6>{t("JOB_LINKS")}</h6>
                                        <h6>{t("ADVERTIES_LINKS")}</h6>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4} md={4}>
                                <div className="linkHeading">
                                    <h6>{t("OUR MEDIA")}</h6>
                                    <div className="companyImg">
                                        <img src={Image2} alt="sign-Africa" />
                                        <img src={Image3} alt="sign-Africa" />
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
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>
            <section className="footerBottom">

            </section>
        </>
    );
}
export default Footer;