import React, { useState, useEffect } from 'react'

export default function Home() {
    const [data, setData] = useState([])
    const [editIndex, setEditIndex] = useState(null)

    useEffect(() => {
        fetch("https://openuserapi.onrender.com/admin/users")
            .then(res => res.json())
            .then(data => setData(data.list))
    }, [])
    console.log(data)
    const handleEditClick = (index) => {
        setEditIndex(index)
      }
    // console.log(data.name)
    return (
        <div>
            <div style={{ background: "#000000", height: "50px", width: "100%", color: "#ffffff", textAlign: "center", fontSize: "24px" }}>User Management Module</div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Table-No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Added-on</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ?
                            (data.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{editIndex === index ? <input type="text" value={user.name} /> : user.name}</td>
                                    <td>{editIndex === index ? <input type="text" value={user.email} /> : user.email}</td>
                                    <td>{editIndex === index ? <input type="text" value={user.phone} /> : user.phone}</td>
                                    <td>{user.createdAt}</td>
                                    <td>{user.status ? "Active" : "NOn-Active"}</td>
                                    <td><select>
                                        <option>Select an action</option>
                                        <option onClick={() => handleEditClick(index)}>Edit</option>
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
        </div>
    )
}
