import Footer from "../Components/Footer";
import Header from "../Components/Header";

function BlogPage() {
    return(
        <>
        <div className="container p-0 mt-5">
            <h3>Read Ripple Blog</h3>
            <p className="text-muted">Stories, reviews & reading inspiration</p>
            <div className="text-center my-5">
                <h5>No blogs available yet 📭!</h5>
                <p>Check back soon!!</p>
            </div>
        </div>
        {/* <Footer/> */}
        </>
    )
}
export default BlogPage;