import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Usercontext } from "../UserContext";

function Login() {
    const { setUserInfo } = useContext(Usercontext);
    const [redirect, setRedirect] = useState(false);

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            .required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://localhost:3000/api/login', values, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                });
                if (response.status === 200) {
                    const userInfo = response.data;
                    setUserInfo(userInfo);
                    setRedirect(true);
                } else {
                    alert('Wrong credentials');
                }
            } catch (error) {
                alert('Login failed. Please check your credentials.');
            }
        },
    });

    if (redirect) {
        return <Navigate to="/" />;
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
                <div className="error-msg">{formik.errors.email}</div>
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
            <button type="submit">Log in</button>
        </form>
    );
}

export default Login;
