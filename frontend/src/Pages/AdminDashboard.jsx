import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function AdminDashboard() {

    const myNavigate = useNavigate();
    
    useEffect(()=>{
        const user = JSON.parse(sessionStorage.getItem("loggedUser"))

        if(!user)  //it returns null when no user logged in
            myNavigate("/login")
        else if(user.role !== "admin") {
            myNavigate("/")
        }
        
    },[])
    return(
        <>
        
        <div className="container-fluid vh-100 p-0">
            <h3 className="text-center bg-dark p-2 m-0 text-white">Admin Dashboard</h3>
            <div className="row">
                <div className="col-2 vh-100 bg-secondary">
                    <ul className="nav flex-column pt-5">
                        <li className="nav-item">
                            <Link to='/admin-dashboard' className="nav-link text-white" >Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/admin-books' className="nav-link text-white" >Books</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/admin-users' className="nav-link text-white" >Users</Link>
                        </li>
                    </ul>
                </div>
                <div className="col-10">
                   <h3 className="mt-5"> Hello Admin</h3>
                </div>
            </div>
        </div>
        </>
    )
}