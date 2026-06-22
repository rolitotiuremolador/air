import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Form({route, method}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password });
            console.log("Response data:", res.data);
            if (method === "login") {
                console.log("Storing tokens...");
                localStorage.setItem("ACCESS_TOKEN", res.data.access);
                localStorage.setItem("REFRESH_TOKEN", res.data.refresh);
                navigate("/"); // Redirect to Dashboard
                // Force a full browser reload to the home page
                // window.location.href = "/";
            } else {
                navigate("/login"); // Redirect to login after registration
            }
        } catch (error) {
            // alert(error);
            if (error.response){
                // Server responses with a status code outside the 2xx range 
                console.log("Datat:", error.response.data);
                console.log("Status:", error.response.status);
                alert(`Error ${error.response.status}: ${JSON.stringify(error.response.data)}`);
            } else {
                alert(error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{method==="login" ? "Login" : "Register"}</h1>
            <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username" required            
            />
            <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" required
            />
            <button type="submit" disabled={loading}>
                {loading ? "Loading..." : method === "login" ? "Login" : "Regiser"}
            </button>
        </form>
    );
}

export default Form;