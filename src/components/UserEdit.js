import React from 'react';
import { useState, useEffect } from 'react';
const UserEdit = ({ user, handleUpdateUser, index }) => {
  
  const [updatedUser, setUpdatedUser] = useState(user);
  console.log(user)
  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`https://openuserapi.onrender.com/admin/update-user/${index}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        handleUpdateUser(data);
      })
      .catch((err) => console.error(err));
  }

  return (
    <React.Fragment>
      <h1>Edit User</h1>
      {user &&
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={user.name} onChange={handleInputChange} />
        <input type="text" name="email" value={user.email} onChange={handleInputChange} />
        <input type="text" name="phone" value={user.phone} onChange={handleInputChange} />
        <button type="submit">Save</button>
      </form>}
    </React.Fragment>
  );
}


export default UserEdit;