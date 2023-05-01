import styles from '../Products.module.css';
import companyLogo from "../../../assets/images/roland.png";

//  -------function for display product list------
function ProductList() {
    return (
        <div>
            <div className={styles.products}>
                <h2>3D Printers - <span>3 Results</span></h2>
            </div>
            <div className={styles.productslist}>
                <img src={companyLogo} alt="deals" />
                <div className={styles.productDiscription}>
                    <h3>Roland</h3>
                    <p>40, Kalyani business park,south Africa</p>
                    <h5>2 Deals</h5>
                </div>
            </div>

            <div className={styles.productslist}>
                <img src={companyLogo} alt="deals" />
                <div className={styles.productDiscription}>
                    <h3>Roland</h3>
                    <p>40, Kalyani business park,south Africa</p>
                    <h5>2 Deals</h5>
                </div>
            </div>

            <div className={styles.productslist}>
                <img src={companyLogo} alt="deals" />
                <div className={styles.productDiscription}>
                    <h3>Roland</h3>
                    <p>40, Kalyani business park,south Africa</p>
                    <h5>2 Deals</h5>
                </div>
            </div>

            <div className={styles.productslist}>
                <img src={companyLogo} alt="deals" />
                <div className={styles.productDiscription}>
                    <h3>Roland</h3>
                    <p>40, Kalyani business park,south Africa</p>
                    <h5>2 Deals</h5>
                </div>
            </div>
        </div>
    );
}
export default ProductList;