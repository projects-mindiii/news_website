import "./Loader.css";
import loader from "../../assets/images/loader.gif";

//------Function for Loading -----

const Loader = () => {
    return (
        <div>
            <img src={loader} alt="loading" />
        </div>
    );
};

export default Loader;