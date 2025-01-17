import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

export default function Registration() {
    const [values, setValues] = useState({
        email: "",
        passwords: ""
    });

    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/registration', values)
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate('/');
                } else {
                    alert(res.data.Massage)
                }
            })
            .catch(err => console.group(err));
    }

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-50'>
                <h2>Sign-In</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Imię</strong></label>
                        <input type="email" placeholder="Wpisz Imię" name='name' autoComplete='off' onChange={e => setValues({ ...values, name: e.target.value })} className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder="Wpisz Email" name='email' autoComplete='off' onChange={e => setValues({ ...values, email: e.target.value })} className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>

                        <label htmlFor="password"><strong>Hasło</strong></label>
                        <div className='d-flex align-items-center justify-content-end'>
                            <input placeholder="EWpisz Hasło" name='password' type={visible ? "text" : "password"} onChange={e => setValues({ ...values, password: e.target.value })} className='form-control rounded-0' />
                            <div className="position-absolute me-3" onClick={() => setVisible(!visible)}>
                                {
                                    visible ? <EyeOutlined style={{ fontSize: '120%' }} /> : <EyeInvisibleOutlined style={{ fontSize: '120%' }} />
                                }
                            </div>
                        </div>
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>Zarejestruj się</button>
                </form>
            </div>


        </div>
    )
}