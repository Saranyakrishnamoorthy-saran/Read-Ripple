import { useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

export function ContactPage() {

    const [feedback,setFeedback] = useState({
        name: "",
        email: "",
        message:""
    });

    function handleChange(e){
        setFeedback({...feedback,[e.target.name]:e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault();
        alert("Feedback submitted successfully!");
        setFeedback({name:"", email:"", message:""})
    }

    return(
        <>
        <div className="container w-50 mt-5">
            <h2 className="text-center mb-3">Contact Us</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input type="text" value={feedback.name} name="name" onChange={handleChange} placeholder="Your Name" className="form-control" required />
                </div>
                <div className="mb-4">
                    <input type="email" value={feedback.email} name="email" onChange={handleChange} placeholder="Your Email" className="form-control" required />
                </div>
                <div className="mb-4">
                    <textarea name="message" value={feedback.message} onChange={handleChange} placeholder="Your Message" className="form-control" rows="5" required/>
                </div>
                <button type="submit" className="btn btn-warning w-100">Submit</button>
            </form>
        </div>
        <Footer/>
        </>
    )
}
export default ContactPage;