import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import axios from 'axios';

function CreateArea(props) {
  // const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: ""
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

  function submitNote(event) {
    props.onAdd(note);

    // event.preventDefault();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/savetodatabase', note)
      // axios.post('http://localhost:8081/savetodatabase', values)
      .then(res => {
        if (res.data.Status === "Success") {
          // console.log("user_id wynsoi po dodaniu do bazy:" )
          // alert("Pomyślnie dodano notatkę do bazy danych");
          setShowError("Pomyślnie dodano do bazy! ");
          setNote({
            title: "",
            content: ""
          });
          // navigate('/');

        } else {
          alert("Nie dodano");
          // alert("Nie dodano", res.data.Massage)
        }
      })
      .catch(err => console.group(err));
  }
  // function expand() {
  //   setExpanded(true);
  // }

  // function change() {
  //   { handleChange };
  //   { e => setValues({ ...note, title: e.target.value }) };
  // }

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
          // onChange={change()}
          value={note.title}
          placeholder="Title"
        />


        <textarea
          name="content"

          onChange={e => {
            setNote({ ...note, content: e.target.value });
            { handleChange };
            setShowError("");
          }}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />

        {/* <button onClick={submitNote} type='submit'><AddIcon /></button> */}
        <button type='submit' onClick={submitNote}><AddIcon /></button>
      </form>
      <div className="d-flex justify-content-center">
        {showError}
      </div>
    </div>
  );
}

export default CreateArea;
