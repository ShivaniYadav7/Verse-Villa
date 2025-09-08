import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { alpha, styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

const colors = {
  eggshell: '#f4f1deff', // light background
  burntSienna: '#e07a5fff',
  delftBlue: '#3d405bff', // dark for text/icons
  cambridgeBlue: '#81b29aff',
  sunset: '#f2cc8fff',
};

// Styled components with responsive tweaks
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(colors.cambridgeBlue, 0.25),
  '&:hover': {
    backgroundColor: alpha(colors.cambridgeBlue, 0.35),
  },
  width: '100%',
  maxWidth: '540px',
  height: 44,
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    maxWidth: '380px',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
    height: 40,
  },
}));

const SearchIconWrapper = styled('div')(() => ({
  position: 'absolute',
  left: 14,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  pointerEvents: 'none',
  color: colors.delftBlue,
  fontSize: 26,
}));

const StyledInputBase = styled(InputBase)(() => ({
  color: colors.delftBlue,
  width: '100%',
  paddingLeft: `calc(1em + 42px)`,
  fontSize: '1.3rem',
  fontFamily: '"Roboto", "Lato", sans-serif',
  height: '36px',
}));

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: colors.eggshell,
        boxShadow: 'none',
        height: { xs: 70, sm: 90 },
        py: { xs: 1, sm: 0 },
      }}
    >
      <Container maxWidth="xl" sx={{ height: '100%' }}>
        <Toolbar
          disableGutters
          sx={{
            px: { xs: 1, sm: 3, md: 6 },
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Left - Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', flex: { xs: '0 1 auto', md: '0 0 180px' } }}>
            <IconButton
              aria-label="home"
              onClick={() => navigate('/')}
              size="large"
              sx={{ color: colors.delftBlue, mr: 1, fontSize: 38 }}
            >
              <MenuBookIcon fontSize="inherit" />
            </IconButton>
            <Typography
  component={NavLink}
  to="/"
  sx={{
    color: '#780000',     
    textDecoration: 'none',
    fontWeight: 900,
    fontFamily: '"Roboto", "Lato", sans-serif',
    fontSize: { xs: '1.9rem', sm: '2.4rem' },
    userSelect: 'none',
    whiteSpace: 'nowrap',
  }}
>
  Reader's Club
</Typography>

          </Box>

          {/* Center - Search */}
          <Box sx={{ flexGrow: 1, display: { xs: mobileOpen ? 'none' : 'flex' }, justifyContent: 'center', mx: 2 }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
            </Search>
          </Box>

          {/* Right - Buttons or Hamburger */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexBasis: { xs: 'auto', md: '300px' }, justifyContent: 'flex-end' }}>
            {/* Hamburger menu for mobile */}
            <IconButton
              aria-label="menu toggle"
              onClick={toggleMobileMenu}
              sx={{
                display: { xs: 'flex', md: 'none' },
                color: colors.delftBlue,
                fontSize: 30,
                mr: 1,
              }}
            >
              <MenuIcon fontSize="inherit" />
            </IconButton>

            {/* Desktop buttons */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: '1.8rem',
                flexWrap: 'nowrap',
              }}
            >
              {!user ? (
                <>
                  <Button
                    component={NavLink}
                    to="/signin"
                    variant="outlined"
                    sx={{
                      borderColor: colors.delftBlue,
                      color: colors.delftBlue,
                      fontWeight: 700,
                      fontSize: '1.4rem',
                      fontFamily: '"Roboto", "Lato", sans-serif',
                      textTransform: 'none',
                      px: 3.5,
                      py: 1.1,
                      '&:hover': { borderColor: colors.burntSienna, color: colors.burntSienna },
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    component={NavLink}
                    to="/signup"
                    variant="outlined"
                    sx={{
                      borderColor: colors.delftBlue,
                      color: colors.delftBlue,
                      fontWeight: 700,
                      fontSize: '1.4rem',
                      fontFamily: '"Roboto", "Lato", sans-serif',
                      textTransform: 'none',
                      px: 3.5,
                      py: 1.1,
                      '&:hover': { borderColor: colors.burntSienna, color: colors.burntSienna },
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    component={NavLink}
                    to="/profile"
                    startIcon={<AccountCircleIcon sx={{ fontSize: 30, color: colors.delftBlue }} />}
                    sx={{
                      color: colors.delftBlue,
                      fontWeight: 700,
                      fontSize: '1.45rem',
                      fontFamily: '"Roboto", "Lato", sans-serif',
                      textTransform: 'none',
                      px: 3,
                      py: 1,
                    }}
                  >
                    {user.name || 'Profile'}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={logout}
                    sx={{
                      backgroundColor: colors.delftBlue,
                      color: colors.eggshell,
                      fontWeight: 700,
                      fontSize: '1.3rem',
                      fontFamily: '"Roboto", "Lato", sans-serif',
                      textTransform: 'none',
                      px: 3.5,
                      py: 1.3,
                      '&:hover': { backgroundColor: colors.burntSienna },
                    }}
                  >
                    Logout
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Toolbar>

        {/* Mobile collapse menu */}
        {mobileOpen && (
          <Box
            sx={{
              backgroundColor: colors.eggshell,
              px: 2,
              py: 2,
              display: { xs: 'flex', md: 'none' },
              flexDirection: 'column',
              gap: 2,
              borderTop: `1px solid ${colors.delftBlue}`,
            }}
          >
            <Search sx={{ maxWidth: '100%', height: 40 }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'mobile search' }} />
            </Search>
            {!user ? (
              <>
                <Button
                  component={NavLink}
                  to="/signin"
                  variant="outlined"
                  fullWidth
                  onClick={() => setMobileOpen(false)}
                  sx={{
                    borderColor: colors.delftBlue,
                    color: colors.delftBlue,
                    fontWeight: 700,
                    fontSize: '1.3rem',
                    textTransform: 'none',
                    '&:hover': { borderColor: colors.burntSienna, color: colors.burntSienna },
                  }}
                >
                  Sign In
                </Button>
                <Button
                  component={NavLink}
                  to="/signup"
                  variant="outlined"
                  fullWidth
                  onClick={() => setMobileOpen(false)}
                  sx={{
                    borderColor: colors.delftBlue,
                    color: colors.delftBlue,
                    fontWeight: 700,
                    fontSize: '1.3rem',
                    textTransform: 'none',
                    '&:hover': { borderColor: colors.burntSienna, color: colors.burntSienna },
                  }}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={NavLink}
                  to="/profile"
                  startIcon={<AccountCircleIcon sx={{ fontSize: 28, color: colors.delftBlue }} />}
                  fullWidth
                  onClick={() => setMobileOpen(false)}
                  sx={{
                    color: colors.delftBlue,
                    fontWeight: 700,
                    fontSize: '1.3rem',
                    textTransform: 'none',
                  }}
                >
                  {user.name || 'Profile'}
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  sx={{
                    backgroundColor: colors.delftBlue,
                    color: colors.eggshell,
                    fontWeight: 700,
                    fontSize: '1.3rem',
                    textTransform: 'none',
                    '&:hover': { backgroundColor: colors.burntSienna },
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </Box>
        )}
      </Container>
    </AppBar>
  );
};

export default Navigation;
