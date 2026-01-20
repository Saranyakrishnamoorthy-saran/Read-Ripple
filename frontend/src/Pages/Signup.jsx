import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";


export default function Signup() {

    const [user, setUSer] = useState({
        role: "user",
        profile: {
            gender: "",
            address: {
                street: "",
                city: "",
                pincode:0
            }
        }
    })

    const myNavigate = useNavigate();

    function signup(e){
        e.preventDefault();
        //console.log(user);

        let existingUser = [];

        axios.get('http://localhost:5000/users')
        .then(res => { existingUser = res.data }) //getting all existing users from db

        const existUser = existingUser.some((u) => u.id === user.id) //check the new data is present or not
        //console.log(user);

        if(!existUser) {
            console.log(user)
            axios.post('http://localhost:5000/users', user) //if the data is not exist it will add new data
            //.then(res => console.log(res.data))
            .then(res => {
                console.log(res.data)
                alert("Registered Successfully...")
                myNavigate("/login")
            })
        .catch(err => console.log(err))
        }
        else
            alert("User already Exist")
    }
    return(
        <>
        <div className="container w-50">
            <h3 className="text-center mt-5">Signup</h3>
            <form className="container w-50" onSubmit={signup}>
                <div className="form-group">
                    <input type="text" onChange={(e) => setUSer({...user, [e.target.name] : e.target.value})} name="id" placeholder="Username" className="form-control" />
                </div>
                <div className="form-group">
                    <input type="password" onChange={(e) => setUSer({...user, [e.target.name] : e.target.value})} name="password" placeholder="Password" className="form-control" />
                </div>
                <div className="form-group">
                    <input type="text" onChange={(e) => setUSer({...user, [e.target.name] : e.target.value})} name="mobile" placeholder="Mobile Number" className="form-control" />
                </div>
                <div className="form-group">
                    <input type="email" onChange={(e) => setUSer({...user, [e.target.name] : e.target.value})} name="email" placeholder="Email Id" className="form-control" />
                </div>
                <input type="submit" value="Signup" className="btn btn-warning"></input>
            </form>
        </div>
        </>
    )
}