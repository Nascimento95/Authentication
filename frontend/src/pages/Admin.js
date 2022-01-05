import React, { useState, useEffect} from 'react';
import Nav from '../components/Nav'
const Admin = () => {
    const [users , setUsers ] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/admin`, {
            credentials: 'include'
        })
         .then(response => response.json())
         .then(data => setUsers(data))
    },[])
    
    return (
        <div>
            <h1>admin</h1>
            <Nav/>
            <div>

            {users.map( user => 
            <div class="card border-primary mb-3" style={{maxwidth: "18rem"}}>
                <div class="card-header"> username : {user.username}</div>
                <div class="card-body text-primary">
                    <h5 class="card-title">e-mail : {user.email}</h5>
                    <p class="card-text">age : {user.age}</p>
                </div>
            </div>
            )}
            </div>
        </div>
    );
};
{/* <div>  
                <p> username : {user.username}</p>
                <p> e-mail : {user.email}</p>
                <p> age : {user.age}</p>
            </div> */}

export default Admin;