import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import Context from "../context/ContextApi";
import { useContext } from "react";
import { useIsAuthenticated } from "react-auth-kit";

export default function Login() {
  const theme = createTheme();
  const navigate = useNavigate();
  const { submitLogin } = useContext(Context);
  const isAuthenticated = useIsAuthenticated();
  const [checkLogin, setCheckLogin] = useState(null);

  const handleSubmitSignIn = (event) => {
    try {
      submitLogin(event, navigate, setCheckLogin);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-page">
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "rgb(214, 255, 68)" }}>
                <LockOutlinedIcon />
              </Avatar>

              <Box
                component="form"
                noValidate
                onSubmit={handleSubmitSignIn}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Username"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Şifre"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Giriş Yap
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to="/login" variant="body2">
                      Şifremi unuttum?
                    </Link>
                  </Grid>
                  <Grid item>
                    <a href="/register" variant="body2">
                      {"Bir hesaba sahip değil misin? Kayıt ol"}
                    </a>
                  </Grid>
                </Grid>
                {checkLogin === false ? (
                  <p className="checkLogin">
                    {" "}
                    Kullanıcı adı veya şifre hatalı!{" "}
                  </p>
                ) : (
                  <></>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}
