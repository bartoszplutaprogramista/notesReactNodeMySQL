import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  // const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

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
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/savetodatabase', values)
      .then(res => {
        if (res.data.Status === "Success") {
          alert("Pomyślnie dodano notatkę do bazy danych")
          navigate('/');

        } else {
          alert(res.data.Massage)
        }
      })
      .catch(err => console.group(err));
  }
  // function expand() {
  //   setExpanded(true);
  // }

  return (
    <div>
      <form className="create-note" onSubmit={handleSubmit}>

        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />


        <textarea
          name="content"

          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />

        <button onClick={submitNote}><AddIcon /></button>
      </form>
    </div>
  );
}

export default CreateArea;
