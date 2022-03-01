import React, { useState } from 'react'
import { compose } from "redux";
import { connect, useDispatch } from "react-redux";
import Input from '../components/Input';
import { updateInfoAction } from '../../actions/action';
import "../components/asset.css"
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const inputValues = [
    { name: "assetName", label: "Asset name", fullWidth: true, value: "hhhhh" },
    { name: "assetLogo", label: "Asset Logo", value: "" },
    { name: "assetDescription", label: "Asset Description", type: "textarea", fullWidth: true, value: "" },
    { name: "companyName", label: "Company name", fullWidth: true, value: "" },
    { name: "companyAddress", label: "Company Address", fullWidth: true, value: "" },
    { name: "companyNumber", label: "Company Number", fullWidth: true, value: "" },
    { name: "companyCountry", label: "CompanyCountry", fullWidth: true, value: "" },
    { name: "BankName", label: "Bank Name", fullWidth: true, value: "" },
    { name: "IBC", label: "IBC", fullWidth: true, value: "" },
    { name: "BIC/Swift code", label: "BIC/Swift code", fullWidth: true, value: "" }
]
const investors = ["Man Group", "AQR Capital Management", "Brevan Howard", "Bridgewater Associates"]

const Commodity = (props) => {
    const dispatch = useDispatch()
    const History = useHistory();
    const [values, setValues] = useState(inputValues);
    const [checkboxState, setCheckboxState] = useState(
        new Array(investors.length).fill(false)

    );
    const [prospect, setProspect] = useState({})
    const [imageAsFile, setImageAsFile] = useState({})
    useEffect(() => {
        if (props.investorInput.values.length > 0) {
            setValues(props.investorInput.values)
        }
    }, [])

    const submitInfo = () => {
        const checkData = investors.filter((data, index) => checkboxState[index] === true)
        dispatch(updateInfoAction(values, checkData, prospect, imageAsFile))
        History.push("/new/class")
    }


    const setState = _state => {
        const obj = inputValues.filter(value => value.name === Object.keys(_state)[0])[0]
        obj.value = _state[Object.keys(_state)[0]]
        setValues([...values])

    }
    const handleOnChange = (position) => {
        const updatedCheckedState = checkboxState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckboxState(updatedCheckedState);
    }
    const onChange = name => ({ target: { value } }) => {
        setState({ [name]: value })
    }
    const handleFilePDF = e => {
        const file = e.target.files[0];
        setProspect(file)
    };
    const handleImageAsFile = e => {
        const file = e.target.files[0];
        setImageAsFile(file)
    };
    return (
        <div style={{ width: "80%", margin: "0 auto" }}>
            <h3 style={{ borderBottom: "1px solid black", padding: "8px 0" }}>Asset Information</h3>
            <form>
                {inputValues.map((field, index) => {
                    const { fullWidth, name, label, ..._ } = field;
                    field = _;
                    return <div
                        key={index}>
                        <Input
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            value={values[index].name}
                            onChange={onChange}
                            name={name}
                            label={label}
                            {...field}
                        />
                    </div>
                })}
                <div>
                    <label className="my-5">
                        Prospectus{" "}
                        <h6>
                            Upload the Prospectus
                        </h6>
                    </label>
                    <input
                        type="file"
                        name="file" id="file"
                        accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                        className="input"
                        onChange={handleFilePDF}
                    />
                </div>
                <div>
                    <label className="my-5">
                        background Image{" "}
                        <h6>
                            Upload the background Image
                        </h6>
                    </label>
                    <input
                        type="file"
                        name="file" id="file"
                        accept="image/*"
                        className="input"
                        onChange={handleImageAsFile}
                    />
                </div>
                <h3 style={{ margin: "30px 0" }}>Add Investors</h3>
                <p style={{ margin: "30px 0" }}>Select which investor will have access and define fee</p>
                <ul className="investors-list">
                    {investors.map((name, index) => {
                        return (
                            <li key={index} style={{ listStyleType: "none" }}>
                                <div className="investors-list-item">
                                    <div className="left-section">
                                        <input
                                            type="checkbox"
                                            id={`custom-checkbox-${index}`}
                                            name={name}
                                            value={name}
                                            checked={checkboxState[index]}
                                            onChange={() => handleOnChange(index)}
                                        />
                                        <label htmlFor={`custom-checkbox-${index}`} style={{ marginLeft: "10px" }}>{name}</label>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </form>
            <button className="new_asset" onClick={submitInfo}>Submit</button>
            <div>

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
        { updateInfoAction }
    )
)(Commodity);