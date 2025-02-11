import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { BrowserRouter, Route } from 'react-router-dom';
// import { Route } from 'react-router-dom';
// import Routes from 'react-router-dom';
import { Routes } from 'react-router';
import Home from './Home';
import Login from './Login';
import Registration from './Registration';
import axios from 'axios';
// import CreateArea from './CreateArea';

function App() {
  // const [notes, setNotes] = useState([]);

  // function addNote(newNote) {
  //   setNotes(prevNotes => {
  //     return [...prevNotes, newNote];
  //   });
  // }

  // function deleteNote(id) {
  //   setNotes(prevNotes => {
  //     return prevNotes.filter((noteItem, index) => {
  //       return index !== id;
  //     });
  //   });
  // }

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   axios.get('http://localhost:8081/getAllNotes')
  //     .then(response => {
  //       setData(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Błąd przy pobieraniu danych: ', error);
  //     });
  // }, []);

  // console.log("Zmienna tytuł w App ", data);

  return (
    <div>
      {/* {data.length > 0 ? (
        data.map((item, index) => (
          <div className="note" key={index}>
            <h1>{item.titleOfNote}</h1>
            <p>{item.noteOfNote}</p>
          </div>
        ))
      ) : (
        <p>Ładowanie danych...</p>
      )} */}
      <BrowserRouter>
        <Routes>

          {/* <Route path='/' element={<><Home /><Note data={data} /></>}></Route> */}
          <Route path='/' element={<Home />}></Route>
          {/* <Route path='/' element={<Note data={data} />}></Route>*/}
          <Route path='/login' element={<Login />}></Route>
          <Route path='/registration' element={<Registration />}></Route>
          <Route path='/savetodatabase' element={<CreateArea />}></Route>
        </Routes>
        {/* <Header /> */}
        {/* <CreateArea onAdd={addNote} />
        {notes.map((noteItem, index) => {
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
        {/* <Footer /> */}
      </BrowserRouter>

    </div >
  );
}

export default App;
