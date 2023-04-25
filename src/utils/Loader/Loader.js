import styles from './Loader.module.css';
import loader from "../../assets/images/loader.gif";

//------Function for Loading -----

const Loader = () => {
    return (
        <div className={styles.loader}>
            <img src={loader} alt="loading" />
        </div>
    );
};

export default Loader;