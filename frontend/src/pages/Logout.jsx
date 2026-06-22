import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.clear();
        navigate("/login");
    }, [navigate]);

    return <h1>Logging out...</h1>;
}

export default Logout;