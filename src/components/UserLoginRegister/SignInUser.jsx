import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { loginUser } from '../../store/action/action';
import { toastify } from '../../utils/alerts';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Naeem Akhter
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInUser() {
  const token = localStorage.getItem('token')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { successLogin, errorLogin } = useSelector(d => d.imtrrReducer);


  const [loginDetail, setLoginDetail] = useState({
    name: '',
    email: '',
    password: ''
  })


  // console.log(token) 
  useEffect(() => {
    if (token) {
      navigate('/dashboard')
    }

  }, [token])

  if (successLogin) {
    toastify('s', successLogin);
    dispatch({ type: "CLEAR_USER_LOGIN" });
    navigate('/dashboard')
  }
  if (errorLogin) {
    toastify('e', errorLogin);
    dispatch({ type: "CLEAR_USER_ERROR_LOGIN" })
  }


  const handleChange = e => {
    const { name, value } = e.target;

    setLoginDetail(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const obj = {
      name: loginDetail.name,
      email: loginDetail.email,
      password: loginDetail.password
    }

    dispatch(loginUser(obj));

  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" style={{
        boxShadow: " 0px 1px 37px -2px rgba(0,0,0,0.75)",
        borderRadius: "10px"
      }}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?sky)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container spacing={15}>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>

              </Grid>
              <Grid item>
                <Link href="/admin" variant="body2">
                  {"Admin"}
                </Link>

              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}