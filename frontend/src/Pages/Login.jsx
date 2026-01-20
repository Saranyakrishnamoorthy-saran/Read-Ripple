import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

export default function Login(props){

    const[user, setUser] = useState({})

    const myNavigate = useNavigate();

    function loginCheck(e) {
        e.preventDefault();
        //console.log(user);

        axios.get(`http://localhost:5000/users/${user.id}`)
        //.then(res => console.log(res.data))
        //.catch(err => console.log(err.status))
        .then(res => {
            const user = res.data;
            if(user.role === "admin"){
                const userData = {
                    id: user.id,
                    mobile: user.mobile,
                    email: user.email,
                    role: user.role
                }
                sessionStorage.setItem("loggedUser", JSON.stringify(userData));
                props.setLoggedUser(user);
                myNavigate("/admin-dashboard")
            } 
            else if(user.role === "user") {
                const userData = {
                    id: user.id,
                    mobile: user.mobile,
                    email: user.email,
                    role: user.role
                }
                sessionStorage.setItem("loggedUser", JSON.stringify(userData));
                props.setLoggedUser(user);
                myNavigate("/")
            }
        })
        
        .catch(err => err.status===404 && alert("Username doesnt exist") )
    }

    return(
        <>
        <div className="container w-50" >
            <h3 className="text-center pt-5" >Login</h3>
            <form className="container w-50" onSubmit={loginCheck}>
                <div className="form-group">
                    <input type="text" onChange={(e) => setUser({...user, [e.target.name] : e.target.value})} name="id" placeholder="Username" className="form-control" />
                </div>
                <div className="form-group">
                    <input type="password" onChange={(e) => setUser({...user, [e.target.name] : e.target.value})} name="password" placeholder="Password" className="form-control" />
                </div>
                <input type="submit" value="Login" className="btn btn-primary mr-3" />
                <input type="reset" value="Cancel" className="btn btn-info mr-3"/>
                <Link to='/signup'> Create Account </Link>
            </form>
            
        </div>
        </>
    )
}