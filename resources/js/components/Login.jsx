import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required')
        .min(4, 'Email must be at least 4 characters')
        .max(225, 'Email must not exceed 225 characters'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters'),
});

const InputField = ({ label, id, ...props }) => {
    const [field, meta] = useField(props);
    const hasError = meta.touched && meta.error;

    return (
        <div className="space-y-2">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                id={id}
                {...field}
                {...props}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring ${
                    hasError ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-500'
                }`}
                aria-invalid={!!hasError}
            />
            {hasError && (
                <p id={`${id}-error`} className="text-sm text-red-500">
                    {meta.error}
                </p>
            )}
        </div>
    );
};

const Login = () => {
    const [authSuccess, setAuthSuccess] = React.useState(false);
    const [userData, setUserData] = React.useState(null);

    const handleSubmit = async (values, { setSubmitting, setStatus, setErrors }) => {
        try {
            const response = await axios.post('http://localhost/api/login', values, { withCredentials: true });
            setAuthSuccess(true);
            setUserData(response.data.data.user);
        } catch (error) {
            if (error.response?.status === 422) {
                const { message, errors } = error.response.data;
                setErrors(errors || {});
                setStatus(message || 'An error occurred. Please try again.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (authSuccess) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="p-8 bg-white rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-4 text-green-600">
                        Authentication was successful!
                    </h1>
                    <p className="text-lg mb-2">
                        <strong>Name:</strong> {userData.name}
                    </p>
                    <p className="text-lg">
                        <strong>Email:</strong> {userData.email}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={LoginSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, status }) => (
                        <Form className="space-y-4">
                            <InputField
                                id="email"
                                name="email"
                                type="email"
                                label="Email"
                                placeholder="Enter your email"
                            />
                            <InputField
                                id="password"
                                name="password"
                                type="password"
                                label="Password"
                                placeholder="Enter your password"
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Logging in...' : 'Login'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;
