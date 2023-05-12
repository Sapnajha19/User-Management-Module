import React, { useState, useEffect } from 'react'
import { useNavigate, Link, Routes, Route, useParams } from 'react-router-dom'
import UserEdit from './UserEdit'
export default function Home() {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [editIndex, setEditIndex] = useState(null)

    useEffect(() => {
        fetch("https://openuserapi.onrender.com/admin/users")
            .then(res => res.json())
            .then(data => setData(data.list))
    }, [])
    // console.log(data)

    const handleAddUser = (newUser) => {
        setData([...data, newUser])
    }

    const handleUpdateUser = (updatedUser) => {
        const newData = [...data];
        console.log(newData)
        const index = newData.findIndex(user => user.id === updatedUser.id);
        newData[index] = updatedUser;
        setData(newData);
        setEditIndex(null);
    }

    const handleDropdownChange = (event, index) => {
        console.log("change")
        const action = event.target.value;
        console.log(action)
        if (action === 'Edit') {
            console.log("what")
            console.log(index)
            // const id = data[index].id; // Look up the user's ID based on the index
            // console.log(id)
            navigate(`/edit/${data[index].id}, { state: { id: index } }`);
            setEditIndex(index);
            // navigate(`/edit/${id}`, { state: { id } });
            // setEditIndex(id)
            // HandleEditClick(id);
        }
    }

    const HandleEditClick = (id) => {
        console.log("edit")
        navigate(`/edit/${id}`, { state: { id } });
        setEditIndex(id)
    }

    return (
        <React.Fragment>
            <div style={{ background: "#000000", height: "50px", width: "100%", color: "#ffffff", textAlign: "center", fontSize: "24px" }}>User Management Module</div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Link to="/add"><button style={{ position: "absolute", right: "100px" }} >Add</button></Link>
                <table style={{ border: "1px solid black", padding: "20px" }}>
                    <thead style={{ background: "blue", color: "white" }}>
                        <tr>
                            <th style={{ border: "1px solid black" }}>Table-No</th>
                            <th style={{ border: "1px solid black" }}>Name</th>
                            <th style={{ border: "1px solid black" }}>Email</th>
                            <th style={{ border: "1px solid black" }}>Phone</th>
                            <th style={{ border: "1px solid black" }}>Added-on</th>
                            <th style={{ border: "1px solid black" }}>Status</th>
                            <th style={{ border: "1px solid black" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ?
                            (data.map((user, index) => (
                                <tr key={index}>
                                    <td style={{ border: "1px solid black" }}>{index + 1}</td>
                                    <td style={{ border: "1px solid black" }}>{editIndex === index ? <input type="text" value={user.name} /> : user.name}</td>
                                    <td style={{ border: "1px solid black" }}>{editIndex === index ? <input type="text" value={user.email} /> : user.email}</td>
                                    <td style={{ border: "1px solid black" }}>{editIndex === index ? <input type="text" value={user.phone} /> : user.phone}</td>
                                    <td style={{ border: "1px solid black" }}>{user.createdAt}</td>
                                    <td style={{ border: "1px solid black" }}>{user.status ? "Active" : "NOn-Active"}</td>
                                    <td style={{ border: "1px solid black" }}><select onChange={(e) => handleDropdownChange(e, index)}>
                                        <option >Select an action</option>
                                        <option onClick={() => HandleEditClick(index)}>Edit</option>
                                        <option>Delete</option>
                                    </select></td>
                                </tr>
                            )
                            )
                            ) :
                            (<tr>
                                <td>Loading...</td>
                            </tr>)}
                    </tbody>
                </table>
            </div>

            <Routes>
                <Route path="/edit/:index" render={({ match }) => (
                    <UserEdit
                        user={data[match.params.index]}
                        // user={data.find(user => user.id === match.params.id)}
                        handleUpdateUser={handleUpdateUser}
                        id={match.params.index}
                    />
                )} />
            </Routes>
        </React.Fragment>

    )
}
