import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateArea from "./CreateArea";
import axios from 'axios';



function Note(props) {
  function handleClick() {
    // event.preventDefault();
    props.onDelete(props.id);

  }

  // const [note, setNote] = useState({
  //   title: "sdsdsd",
  //   content: "sddssd"
  // });

  // const [idNote, setIdNote] = useState();

  // // setNote({ ...note, title: { props.title } });
  // // setNote({ ...note, content: { props.content } });

  // setIdNote(props.id);
  console.log("props.id wynosi:", props.id);



  // const [showInfo, setShowInfo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/deletenote')
      // axios.post('http://localhost:8081/savetodatabase', values)
      .then(res => {
        if (res.data.Status === "Success") {
          // console.log("user_id wynsoi po dodaniu do bazy:" )
          // alert("Pomyślnie dodano notatkę do bazy danych");
          // setShowInfo("Pomyślnie usunięto z bazy! ");

          console.log("USUNIĘTO!");
          handleClick();
          // setNote({
          //   title: "",
          //   content: ""
          // });
          // navigate('/');

        } else {
          alert("Nie usunięto");
          // alert("Nie dodano", res.data.Massage)
        }
      })
      .catch(err => console.group(err));
  }

  // function send(){
  // onClick={handleClick}
  // }

  return (
    <div className="note">
      <form onSubmit={handleSubmit}>
        {/* <input value="props.title"></input> */}
        <h1>{props.title}</h1>
        {/* <input value="props.content"></input> */}
        <p>{props.content}</p>
        {/* <input value="props.title"></input>
        <input value="props.content"></input> */}

        {/* <button type='submit' onClick={handleClick}> */}
        <button type="submit" >

          <DeleteIcon />
        </button>
      </form>
      <div className="d-flex justify-content-center">
        {/* {showInfo} */}
      </div>
    </div >
  );
}

export default Note;
