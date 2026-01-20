export function Footer() {

    return(
        <>
        <footer className="bg-warning text-black mt-5">
            <div className="container py-3">
                <div className="row">
                    <div className="col-md-4">
                        <h5>Read Ripple</h5>
                        <p className="small">Your daily destination for books, stories and knowledge</p>
                    </div>
                    <div className="col-md-4">
                        <h6>Quick Links</h6>
                        <ul className="list-unstyled">
                            <li><a href="/" className="text-light text-decoration-none">Home</a></li>
                            <li><a href="/books" className="text-light text-decoration-none">Books</a></li>
                            <li><a href="/blog" className="text-light text-decoration-none">Blog</a></li>
                            <li><a href="/contact" className="text-light text-decoration-none">Contact</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h6>Contact</h6>
                        <p className="small mb-1">📧 readripple@gmail.com</p>
                        <p className="small mb-0">📞 +91 98765 43210</p>
                    </div>
                </div>

                <div className="text-center bg-black py-2">
                    <small>&copy; {new Date().getFullYear()} Read Ripple | All rights reserved</small>
                </div>
            </div>
        </footer>
        </>
    )
}
export default Footer;