import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Header from "./Header";
import Footer from "./Footer";

export default function Home() {
    const [auth, setAuth] = useState(false);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [dataAll, setData] = useState([]);

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:8081')
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuth(true);
                    setName(res.data.name)
                } else {
                    setAuth(false);
                    setMessage(res.data.Message);

                }

            })
    }, []);

    const handleLogout = () => {
        axios.get('http://localhost:8081/logout')
            .then(res => {
                if (res.data.Status === "Success") {
                    location.reload(true);
                } else {
                    alert("error");
                }
            }).catch(err => console.log(err))
    }

    const [notes, setNotes] = useState([]);

    const fetchData = () => {
        axios.get('http://localhost:8081/getAllNotes')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    function addNote(newNote) {
        setNotes(prevNotes => {
            return [...prevNotes, newNote];
        });
    }

    function deleteNote(id) {
        setNotes(prevNotes => {
            return prevNotes.filter((noteItem, index) => {
                return index !== id;
            });
        });
    }

    // useEffect(() => {
    //     axios.get('http://localhost:8081/getAllNotes')
    //         .then(response => {
    //             setData(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Błąd przy pobieraniu danych: ', error);
    //         });
    // }, []);
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='mt-4'>
            {
                auth ?
                    <div>
                        <h3>You are Authorized {name}</h3>
                        <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                        <Header />
                        {/* <CreateArea onAdd={addNote} /> */}
                        <CreateArea onAdd={fetchData} />
                        <Note data={dataAll} fetchData={fetchData} />
                        {/* {notes.map((noteItem, index) => {
                            return (
                                <Note
                                    key={index}
                                    id={index}
                                    title={noteItem.title}
                                    content={noteItem.content}
                                    onDelete={deleteNote}
                                />
                            );
                        })} */}
                        <Footer />
                    </div>
                    :
                    <div>
                        <h3>{message}</h3>
                        <h3>Login Now</h3>
                        <Link to="/login" className='btn btn-primary'>Login</Link>
                    </div>
            }

        </div>
    )
}