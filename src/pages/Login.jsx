import { useState, useContext } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { login } from "../apis/authentication";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cred, setCred] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const change = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(cred);
    setLoading(true);

     if(!cred.email || !cred.password) {
      toast.error("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const data = await login(cred);
      loginUser(data.token, data.role);
      navigate("/", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Login
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
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
          {loading ? "Logging in..." : "Login"}
        </Button>

        <Typography sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Button variant="text" onClick={() => navigate("/register")}>
            Register
          </Button>
        </Typography>
      </form>
    </Container>
  );
}