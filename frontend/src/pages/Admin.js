import React, { useState, useEffect} from 'react';
import Nav from '../components/Nav'
import { Link } from 'react-router-dom';

const Admin = () => {
    const [users , setUsers ] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/admin`, {
            credentials: 'include'
        })
         .then(response => response.json())
         .then(data => setUsers(data))
    },[])
    console.log(users);
    return (
        <div>
            <h1>admin</h1>
            <Nav/>
            <div>

            {users.map( user => 
            <div key={user.username} className="card border-primary mb-3" style={{maxwidth: "18rem"}}>
                <Link to={`/user/${user.id}`} ><div><img className='img-fluid' src={user.profilepicture} alt= " profile"/></div></Link>
                <div className="card-header"> username : {user.username}</div>
                <div className="card-body text-primary">
                    <h5 className="card-title">e-mail : {user.email}</h5>
                    <p className="card-text">age : {user.age}</p>
                </div>
            </div>
            )}
            </div>
        </div>
    );
};


export default Admin;