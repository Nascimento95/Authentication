import React from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup';

const Signup = () => {

    const navigate = useNavigate()  

    const SignupSchema = Yup.object().shape({
        password : Yup.string()
        .min(8, 'trop court')
        .required('obligatoire'),
        passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords are not the same!')
        .required('Password confirmation is required!'),
    })

    const formik = useFormik({
        initialValues : {
            username : "",
            email : "",
            password : "",
            passwordConfirmation : "",
            age :0,
        },
        onSubmit: values => {
            console.log(JSON.stringify(values))
            fetch("http://localhost:5000/auth/signup",{
                credentials: 'include',
                method : "post" ,
                headers: {
                    "Content-type" : "application/json"
                },
                body: JSON.stringify(values)
            })
                .then(response => response.json())
                .then(result =>{
                    console.log(result)
                    
                    fetch("http://localhost:5000/auth/login",{
                        credentials: 'include',
                        method : "post" ,
                        headers: {
                            "Content-type" : "application/json"
                        },
                        body: JSON.stringify({
                            username : result.username,
                            password : result.password
                        })
                    })
                    .then(response => response.json())
                    .then(result => 
                        console.log(result),
                        navigate("/admin")
                    )
                })
                
                
        },
        validationSchema: Yup.object().shape({
            password : Yup.string()
            .min(8, 'trop court')
            .required('obligatoire'),
            passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords are not the same!')
            .required('Password confirmation is required!'),
        })
    })
    console.log(formik.errors)
    return (
        <div>
        <h1>signup</h1>
        <form onSubmit={formik.handleSubmit}>
            <label>username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />
            <label>email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
            <label>password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                <label>password Confirmation</label>
                <input
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.passwordConfirmation}
                />
                {formik.errors.passwordConfirmation && <p>{formik.errors.passwordConfirmation}</p>}
                <label>age</label>
                <input
                    id="age"
                    name="age"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.age}
                />

            <button type="submit">Submit</button>
            </form>
    </div>
    );
};

export default Signup;