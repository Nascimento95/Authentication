import React from 'react'
import { useFormik, } from 'formik'
import { useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import * as Yup from 'yup';
import { useState } from 'react/cjs/react.development';


const Signup = () => {

    const [view , setView] = useState(true)
    // const [file , setFile] = useState([])
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
            profilePicture : "",
            age :"",
        },
        onSubmit: async values => {
            console.log(JSON.stringify(values))
            const signup = await fetch("http://localhost:5000/auth/signup",{
                credentials: 'include',
                method : "post" ,
                headers: {
                    "Content-type" : "application/json"
                },
                body: JSON.stringify(values)
            })
            const data = await signup.json()
            const formdata = new FormData()
            formdata.append("file", values.profilePicture, values.profilePicture.name)
            const pushFile = await fetch(`http://localhost:5000/file/${data.id}`, {
                method: "post",
                body: formdata
            })
            const response = await pushFile.json()
            console.log(response)
            const login = await fetch("http://localhost:5000/auth/login",{
                credentials: 'include',
                method : "post" ,
                headers: {
                    "Content-type" : "application/json"
                },
                body: JSON.stringify({
                    username : data.username,
                    password : data.password
                })
            })
            const responseLogin = await login.json()
            navigate("/admin")
            console.log(responseLogin);
            // fetch("http://localhost:5000/auth/signup",{
            //     credentials: 'include',
            //     method : "post" ,
            //     headers: {
            //         "Content-type" : "application/json"
            //     },
            //     body: JSON.stringify(values)
            // })
            //     .then(response => response.json())
            //     .then(result =>{
            //         console.log(result)
                    
            //         // result.profilePicture.split('').splice(12,28).join("")
            //         // console.log(result,"mes result du fetch");
            //         // on a besoin de c'est deux ligne de code pour envoyer un fichier
            //         // 1 argument la route defini dans le back le 2 l'object avec la clef 
            //         // et la 3 
            //         const formdata = new FormData()
            //         formdata.append("file", values.profilePicture, values.profilePicture.name)

            //         fetch(`http://localhost:5000/file/${result.id}`, {
            //         method: "post",
            //         body: formdata
            //         })
            //         .then(response => response.json())
            //         .then(data => {
            //             console.log(data)
            //             fetch("http://localhost:5000/auth/login",{
            //             credentials: 'include',
            //             method : "post" ,
            //             headers: {
            //                 "Content-type" : "application/json"
            //             },
            //             body: JSON.stringify({
            //                 username : result.username,
            //                 password : result.password
            //             })
            //         })
            //         .then(response => response.json())
            //         .then(result => console.log(result))
            //         })
            //     })     
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
    
    const handleFieldChange = (e) => {
        // console.log(e.target.files[0]);
        formik.setFieldValue('profilePicture',e.target.files[0])
    }

    // console.log(formik)
    const viewPassword = () => {
        if (view === true){
            setView(false)
        } else {
            setView(true)
        }
    }
    // console.log("value=>",formik.values)
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
                                style={{backgroundImage:`url(https://img.icons8.com/material-rounded/24/000000/ophthalmology.png)`,backgroundRepeat:"no-repeat",backgroundPosition:"right", }}
                                onClick={viewPassword}
                                className="mt-2"
                                id="password"
                                name="password"
                                type={view === true ? "password" : "text"}
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                placeholder='Password'
                            />
                            <br/>
                            {/* <label>password Confirmation</label> */}
                            <input
                                // style={{backgroundImage:`url(https://img.icons8.com/material-rounded/24/000000/ophthalmology.png)`,backgroundRepeat:"no-repeat",backgroundPosition:"right", }}
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
                                className="mt-2"
                                id="profilePicture"
                                name="profilePicture"
                                type="file"
                                onChange={handleFieldChange}
                                // value={formik.values.profilePicture}
                                
                            />
                                
                            <br/>
                            <input
                                className="mt-3 mx-2 "
                                id="promise"
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