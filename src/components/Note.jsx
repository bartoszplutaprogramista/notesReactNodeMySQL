import React, { useState, useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateArea from "./CreateArea";
import axios from 'axios';



function Note({ data, fetchData }) {

  const [value, setData] = useState();

  function handleClick() {
    // event.preventDefault();
    // console.log("props.id wynosi usunięty:", props.id);
    // props.onDelete(props.id);

  }

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

  // const [showInfo, setShowInfo] = useState("");

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
    // <div>
    //   {props.length > 0 ? (
    //     props.data.map((item) => (
    //       <div className="note" key={index}>
    //         <h1>{item.titleOfNote}</h1>
    //         <p>{item.noteOfNote}</p>
    //       </div>
    //     ))
    //   ) : (
    //     <p></p>
    //   )}
    // </div>

    <div>
      {data.length > 0 ? (
        data.map((item, index) => (

          <div className="note" key={index}>
            {/* <form onSubmit={(e) => { */}
            {/* // e.preventDefault(); */}
            {/* handleDelete(item.idOfNote);
            }}> */}
            <h1>{item.titleOfNote}</h1>
            <p>{item.noteOfNote}</p>
            {/* <button onClick={() => handleDelete(item.id)}> */}
            <p name="idOfNote">{item.idOfNote}</p>
            {/* <input type="text" name="idOfNote" onChange={e => setData({ ...value: item.idOfNote })} /> */}
            {/* <button type="submit">
                <DeleteIcon />
              </button> */}
            <button onClick={() => handleDelete(item.idOfNote)}>
              <DeleteIcon />
            </button>
            {/* </form> */}
          </div>

        ))
      ) : (
        <p>Nie ma żadnych notatek</p>
      )
      }
    </div >



    // <form onSubmit={handleSubmit}>

    //   {/* <input value="props.title"></input> */}
    //   <h1>{props[0].titleOfNote}</h1>
    //   {/* <input value="props.content"></input> */}
    //   <p>{props[0].noteOfNote}</p>
    //   {/* <input value="props.title"></input>
    //     <input value="props.content"></input> */}

    //   {/* <button type='submit' onClick={handleClick}> */}
    //   <button type="submit" >

    //     <DeleteIcon />
    //   </button>
    // </form>

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
