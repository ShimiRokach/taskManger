import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
//import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRegisterMutation, useLoginMutation } from '../../store'
import { setCredentials } from '../../store/slices/authSlice';


const registerSchema = yup.object().shape({
    fullname: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required")
});

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required")
});

const initialValuesRegister = {
    fullname: "",
    email: "",
    password: ""
};

const initialValuesLogin = {
    email: "",
    password: ""
};

const Form = () => {
    const [pageType, setPageType] = useState("login");
    const dispatch = useDispatch();
    //const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";
    const [registerUser] = useRegisterMutation();
    const [loginUser] = useLoginMutation();


    const register = async (values, onSubmitProps) => {
        const res = await registerUser(values).unwrap();
        onSubmitProps.resetForm();
        if (res) {
            setPageType("login");
        }
    };

    const login = async (values, onSubmitProps) => {
        const res = await loginUser(values).unwrap();
        onSubmitProps.resetForm();
        dispatch(setCredentials(res));

    };

    const handleFormSubmit = (values, onSubmitProps) => {
        if (isLogin) login(values, onSubmitProps);
        if (isRegister) register(values, onSubmitProps);
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        width={isNonMobile ? "50%" : "93%"}
                        p="2rem"
                        m="2rem auto"
                        display="grid"
                        gap="30px"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                        }}
                    >
                        {isRegister && (
                            <>
                                <TextField
                                    label="Fullname"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.fullname}
                                    name="fullname"
                                    error={
                                        Boolean(touched.fullname) && Boolean(errors.fullname)
                                    }
                                    helperText={touched.fullname && errors.fullname}
                                    sx={{ gridColumn: "span 4" }}
                                />
                            </>
                        )}

                        <TextField
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 4" }}
                        />
                    </Box>

                    {/* BUTTONS */}
                    <Box>
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                m: "2rem 0",
                                p: "1rem",
                            }}
                        >
                            {isLogin ? "LOGIN" : "REGISTER"}
                        </Button>
                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login");
                                resetForm();
                            }}
                            sx={{
                                textDecoration: "underline",
                                "&:hover": {
                                    cursor: "pointer",
                                },
                            }}
                        >
                            {isLogin
                                ? "Don't have an account? Sign Up here."
                                : "Already have an account? Login here."}
                        </Typography>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default Form;
