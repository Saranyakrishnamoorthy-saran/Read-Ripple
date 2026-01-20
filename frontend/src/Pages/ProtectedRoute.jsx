import { Navigate } from "react-router-dom";

// const myNavigate = Navigate();

function ProtectedRoute({children}) {
    const loggedUser = sessionStorage.getItem("loggedUser");

    if(!loggedUser) {
        return <Navigate to="/login" replace/>
    }
    return children;
}
export default ProtectedRoute;