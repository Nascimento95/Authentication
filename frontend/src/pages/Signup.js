import React from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import * as Yup from 'yup';
import { useState } from 'react/cjs/react.development';


const Signup = () => {

    const [view , setView] = useState(true)
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
            age :"",
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
        validateOnChange: false,
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
    const viewPassword = () => {
        console.log("sa marche");
        // if(view === true) {
        //     return "password"
        // } else {
        //     return "text"
        // }
    }
    return (
        <div>
        <h1 className='text-center'>Create Account</h1>
        <Nav />
        <div className='container'>
            <div className='row mt-5'>
                <div className='col-6 text-center'>
                    <img className='mx-2' src="https://img.icons8.com/ios/50/000000/facebook-circled--v1.png"/>
                    <img className='mx-2' src="https://img.icons8.com/ios/50/000000/twitter-circled--v1.png"/>
                    <img className='mx-2' src="https://img.icons8.com/ios/50/000000/linkedin-circled.png"/>
                    <img className='mx-2' src="https://img.icons8.com/ios/50/000000/github.png"/>
                    
                    <p className='mt-2'>or use your email for registration</p>
                    <form onSubmit={formik.handleSubmit}>
                        {/* <label>username</label><br/> */}
                            <input
                                className="mt-2"
                                id="username"
                                name="username"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.username}
                                placeholder='Username'
                            />
                            <br/>
                        {/* <label>email</label> */}
                            <input
                                className="mt-2"
                                id="email"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                placeholder='E-mail'
                            />
                            <br/>
                        {/* <label>password</label> */}
                            <input
                                className="mt-2"
                                id="password"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                placeholder='Password'
                            />
                            <br/>
                            {/* <label>password Confirmation</label> */}
                            <input
                                onClick={viewPassword}
                                style={{backgroundImage:`url(https://img.icons8.com/material-rounded/24/000000/ophthalmology.png)`,backgroundRepeat:"no-repeat",backgroundPosition:"right", }}
                                className="mt-2"
                                id="passwordConfirmation"
                                name="passwordConfirmation"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.passwordConfirmation}
                                placeholder='Password Confirmation'
                            />
                            <br/>
                            {formik.errors.passwordConfirmation && <p>{formik.errors.passwordConfirmation}</p>}
                            <input
                                className="mt-2"
                                id="age"
                                name="age"
                                type="number"
                                onChange={formik.handleChange}
                                value={formik.values.age}
                                placeholder='Age'
                                />
                                
                            <br/>
                            <input
                                className="mt-3 mx-2 "
                                id="age"
                                name="age"
                                type="checkbox"
                                onChange={formik.handleChange}
                                value={formik.values.age}
                                placeholder='Age'
                            />
                                <label> I agree to the <span className="fw-bold">Terms</span> and <span className="fw-bold">Privacy Policy.</span></label>
                        
                            <br/>
                            <button className='mt-3 btn btn-secondary' type="submit">Submit</button>
                    </form>
                </div>
                <div className='col-6'>
                    <img className='img-fluid' src="https://cdn.shopify.com/s/files/1/0530/8379/9717/products/One-Piece-Skull-Couleur-Bleu-Gris-Marque-Checkpoint-6_300x.jpg?v=1640091367" />
                </div>
            </div>
        </div>
    </div>
    );
};

export default Signup;