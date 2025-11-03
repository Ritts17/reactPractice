import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    Container,
    Typography,
    TextField,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    FormHelperText,
    Box,
    Modal,
    Grid
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
    const {
        register,
        reset,
        watch,
        formState: { errors },
        handleSubmit
    } = useForm();

    const [isSuccess, setIsSuccess] = useState(false);
    const password = watch('password');

    const validatePassword = (value) => {
        return value === password || 'Passwords do not match';
    };

    const onSubmit = (data) => {
        console.log(data);
        toast.success('Successfully submitted!');
        reset();
        setIsSuccess(true);
    };

    return (
        <>
            <ToastContainer />
            <Container maxWidth="lg">
                <Grid container spacing={2} sx={{ minHeight: '100vh' }}>
                    {/* Left Half - Image */}
                    <Grid item xs={12} md={6}>
                        <img src=''/>
                    </Grid>

                    {/* Right Half - Form */}
                    <Grid item xs={12} md={6} display="flex" alignItems="center">
                        <Box width="100%">
                            <Typography variant="h4" gutterBottom>Readify Market</Typography>
                            <Typography variant="h6" gutterBottom>Signup</Typography>

                            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                <Box mb={2}>
                                    <TextField
                                        fullWidth
                                        label="User Name"
                                        {...register('userName', { required: 'User Name is required' })}
                                        error={!!errors.userName}
                                        helperText={errors.userName?.message}
                                    />
                                </Box>

                                <Box mb={2}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                                message: 'Please enter a valid email'
                                            }
                                        })}
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                    />
                                </Box>

                                <Box mb={2}>
                                    <TextField
                                        label="Mobile Number"
                                        {...register('mobileNumber', {
                                            required: 'Mobile number is required',
                                            pattern: {
                                                value: /^[0-9]{10}$/,
                                                message: "Mobile number must be 10 digits"
                                            }
                                        })}
                                    />
                                </Box>

                                <Box mb={2}>
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        type="password"
                                        {...register('password', {
                                            required: 'Password is required',
                                            minLength: {
                                                value: 6,
                                                message: 'Password must be at least 6 characters'
                                            }
                                        })}
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                    />
                                </Box>

                                <Box mb={2}>
                                    <TextField
                                        fullWidth
                                        label="Confirm Password"
                                        type="password"
                                        {...register('confirmPassword', {
                                            required: 'Confirm Password is required',
                                            validate: validatePassword
                                        })}
                                        error={!!errors.confirmPassword}
                                        helperText={errors.confirmPassword?.message}
                                    />
                                </Box>

                                <Box mb={2}>
                                    <FormControl fullWidth error={!!errors.role}>
                                        <InputLabel>Choose Role</InputLabel>
                                        <Select
                                            defaultValue=""
                                            {...register('role', { required: 'Role is required' })}
                                        >
                                            <MenuItem value="">Select</MenuItem>
                                            <MenuItem value="Admin">Admin</MenuItem>
                                            <MenuItem value="User">User</MenuItem>
                                        </Select>
                                        <FormHelperText>{errors.role?.message}</FormHelperText>
                                    </FormControl>
                                </Box>

                                <Button variant="contained" color="primary" type="submit">
                                    Submit
                                </Button>
                            </form>

                            <Box mt={2}>
                                <Typography>
                                    Already have an Account? {<a>./login</a>}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <Modal open={isSuccess} onClose={() => setIsSuccess(false)}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            bgcolor: 'background.paper',
                            p: 4,
                            borderRadius: 2,
                            boxShadow: 24
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            User Registration Successful!
                        </Typography>
                        <a>
                            ./login
                        </a>
                        Login
                    </Box>
                </Modal>
            </Container>
        </>
    );
}

export default Signup;