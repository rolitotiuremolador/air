import { Link } from "react-router-dom";

function Landing() {
    return (
        <div>
            <h1>Welcome to my App!</h1>
            <p>This is a public page.</p>
            <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </div>
    );
}
export default Landing;