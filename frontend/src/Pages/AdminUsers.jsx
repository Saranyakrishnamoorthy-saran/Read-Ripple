import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function AdminUsers() {

    const[users,setUsers] = useState([])

    const myNavigate = useNavigate();
    
    useEffect(()=>{
        const user = JSON.parse(sessionStorage.getItem("loggedUser"))

        if(!user)  //it returns null when no user logged in
            myNavigate("/login")
        else if(user.role !== "admin") {
            myNavigate("/")
        }
        
    },[])
    
    useEffect(()=> {
        axios.get('http://localhost:5000/users')
        .then(res => setUsers(res.data))
    }, [])

    // function searchByUser() {
    //     const filteredUsers = users.filter((user)=> user.id === id)
    //     console.log(filteredUsers)
    //     setUsers(filteredUsers)
    // }

    function deleteUser(id) {
        const filteredUsers = users.filter((user)=> user.id !== id)
        console.log(filteredUsers)
        setUsers(filteredUsers)
    }
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
                    <div className="d-flex justify-content-between">
                        <h3 className="mt-5">All Users</h3>
                        {/* <div className="filter mt-5">
                            <div className="serach-by-user">
                                <input type="text" name="" onChange={(e) => setUsers(e.target.value)} placeholder="User Id" className="form-control" />
                                <button onClick={searchByUser}>Search</button>
                            </div>
                        </div> */}
                    </div>

                   <table className="table mt-5">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            {/* <th>Role</th> */}
                            <th>Gender</th>
                            <th>Mobile</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user) => {
                                return <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    {/* <td>{user.role}</td> */}
                                    <td>{user.gender}</td>
                                    <td>{user.mobile}</td>
                                    <td>{user.email}</td>
                                    <td><button onClick={() => deleteUser(user.id)}>Delete</button></td>
                                </tr>
                            })
                        }
                    </tbody>
                   </table>
                   {/* <Link to="/add-book" className="btn btn-info">Add New Book</Link> */}
                </div>
            </div>
        </div>
        </>
    )
}