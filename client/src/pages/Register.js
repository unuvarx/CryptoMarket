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
import { Link } from "react-router-dom";
import { useContext } from "react";
import Context from "../context/ContextApi";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { submitRegister, submitLogin } = useContext(Context);
  const [isRegister, setIsRegister] = useState(null);
  const navigate = useNavigate();
  const theme = createTheme();
  const handleSubmitSignUp = (event) => {
    try {
      submitRegister(event, navigate, setIsRegister);
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
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "rgb(214, 255, 68)" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Kayıt Ol
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmitSignUp}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="Ad"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Soyad"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="username"
                      label="Kullanıcı Adı"
                      name="username"
                      autoComplete="username"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="phone"
                      label="Telefon"
                      name="phone"
                      autoComplete="phone"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Adres"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Şifre"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Kayıt Ol
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to="/login">Zaten bir hesabın var mı? Giriş Yap</Link>
                  </Grid>
                </Grid>
              </Box>
              {isRegister === false ? (<p style={{ color: "red", fontSize: '13px' }}>Lütfen tüm alanları doğru giriniz!</p>) : (<></>)}
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}
