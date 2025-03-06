import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router";

export default function Login() {
    const [values, setValues] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/login', values)
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate('/');
                } else {
                    alert("Nie ma nikogo w bazie", res.data.Massage)
                }
            })
            .catch(err => console.group(err));
    }

    return (
        <div className='d-flex justify-content-center align-items-center login-page vh-100'>
            <div className='bg-white p-3 rounded w-50'>
                <h2>Logowanie</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder="Wpisz email" name='email' autoComplete='off' onChange={e => setValues({ ...values, email: e.target.value })} className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Hasło</strong></label>
                        <input type="password" placeholder="Wpisz hasło" name='password' onChange={e => setValues({ ...values, password: e.target.value })} className='form-control rounded-0' />
                    </div>
                    <button type='submit' className='btn btn-danger w-100 rounded-0'>Zaloguj się</button>
                </form>
                <div className="mt-2">
                    <b>Nie masz konta? <Link className={"link-styles"} to="/registration">Zarejestruj się</Link></b>
                </div>
            </div>


        </div>
    )
}