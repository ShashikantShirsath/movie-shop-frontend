import {
    AppBar,
    Toolbar,
    Button,
    Typography,
    Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
    const { role, logout, token } = useContext(AuthContext);

    console.log(role);
    return (
        <AppBar position="static" sx={{ backgroundColor: "#0E1113" }}>
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    px: 3,
                }}
            >

                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Movie App
                </Typography>

                <Box>
                    <Button
                        key={1}
                        component={Link}
                        to={"/"}
                        sx={{
                            color: "#fff",
                            "&:hover": {
                                backgroundColor: "#e5e7eb",
                                color: "#000",
                            },
                        }}
                    >
                        Home
                    </Button>

                    {role === "admin" && (
                        <Button
                        key={2}
                        component={Link}
                        to={"/add"}
                        sx={{
                            color: "#fff",
                            "&:hover": {
                                backgroundColor: "#e5e7eb",
                                color: "#000",
                            },
                        }}
                    >
                        Add Movie
                    </Button>
                    )}

                    {!token ? (
                        <Button
                            key={3}
                            component={Link}
                            to="/login"
                            sx={{
                                color: "#fff",
                                "&:hover": {
                                    backgroundColor: "#e5e7eb",
                                    color: "#000",
                                },
                            }}
                        >
                            Login
                        </Button>
                    ) : (
                        <Button
                            key={3}
                            onClick={logout}
                            sx={{
                                color: "#fff",
                                "&:hover": {
                                    backgroundColor: "#fca5a5",
                                    color: "#000",
                                },
                            }}
                        >
                            Logout
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
