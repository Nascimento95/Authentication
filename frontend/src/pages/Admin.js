import React, { useState, useEffect} from 'react';

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
            <div>

            {users.map( user => 
            <div>  
                <p> username : {user.username}</p>
                <p> e-mail : {user.email}</p>
                <p> age : {user.age}</p>
            </div>
            )}
            </div>
        </div>
    );
};

export default Admin;