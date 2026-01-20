import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


export default function Logout(){

    const myNavigate = useNavigate();

    useEffect (() => {
        sessionStorage.removeItem("loggedUser")
        myNavigate("/")
    },[])

    return(
        <>

        </>
    )
}