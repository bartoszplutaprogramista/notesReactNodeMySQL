import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateArea from "./CreateArea";

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  const [showInfo, setShowInfo] = useState("");

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>

    </div>
  );
}

export default Note;
