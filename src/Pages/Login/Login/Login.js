import { Box, Button, Container, CssBaseline, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import useFirebase from '../../../hooks/useFirebase';
import login_img from '../../../Images/login_img.jpg'
const Login = () => {
    const [role, setRole] = React.useState('');
    const [loginData, setLoginData] = React.useState({ email: "", password: "" })
    const { loginUser } = useFirebase()

    //handle from submit
    const handleFormSubmit = (e) => {
        const addData = { ...loginData };
        addData.role = role;
        setLoginData(addData)
        loginUser(loginData.email, loginData.password)
        e.preventDefault();
    }

    //Handle OnBlur
    const handleOnBlur = e => {
        const name = e.target.name;
        const value = e.target.value;
        const newValue = { ...loginData, [name]: value };
        setLoginData(newValue);

    }

    //handle role
    const handleChange = (event) => {
        setRole(event.target.value);
    };
    return (
        <React.Fragment>
            <CssBaseline />
            <Container fixed>
                <Box sx={{ bgcolor: '#cfe8fc', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', boxShadow: 3 }}>
                    <Box sx={{ textAlign: 'center', my: 4, typography: 'body1', fontWeight: 'bold', fontSize: 'h6.fontSize' }}>{"Please SignIn"}</Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <img src={login_img} style={{ width: "90%" }} alt="login_ing" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box
                                component="form"
                                autoComplete="off"
                                onSubmit={handleFormSubmit}
                            >
                                <TextField
                                    required
                                    margin="normal"
                                    sx={{ width: '75%' }}
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    variant="standard"
                                    onBlur={handleOnBlur}
                                />
                                <TextField
                                    required
                                    margin="normal"
                                    sx={{ width: '75%' }}
                                    type="password"
                                    id="password"
                                    label="Password"
                                    name="password"
                                    autoComplete="passowrd"
                                    variant="standard"
                                    onBlur={handleOnBlur}
                                />
                                <div>
                                    <FormControl variant="standard" sx={{ m: 2, width: '75%' }}>
                                        <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
                                        <Select
                                            required
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={role}
                                            onChange={handleChange}
                                            label="Role"
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="Rider">Rider</MenuItem>
                                            <MenuItem value="Learner">Learner</MenuItem>
                                            <MenuItem value="Admin">Admin</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <Button
                                    type="submit"
                                    sx={{ width: '75%', mt: 3, mb: 2 }}
                                    variant="contained"
                                    style={{ backgroundColor: "rgb(231, 76, 60 )", color: 'white' }}
                                >
                                    Sign In
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                    <Link to="/register" variant="body2">
                        <Box sx={{ textAlign: 'center', mt: 2 }}>{"Don't have an account? Sign Up"}</Box>
                    </Link>
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default Login;