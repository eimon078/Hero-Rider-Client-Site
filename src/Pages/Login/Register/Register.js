import { Box, Button, Container, CssBaseline, Grid, Input, TextField, InputLabel, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useFirebase from '../../../hooks/useFirebase';

const Register = () => {
    const { registerUser } = useFirebase();
    const [registerData, setRegisterData] = React.useState({})
    const [vahicleType, setVahicleType] = React.useState('bike');
    const [role, setRole] = React.useState('learner');
    let navigate = useNavigate();

    const [profilePic, setProfilePic] = useState(null);
    const [licencePic, setLicencePic] = useState(null);
    const [nidPic, setNidPic] = useState(null);

    const handleChangeProfile = (event) => {
        setProfilePic(event.target.files[0]);
        console.log(profilePic);
    }
    const handleChangeLicence = (event) => {
        setLicencePic(event.target.files[0]);
        console.log(licencePic);
    }
    const handleChangeNid = (event) => {
        setNidPic(event.target.files[0]);
        console.log(nidPic);
    }

    const handleChangeVahicle = (event) => {
        setVahicleType(event.target.value);
        console.log(vahicleType);
    };

    const handleChangeRole = (event) => {
        setRole(event.target.value);
        console.log(role);
    };

    //handle from submit
    const handleFormSubmit = (event) => {
        const addData = { ...registerData }
        addData.role = role;
        addData.vahicleType = vahicleType;
        console.log("hello");
        setRegisterData(addData);
        console.log(registerData);

        const formData = new FormData();
        // formData.append('userData', registerData)
        for (const key in registerData) {

            formData.append(`${key}`, registerData[key]);
            console.log(registerData[key])
        }
        formData.append('profilePic', profilePic)
        formData.append('licencePic', licencePic)
        formData.append('nidPic', nidPic)

        // post data 
        fetch('https://stormy-stream-30371.herokuapp.com/user', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                registerUser(registerData.email, registerData.password, registerData.name)
                // navigate(`/${registerData.name}`);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        event.preventDefault();
    }

    //Handle OnBlur
    const handleOnBlur = e => {
        const name = e.target.name;
        const value = e.target.value;
        const newValue = { ...registerData, [name]: value };
        setRegisterData(newValue);
        console.log(newValue);

    }


    return (
        <React.Fragment>
            <CssBaseline />
            <Container fixed>
                <Box sx={{ bgcolor: '#cfe8fc', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', boxShadow: 3 }}>
                    <Box sx={{ textAlign: 'center', mt: 2, typography: 'body1', fontWeight: 'bold', fontSize: 'h6.fontSize' }}>{"Please SignUp"}</Box>

                    <Box
                        component="form"
                        autoComplete="off"
                        onSubmit={handleFormSubmit}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                {/* left start  */}
                                <TextField
                                    required
                                    margin="normal"
                                    sx={{ width: '75%' }}
                                    id="name"
                                    label="Full Name"
                                    name="name"
                                    autoComplete="name"
                                    variant="standard"
                                    onBlur={handleOnBlur}
                                />
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
                                    label="Age"
                                    name="age"
                                    variant="standard"
                                    inputProps={{ inputMode: 'numeric', pattern: '[2-5]*' }}
                                    onBlur={handleOnBlur}
                                />
                                <TextField
                                    required
                                    margin="normal"
                                    sx={{ width: '75%' }}
                                    id="address"
                                    label="Address"
                                    name="address"
                                    autoComplete="email"
                                    variant="standard"
                                    onBlur={handleOnBlur}
                                />
                                <TextField
                                    required
                                    margin="normal"
                                    sx={{ width: '75%' }}
                                    label="Phone"
                                    name="Phone"
                                    variant="standard"
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    onBlur={handleOnBlur}
                                />

                                <Box sx={{ mx: "auto", width: '75%', display: 'block', textAlign: 'left' }}>
                                    <FormControl component="fieldset" style={{ marginTop: "12px" }}>
                                        <FormLabel component="legend" sx={{ textAlign: 'left' }}>Vehicle Type</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-label="gender"
                                            name="controlled-radio-buttons-group"
                                            value={vahicleType}
                                            onChange={handleChangeVahicle}
                                        >
                                            <FormControlLabel value="car" control={<Radio />} label="Car" />
                                            <FormControlLabel value="bike" control={<Radio />} label="Bike" />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>

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
                                <TextField
                                    required
                                    margin="normal"
                                    sx={{ width: '75%' }}
                                    type="password"
                                    id="confirm-password"
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    autoComplete="confirm-password"
                                    variant="standard"
                                    onBlur={handleOnBlur}
                                />


                            </Grid>
                            <Grid item xs={12} md={6}>

                                <Box style={{ marginTop: "12px" }}>
                                    <InputLabel variant="standard" sx={{ mx: "auto", width: '75%', display: 'block', textAlign: 'left' }}>Profile Pic</InputLabel>
                                    <Input
                                        required
                                        accept="image/*"
                                        variant="standard"
                                        sx={{ width: '75%' }}
                                        type="file"
                                        onChange={handleChangeProfile}
                                    />
                                </Box>
                                <Box style={{ marginTop: "12px" }}>
                                    <InputLabel variant="standard" sx={{ mx: "auto", width: '75%', display: 'block', textAlign: 'left' }} >Nid Pic</InputLabel>
                                    <Input
                                        required
                                        accept="image/*"
                                        variant="standard"
                                        sx={{ width: '75%' }}
                                        type="file"
                                        onChange={handleChangeNid}
                                    />

                                </Box>


                                {/* Role  */}
                                <Box sx={{ mx: "auto", width: '75%', display: 'block', textAlign: 'left' }}>
                                    <FormControl component="fieldset" style={{ marginTop: "12px" }}>
                                        <FormLabel component="legend" sx={{ textAlign: 'left' }}>Select Role</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-label="gender"
                                            name="controlled-radio-buttons-group"
                                            value={role}
                                            onChange={handleChangeRole}
                                        >
                                            <FormControlLabel value="learner" control={<Radio />} label="Learner" />
                                            <FormControlLabel value="rider" control={<Radio />} label="Rider" />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                                {
                                    role === "rider" &&
                                    <Box>
                                        <Box style={{ marginTop: "12px" }}>
                                            <InputLabel variant="standard" sx={{ mx: "auto", width: '75%', display: 'block', textAlign: 'left' }} >Liences Pic</InputLabel>
                                            <Input
                                                required
                                                accept="image/*"
                                                variant="standard"
                                                sx={{ width: '75%' }}
                                                type="file"
                                                onChange={handleChangeLicence}
                                            />

                                        </Box>
                                        <TextField
                                            required
                                            margin="normal"
                                            sx={{ width: '75%' }}
                                            id="area"
                                            label="Area"
                                            name="area"
                                            autoComplete="area"
                                            variant="standard"
                                            onBlur={handleOnBlur}
                                        />
                                        <TextField
                                            required
                                            margin="normal"
                                            sx={{ width: '75%' }}
                                            id="car-name"
                                            label="Car Name"
                                            name="carName"
                                            autoComplete="car-name"
                                            variant="standard"
                                            onBlur={handleOnBlur}
                                        />
                                        <TextField
                                            required
                                            margin="normal"
                                            sx={{ width: '75%' }}
                                            id="model"
                                            label="Car Model"
                                            name="carModel"
                                            autoComplete="model"
                                            variant="standard"
                                            onBlur={handleOnBlur}
                                        />
                                        <TextField
                                            required
                                            margin="normal"
                                            sx={{ width: '75%' }}
                                            id="plate"
                                            label="Name Plate"
                                            name="namePlate"
                                            autoComplete="plate"
                                            variant="standard"
                                            onBlur={handleOnBlur}
                                        />
                                    </Box>
                                }

                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            sx={{ width: '50%', mt: 3, mb: 2 }}
                            variant="contained"
                            style={{ backgroundColor: "rgb(231, 76, 60 )", color: 'white' }}
                        >
                            SignUp
                        </Button>
                    </Box>

                    <Link to="/" variant="body2">
                        <Box sx={{ textAlign: 'center', my: 2 }}>{"Already have an account? Sign In"}</Box>
                    </Link>
                </Box>
            </Container>
        </React.Fragment >
    );
};

export default Register;