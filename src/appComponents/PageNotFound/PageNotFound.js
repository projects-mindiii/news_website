import "./PageNotFound.css";

function PageNotFound() {
    return (
        <>
            <section className="notFoundWrapper">
                <h1 className="findError">Oops !</h1>
                <h1 className="notFound">404- Page Not Found</h1>
                <p>Sorry, the page you were looking for could not be found</p>
            </section>
        </>
    );
}
export default PageNotFound;