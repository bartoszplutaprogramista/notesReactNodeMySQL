import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// function CreateArea(props) {
function CreateArea({ onAdd }) {
  // const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
    // date: new Date().toLocaleDateString("pl-PL")
  });

  const [showError, setShowError] = useState("");
  const navigate = useNavigate();

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
    // props.onAdd(note);
    // setNote({
    //   title: "",
    //   content: ""
    // });
    // event.preventDefault();
    // window.location.reload(false);


    // useEffect(() => {
    //   axios.get('http://localhost:8081/getAllNotes')
    //     .then(response => {
    //       setData(response.data);
    //     })
    //     .catch(error => {
    //       console.error('Błąd przy pobieraniu danych: ', error);
    //     });
    // }, []);
    // props.onAdd(note);

    // event.preventDefault();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/savetodatabase', note, {
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    })
      // axios.post('http://localhost:8081/savetodatabase', values)
      .then(res => {
        if (res.data.Status === "Success") {
          // console.log("user_id wynsoi po dodaniu do bazy:" )
          // alert("Pomyślnie dodano notatkę do bazy danych");

          setShowError("Pomyślnie dodano do bazy! ");
          onAdd();
          setNote({
            title: "",
            content: ""
          });
          console.log("res.data ", res.data);
          // setData(res.data);
          // navigate("/");
          // window.location.reload();


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
          // onChange={handleChange}
          onChange={e => {
            setNote({ ...note, title: e.target.value });
            { handleChange };
            setShowError("");
          }}
          // onChange={change()}
          value={note.title}
          placeholder="Tytuł notatki..."
          maxLength="22"
        />


        <textarea
          name="content"
          // onChange={handleChange}
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

        {/* <button onClick={submitNote} type='submit'><AddIcon /></button> */}
        <button title="Dodaj notatkę" type='submit'><AddIcon /></button>
      </form>
      <div className="d-flex justify-content-center">
        {showError}
      </div>
    </div>
  );
}

export default CreateArea;
