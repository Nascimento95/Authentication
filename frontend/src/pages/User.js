import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../components/Nav'

const User = () => {
    const [user, setUser] = useState([])
    const {id} = useParams()
    
    useEffect(() => {
        fetchUserSelected()
    },[])
    
    const fetchUserSelected = async () => {
        const response = await fetch(`http://localhost:5000/user/${id}`)
        const data = await response.json()
        setUser(data)
    }
    // console.log(user);

    const formik = useFormik({
        initialValues :  {
            profilePicture : ""
        },
        onSubmit : async values => {
            console.log(JSON.stringify(values))
            // const data = await user.json()
            const formdata = new FormData()
            formdata.append("file", values.profilePicture, values.profilePicture.name)
            const pushFile = await fetch(`http://localhost:5000/file/${id}`, {
                method: "post",
                body: formdata,
                
            })
            const response = await pushFile.json()
            console.log(response)
        } 
    })
    // function qui recupère l'objet de la photo grace a e.target.files[0]
    //  et la stock dans les value de formik
    const handleFieldChange = (e) => {
        // console.log(e.target.files[0]);
        formik.setFieldValue('profilePicture',e.target.files[0])
    }
    console.log("valu stock",formik.values.profilePicture.name);
    return (
        <div className='container'>
            <Nav />
            <div className='row'>
                <div className="card col mt-5" style={{width: "18rem"}}>
                    <img src={`${user.profilepicture}`} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <p className="card-text"> name : {user.username} </p>
                            <p className="card-text"> age : {user.age} </p>
                        </div>
                    </div>
            </div>
            <div className='row'>
                <form onSubmit={formik.handleSubmit}>
                <input
                    className="mt-2"
                    id="profilePicture"
                    name="profilePicture"
                    type="file"
                    onChange={handleFieldChange}
                />
                <button className='mt-3 btn btn-secondary' type ="submit">submit</button>
                </form>
            </div>
        </div>
    );
};

export default User;