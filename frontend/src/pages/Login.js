import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

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
            <h1>Login</h1>
            <form onSubmit={formik.handleSubmit}>
       <label>username</label>
       <input
         id="username"
         name="username"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.username}
       />
       <label>password</label>
       <input
         id="password"
         name="password"
         type="password"
         onChange={formik.handleChange}
         value={formik.values.password}
       />
 
       <button type="submit">Submit</button>
     </form>
        </div>
    );
};

export default Login;