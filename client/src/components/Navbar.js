import React, { useState, useEffect, useContext } from "react";
import Context from "../context/ContextApi";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useIsAuthenticated, useSignOut } from "react-auth-kit";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const { getUserInfo } = useContext(Context);
  const signOut = useSignOut();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [avatar, setAvatar] = useState("");
  const [balance, setBalance] = useState(0);
  const [user, setUser] = useState({});
  useEffect(() => {
    if (isAuthenticated()) {
      getUserInfo(setUser, setAvatar, setBalance);
    }
  }, []);
  return (
    <div className="navbar-container">
      <div className="appbar-container">
        <div className="appbar">
          <AppBar position="static">
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <img className="crypto-logo" src="/images/logo.png" alt="" />
                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: "rgb(214, 255, 68)",
                    textDecoration: "none",
                  }}
                >
                  Crypto
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>

                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        <a href="/">ANASAYFA</a>
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        <a href="/coins">BORSA</a>
                      </Typography>
                    </MenuItem>
                    <MenuItem>
                      <div className="market">
                        <label htmlFor="touch">
                          <span>MARKET</span>
                        </label>
                        <input type="checkbox" id="touch" />
                        <ul className="slide">
                          <li>
                            <a href="/markets">Piyasalar</a>
                          </li>
                          <li>
                            <a href="/crypto-volume">Kripto Piyasa Hacimleri</a>
                          </li>
                          <li>
                            <a href="/share-volume">Hisse Piyasa Hacimleri</a>
                          </li>
                          <li>
                            <a href="/crypto-technical-analysis">
                              Kripto Teknik Analiz
                            </a>
                          </li>
                        </ul>
                      </div>
                    </MenuItem>

                    <MenuItem>
                      <div className="finance">
                        <label htmlFor="touch2">
                          <span>FİNANS</span>
                        </label>
                        <input type="checkbox" id="touch2" />
                        <ul className="slide">
                          <li>
                            <a href="/cross-ratios">Çapraz Oranlar</a>
                          </li>
                          <li>
                            <a href="/heat-map">Sıcaklık Haritası</a>
                          </li>
                        </ul>
                      </div>
                    </MenuItem>
                  </Menu>
                </Box>

                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href=""
                  sx={{
                    mr: 2,
                    display: { xs: "flex", md: "none" },
                    flexGrow: 1,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: "rgb(214, 255, 68)",
                    textDecoration: "none",
                  }}
                >
                  Crpyto
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    <a href="/">Anasayfa</a>
                  </Button>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    <a href="/coins">Borsa</a>
                  </Button>

                  <Button className="sec-center">
                    <input
                      className="dropdown"
                      type="checkbox"
                      id="dropdown"
                      name="dropdown"
                    />
                    <label className="for-dropdown" htmlFor="dropdown">
                      MARKET
                      <ArrowDropDownIcon />
                    </label>
                    <div className="section-dropdown">
                      <a href="/markets">PİYASALAR</a>
                      <a href="/crypto-volume">KRİPTO PİYASA HACİMLERİ</a>
                      <a href="/share-volume">HİSSE PİYASA HACİMLERİ</a>
                      <a href="/crypto-technical-analysis">
                        KRİPTO TEKNİK ANALİZ
                      </a>
                    </div>
                  </Button>
                  <Button className="sec-center">
                    <input
                      className="dropdown"
                      type="checkbox"
                      id="dropdown2"
                      name="dropdown2"
                    />
                    <label className="for-dropdown" htmlFor="dropdown2">
                      FİNANS
                      <ArrowDropDownIcon />
                    </label>
                    <div className="section-dropdown">
                      <a href="/cross-ratios">ÇAPRAZ ORANLAR</a>
                      <a href="/heat-map">SICAKLIK HARİTASI</a>
                    </div>
                  </Button>
                </Box>

                {isAuthenticated() ? (
                  <div className="navbar-balance-container">
                    <span>Bakiye</span>
                    <span id="price">{balance.toFixed(0)}TL</span>
                  </div>
                ) : (
                  <></>
                )}

                <Box sx={{ flexGrow: 0 }}>
                  {isAuthenticated() ? (
                    <>
                      <Tooltip title="Kullanıcı İşlemleri">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <span className="avatar"> {avatar} </span>
                        </IconButton>
                      </Tooltip>
                      <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                      >
                        <MenuItem
                          id="profile-options"
                          onClick={handleCloseUserMenu}
                        >
                          <Typography textAlign="center">
                            <a href="/profile/info">Profil</a>
                          </Typography>
                        </MenuItem>
                        <MenuItem
                          id="profile-options"
                          onClick={handleCloseUserMenu}
                        >
                          <Typography textAlign="center">
                            <a href="/profile/balances">Portföy</a>
                          </Typography>
                        </MenuItem>
                        <MenuItem
                          id="profile-options"
                          onClick={handleCloseUserMenu}
                        >
                          <Typography textAlign="center">
                            <a href="/profile/past-process">Geçmiş İşlemler</a>
                          </Typography>
                        </MenuItem>
                        <MenuItem
                          id="profile-options"
                          onClick={handleCloseUserMenu}
                        >
                          <Typography textAlign="center">
                            <a href="/profile/withdraw-money">Para Çek</a>
                          </Typography>
                        </MenuItem>
                        <MenuItem
                          id="profile-options"
                          onClick={handleCloseUserMenu}
                        >
                          <Typography textAlign="center">
                            <a href="/profile/deposit-money">Para Yatır</a>
                          </Typography>
                        </MenuItem>
                        <MenuItem
                          id="profile-options"
                          onClick={handleCloseUserMenu}
                        >
                          <Typography textAlign="center">
                            <a href="/profile/request-withdraw">
                              Çekim Taleplerim
                            </a>
                          </Typography>
                        </MenuItem>
                        <MenuItem
                          id="profile-options"
                          onClick={handleCloseUserMenu}
                        >
                          <Typography textAlign="center">
                            <a href="/profile/request-deposit">
                              Yatırım Taleplerim
                            </a>
                          </Typography>
                        </MenuItem>
                        <MenuItem
                          id="profile-options"
                          onClick={handleCloseUserMenu}
                        >
                          <Typography
                            onClick={() => {
                              signOut();
                            }}
                            textAlign="center"
                          >
                            <a href="/login">Çıkış Yap</a>
                          </Typography>
                        </MenuItem>
                      </Menu>
                    </>
                  ) : (
                    <>
                      <Tooltip title="GirişYap & Üye Ol">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <Avatar src="/images/emptyprofil.png" />
                        </IconButton>
                      </Tooltip>
                      <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                      >
                        <MenuItem
                          id="profile-options"
                          onClick={handleCloseUserMenu}
                        >
                          <Typography textAlign="center">
                            <a href="/login">Giriş Yap</a>
                          </Typography>
                        </MenuItem>
                        <MenuItem
                          id="profile-options"
                          onClick={handleCloseUserMenu}
                        >
                          <Typography textAlign="center">
                            <a href="register">Üye Ol</a>
                          </Typography>
                        </MenuItem>
                      </Menu>
                    </>
                  )}
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
