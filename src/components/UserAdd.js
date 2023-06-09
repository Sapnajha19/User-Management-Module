import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const UserAdd = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add the user object to your data array
    // const id=data[data.length-1]+1;
    const data = { name: user.name, email: user.email, phone: Number(user.phone), password:"your password"};
    // fetch('https://openuserapi.onrender.com/admin/create-user', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((res) => res.json())
    //   .then(() => {
    //     navigate('/');
    //   })
    //   .catch((err) => console.error(err));
    try {
      const res = await fetch('https://openuserapi.onrender.com/admin/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // location.reload()
      // console.log(res)
      // console.log(res.status)
      
      // console.log(res.status)

      if (res.status === 200 || res.status===201) {
        console.log('API request was successful');
        navigate('/');
      } else {
        const error = await res.json();
        console.log(error);
        console.log('Error creating user:', res.status);
      }
    } catch (err) {
      console.error('Error creating user:', err);
    }
  };


  return (
    <React.Fragment>
      <div style={{ background: "#000000", width: "100vw", height: "50px", color: "#ffffff", textAlign: "center" }}>Add new row</div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={user.name} onChange={handleInputChange} />
        <input type="text" name="email" value={user.email} onChange={handleInputChange} />
        <input type="text" name="phone" value={user.phone} onChange={handleInputChange} />
        <button type="submit">Add User</button>
      </form>
    </React.Fragment>
  );
}

export default UserAdd;
