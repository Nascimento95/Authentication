import React from 'react';
import { useFormik } from 'formik';
import { useNavigate} from 'react-router-dom';
import Nav from '../components/Nav'

const Login = () => {

    const navigate = useNavigate()  

    const formik = useFormik({
        initialValues : {
            username : "",
            password : ""
        },
        onSubmit: values => {
            console.log(JSON.stringify(values))
            fetch("http://localhost:5000/auth/login",{
                credentials: 'include',
                method : "post" ,
                headers: {
                    "Content-type" : "application/json"
                },
                body: JSON.stringify(values)
            })
                .then(response => response.json())
                .then(result => 
                    console.log(result),
                    navigate("/admin")
                )
                .catch(error => console.log('error', error))
        },
    })
    
    return (
        <div>
            <h1 className='text-center'>Login</h1>
            <Nav />
            <div className='container'>
                <div className='row'>
                    <div className='col-6 text-center'>
                        <form onSubmit={formik.handleSubmit}>
                            {/* <label>username</label> */}
                            <input
                                id="username"
                                name="username"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.username}
                                placeholder='username'
                            />
                            {/* <label>password</label> */}
                            <br/>
                            <input
                                className='mt-2'
                                id="password"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                placeholder='password'
                            />
                            <br/>
                            <button className='mt-3' type="submit">Submit</button>
                        </form>
                    </div>
                    <div className='col-6'>
                        <img className='img-fluid' src="https://adrien.cambien.net/wp-content/uploads/2020/03/logo-mon-quotidien-freelance-saison-3-n%C2%B027-1200x675.jpg" alt = "image de dev" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;