import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateArea({ onAdd }) {

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const [showError, setShowError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/savetodatabase', note, {
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    })
      .then(res => {
        if (res.data.Status === "Success") {
          setShowError("Pomyślnie dodano do bazy! ");
          onAdd();
          setNote({
            title: "",
            content: ""
          });
          console.log("res.data ", res.data);
        } else {
          alert("Nie dodano");
        }
      })
      .catch(err => console.group(err));
  }

  return (
    <div>
      <form className="create-note" onSubmit={handleSubmit}>

        <input
          name="title"
          onChange={e => {
            setNote({ ...note, title: e.target.value });
            { handleChange };
            setShowError("");
          }}
          value={note.title}
          placeholder="Tytuł notatki..."
          maxLength="22"
        />


        <textarea
          name="content"
          onChange={e => {
            setNote({ ...note, content: e.target.value });
            { handleChange };
            setShowError("");
          }}
          value={note.content}
          placeholder="Wpisz treść notatki..."
          rows="3"
          maxLength="400"
        />
        <button title="Dodaj notatkę" type='submit'><AddIcon /></button>
      </form>
      <div className="d-flex justify-content-center">
        {showError}
      </div>
    </div>
  );
}

export default CreateArea;
