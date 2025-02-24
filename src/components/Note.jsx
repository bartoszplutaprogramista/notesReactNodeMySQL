import React, { useState, useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@mui/icons-material/Edit';
import CreateArea from "./CreateArea";
import axios from 'axios';
import { Buffer } from 'buffer';



function Note({ data, fetchData }) {

  const [value, setData] = useState();
  const [editNote, setEditNote] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  function handleClick() {
    // event.preventDefault();
    // console.log("props.id wynosi usunięty:", props.id);
    // props.onDelete(props.id);

  }
  const handleEdit = (note) => {
    setEditNote(note);
    setEditTitle(note.titleOfNote);
    setEditContent(note.noteOfNote);
  };

  // const [note, setNote] = useState({
  //   title: "sdsdsd",
  //   content: "sddssd"
  // });

  // const [idNote, setIdNote] = useState();

  // // setNote({ ...note, title: { props.title } });
  // // setNote({ ...note, content: { props.content } });

  // setIdNote(props.id);


  // useEffect(() => {
  //   axios.get('http://localhost:8081/getAllNotes')
  //     .then(response => {
  //       setData(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Błąd przy pobieraniu danych: ', error);
  //     });
  // }, []);
  const handleSave = (id) => {
    axios.post('http://localhost:8081/editnote', {
      id,
      title: editTitle,
      content: editContent
    })
      .then(res => {
        if (res.data.Status === "Success") {
          fetchData();
          setEditNote(null);
          console.log("Zaktualizowano!");
        } else {
          alert("Nie zaktualizowano");
        }
      })
      .catch(err => console.group(err));
  };

  // const [showInfo, setShowInfo] = useState("");

  const contentLength = Buffer.byteLength(JSON.stringify({ fetchData }));

  const handleDelete = (id) => {
    // e.preventDefault();
    axios.post('http://localhost:8081/deletenote', { id })
      // axios.post('http://localhost:8081/savetodatabase', values)
      .then(res => {
        if (res.data.Status === "Success") {
          // console.log("user_id wynsoi po dodaniu do bazy:" )
          // alert("Pomyślnie dodano notatkę do bazy danych");
          // setShowInfo("Pomyślnie usunięto z bazy! ");
          fetchData();
          console.log("USUNIĘTO!");
          // handleClick();
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
  };

  // function send(){
  // onClick={handleClick}
  // }

  // const { dataProps } = props;

  // Wyświetlanie danych w konsoli
  console.log('Data received via props:', { data });
  console.log('Data length: ', data.length);

  return (
    <div>
      {data.length > 0 ? (
        data.map((item, index) => (
          <div className="note" key={index}>
            {editNote && editNote.idOfNote === item.idOfNote ? (
              <div>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <button onClick={() => handleSave(item.idOfNote)}>Save</button>
              </div>
            ) : (
              <div>
                <h1>{item.titleOfNote}</h1>
                <p>{item.noteOfNote}</p>
                <p name="idOfNote">{item.idOfNote}</p>
                <button onClick={() => handleDelete(item.idOfNote)}>
                  <DeleteIcon />
                </button>
                <button onClick={() => handleEdit(item)}>
                  <EditIcon />
                </button>

              </div>
            )}
          </div>
        ))
      ) : (
        <p>Nie ma żadnych notatek</p>
      )}
    </div>
  );
}




//       <form onSubmit={handleSubmit}>
//         {/* <input value="props.title"></input> */}
//         <h1>{props.title}</h1>
//         {/* <input value="props.content"></input> */}
//         <p>{props.content}</p>
//         {/* <input value="props.title"></input>
//         <input value="props.content"></input> */}

//         {/* <button type='submit' onClick={handleClick}> */}
//         <button type="submit" >

//           <DeleteIcon />
//         </button>
//       </form>
//       <div className="d-flex justify-content-center">
//         {/* {showInfo} */}
//       </div>
//     </div >
//   );
// }

export default Note;
