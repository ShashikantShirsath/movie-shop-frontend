import { useState, useContext } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { login, register } from "../apis/authentication";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cred, setCred] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const change = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if(!cred.name || !cred.email || !cred.password) {
      toast.error("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const data = await register(cred);
      navigate("/login", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Register
      </Typography>

      <form onSubmit={handleSubmit}>

        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          type="text"
          value={cred.name}
          onChange={change}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={cred.email}
          onChange={change}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          name="password"
          value={cred.password}
          onChange={change}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          type="submit"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </Button>

        <Typography sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Button variant="text" onClick={() => navigate("/login")}>
            Login
          </Button>
        </Typography>
      </form>
    </Container>
  );
}