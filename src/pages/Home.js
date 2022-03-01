import React, { useEffect, useState } from 'react'
import "./components/asset.css"
import { Link } from 'react-router-dom'
const Home = () => {

    const URL = "http://localhost:7000"
    const [users, setUsers] = useState([])
    useEffect(async () => {

        const users = await fetch(`${URL}/user`)
        const response = await users.json()

        console.log({ response })
        setUsers(response)
    }, [])
    return (
        <>
            <h1>TANGL</h1>
            {users.length > 0 && <table style={{ width: "80%", border: "1px solid black", padding: "20px", "margin": "40px auto" }}>
                <tr style={{ border: "1px solid red", padding: "10px" }}>
                    <th>Name</th>
                    <th>Logo</th>
                    <th>Description</th>
                    <th>IBC</th>
                </tr>
                <tbody>
                    {users.map((user, index) => {
                        console.log(user)
                        return (
                            <tr style={{ borderBottom: "1px solid red", padding: "20px" }} key={index}>
                                <td>{user.dataValue.find(val => val.name === "assetName").value}</td>
                                <td>{user.dataValue.find(val => val.name === "assetLogo").value}</td>
                                <td>{user.dataValue.find(val => val.name === "assetDescription").value}</td>
                                <td>{user.dataValue.find(val => val.name === "IBC").value}</td>
                                {/* <td>{user.dataValue.assetLogo}</td>
                                <td>{user.dataValue.assetDescription}</td>
                                <td>{user.dataValue.IBC}</td> */}
                            </tr>
                        )
                    })}
                </tbody>
            </table>}
            <div style={{ margin: "50px 0", display: "flex", justifyContent: "center" }}>
                <button className="new_asset"><Link to="/asset" style={{ color: "white" }}>new user</Link></button>
            </div>
        </>

    )
}

export default Home