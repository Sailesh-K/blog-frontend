import React, {useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { Navigate } from "react-router-dom";
import { Usercontext } from "../UserContext";

function Register(){
    const { setUserInfo } = useContext(Usercontext);
    const [redirect, setRedirect] = useState(false);

    const validationSchema = Yup.object({
        username: Yup.string()
            .min(3, "Username must be at least 3 characters")
            .required("Username is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://localhost:3000/api/register', values, {
                    headers: { 'Content-Type': 'application/json' }
                });
                if (response.status === 200) {
                    const userInfo = response.data;
                    setUserInfo(userInfo);
                    alert("User Registered Successfully!!");
                    setRedirect(true);
                }
            } catch (error) {
                if (error.response && error.response.status !== 200) {
                    alert("Registration Failed!");
                } else {
                    console.log(error);
                }
            }
        },
    });

    if (redirect) {
        return <Navigate to="/" />;
    }

    return(
        <form onSubmit={formik.handleSubmit}>
            <h1>Register</h1>
            <input
                type="text"
                placeholder="Username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username ? (
                <div>{formik.errors.username}</div>
            ) : null}
            <input
                type="text"
                placeholder="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
            ) : null}
            <input
                type="password"
                placeholder="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
            ) : null}
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default Register;
