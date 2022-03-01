import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import "../components/asset.css"
import { compose } from "redux";
import { connect, useDispatch } from "react-redux";
import { storeUserInfoOnDataBase } from '../../actions/action';
import { useHistory } from 'react-router-dom';
const ShareClass = (props) => {
    const dispatch = useDispatch()
    const dummyClass = [
        {
            shareClass: "A",
            ISINCode: "XIEOIE9393XX",
            initialDate: "20/03/03",
            link: "#"
        },
        {
            shareClass: "B",
            ISINCode: "XIEOIE9393XX",
            initialDate: "20/03/03",
            link: "#"
        },
        {
            shareClass: "C",
            ISINCode: "XIEOIE9393XX",
            initialDate: "20/03/03",
            link: "#"
        }
    ]
    const history = useHistory();
    useEffect(() => {
        console.log(props.investorInput)
        if (props.investorInput.message) {
            alert("successfully created a new user")
            history.push("/home")
        }
    }, [props])
    const createUser = () => {
        const userData = props.investorInput
        console.log({ userData })
        let data = dispatch(storeUserInfoOnDataBase(userData))
        console.log({ data })
        history.push("/")
    }
    return (
        <div>
            <h2>Share Class</h2>
            <table style={{ width: "100%", border: "1px solid black", padding: "20px" }}>
                <tr style={{ border: "1px solid red", padding: "10px" }}>
                    <th>Share class</th>
                    <th>ISIN code</th>
                    <th>initial subscription cut off date</th>
                    <th>Action</th>
                </tr>
                <tbody>
                    {dummyClass.map((data, index) => {
                        return (
                            <tr style={{ borderBottom: "1px solid red", padding: "20px" }} key={index}>
                                <td>Class {data.shareClass}</td>
                                <td>{data.ISINCode}</td>
                                <td>{data.initialDate}</td>
                                <td><Link to={data.link}>View</Link></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div style={{ padding: "40px 0" }}>
                <button className="new_asset">new Share Class</button>
                <div style={{ display: "flex", justifyContent: "right" }}>
                    <button className="new_class" onClick={createUser}>create data</button>
                </div>
            </div>
        </div>

    )
}

const mapStateToProps = (state) => ({
    investorInput: state.inputReducer,
})
export default compose(
    connect(
        mapStateToProps,
        { storeUserInfoOnDataBase }
    )
)(ShareClass);