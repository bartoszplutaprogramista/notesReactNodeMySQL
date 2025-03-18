import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router";

export default function Registration() {
    const [values, setValues] = useState({
        email: "",
        passwords: ""
    });

    // const [showWarning, setShowWarning] = useState("");
    const [warnings, setWarnings] = useState([]);
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const validatePassword = (password) => {
        const warningsArray = [];
        if (password.length < 6) {
            warningsArray.push("Hasło musi zawierać przynajmniej 6 znaków.");
        }
        if (!/[a-zA-Z]/.test(password)) {
            warningsArray.push("Hasło musi zawierać co najmniej jedną literę.");
        }
        if (!/[0-9]/.test(password)) {
            warningsArray.push("Hasło musi zawierać co najmniej jedną cyfrę.");
        }
        setWarnings(warningsArray);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        if (name === "password") {
            validatePassword(value);
        }
    };

    // if ({ showWarning }) {
    //     showWarningIfSet();
    // };

    // function showWarningIfSet() {
    //     const regex = /[a-z]/;
    //     const str = values.passwords;
    //     // const matches = str.match(regex);
    //     // const matches2 = str.match(regex);
    //     // if (str.length < 6) setShowWarning("Hasło musi zawierać przynajmniej 6 znaków");
    //     if (str.length < 6) console.log("Hasło musi zawierać przynajmniej 6 znaków");
    //     // if (matches === null) setShowWarning("Hasło musi zawierać conajmniej jedną literę");
    //     // if (matches === null) console.log("Hasło musi zawierać conajmniej jedną literę");
    //     // if (matches2 === null) setShowWarning("Hasło musi zawierać conajmniej jedną cyfrę");
    //     // if (matches2 === null) console.log("Hasło musi zawierać conajmniej jedną cyfrę");
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/registration', values)
            .then(res => {
                if (res.data.Status === "Success") {
                    alert("Zarejestrowano pomyślnie! Mozesz się teraz zalogować.")
                    navigate('/login');

                } else {
                    alert(res.data.Massage)
                }
            })
            .catch(err => console.group(err));
    }

    return (
        <div className='d-flex justify-content-center align-items-center login-page vh-100'>
            <div className='bg-white p-3 rounded w-50'>
                <h2>Rejestracja</h2>
                <form onSubmit={handleSubmit}>
                    {/* <form> */}
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Imię</strong></label>
                        <input type="text" placeholder="Wpisz Imię" name='name' autoComplete='off' onChange={e => setValues({ ...values, name: e.target.value })} className='form-control rounded-0' required />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder="Wpisz Email" name='email' autoComplete='off' onChange={handleChange} className='form-control rounded-0' required />
                    </div>
                    <div className='mb-3'>

                        <label htmlFor="password"><strong>Hasło</strong></label>
                        <div className='d-flex align-items-center justify-content-end'>
                            <input placeholder="Wpisz Hasło" name='password' type={visible ? "text" : "password"} onChange={handleChange} className='form-control rounded-0' required />
                            <div className="position-absolute me-3" onClick={() => setVisible(!visible)}>
                                {
                                    visible ? <EyeOutlined style={{ fontSize: '120%' }} /> : <EyeInvisibleOutlined style={{ fontSize: '120%' }} />
                                }
                            </div>
                        </div>
                        <div>
                            {warnings.length > 0 && (
                                <div className="text-danger mt-1">
                                    {warnings.map((warning, index) => (
                                        <div key={index}>{warning}</div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <button type='submit' className='btn btn-danger w-100 rounded-0'>Zarejestruj się</button>
                </form>
                <div className="mt-2">
                    <b>Masz już konto? <Link className={"link-styles"} to="/login">Zaloguj się</Link></b>
                </div>
            </div>


        </div>
    )
}