import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Home() {
  const navigate = useNavigate();
  const [ideas, setIdeas] = useState([]);

  // State for the new form 
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("TECHNICAL");

  useEffect(() => {
    getIdeas();
  }, []);

  const getIdeas = () => {
    api.get("/api/ideas/")
      .then((rest) => setIdeas(rest.data))
      .catch((err) => {
        console.error("Error:", err);
        alert("Failed to load ideas");
      })
  };

  const createIdea = (e) => {
    e.preventDefault();
    api.post("/api/ideas/", { title, content, category })
      .then((res) => {
        alert("Idea created!");
        getIdeas(); // Refresh the list after creating new item
        setTitle(""); // Clear form
        setContent("");
      })
  }

  const handleLogoutClick = () => {
    // Redirects to your existing /logout route to let it handle cleanup
    navigate("/logout"); 
 
  };

  return (
    <div style={styles.container}>
      {/* Top Navigation Bar */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>AIR </div>
        <div style={styles.navLinks}>
          <Link to="/" style={styles.link}>Home</Link>
          <button onClick={handleLogoutClick} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </nav>

      {/* Main Protected Content */}
      <main style={styles.mainContent}>
        <h3>Welcome Back in AIR!</h3>
        <hr />
        {/* Create a new idea form  */}
        <form action="" onSubmit={createIdea} style={styles.form}>
          <h4>Capture New Idea</h4>

          <input type="text" placeholder="Title" value={title} 
            onChange={(e) =>
              setTitle(e.target.value)} required
            style={styles.input}/>
          
          <textarea name="" id="" style={styles.input}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required />

          <select name="" id="" style={styles.input}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="TECHNICAL">Technical</option>
            <option value="LIFE">Life</option>
            <option value="RESOURCES">Resources</option>
          </select>

          <button type="submit">Save Idea</button>

        </form>

        <div>
          <ul>
            {ideas.map((idea) => (
              <li 
                key={idea.id}>
                 <strong> {idea.title}</strong> - {idea.category}
                 <p>{idea.content}</p>
              </li>
            ))}
          </ul>
        </div>

      </main>
    </div>
  );
}

// Basic CSS-in-JS Styles
const styles = {
  container: {
    fontFamily: "sans-serif",
    minHeight: "100vh",
    backgroundColor: "#f4f4f9",
    margin: 0,
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#1e293b",
    color: "#fff",
  },
  logo: {
    fontWeight: "bold",
    fontSize: "1.25rem",
  },
  navLinks: {
    display: "flex",
    gap: "1.5rem",
    alignItems: "center",
  },
  link: {
    color: "#cbd5e1",
    textDecoration: "none",
    fontWeight: "500",
  },
  logoutBtn: {
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "500",
  },
  mainContent: {
    padding: "2rem",
    textAlign: "center",
  },

  form: { display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px", margin: "20px auto" },
  input: { padding: "8px", borderRadius: "4px", border: "1px solid #ccc" },
  submitBtn: { padding: "10px", backgroundColor: "#10b981", color: "white", border: "none", cursor: "pointer" }
};

export default Home;