import React, { useState, useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { Buffer } from 'buffer';
import SaveIcon from '@mui/icons-material/Save';



function Note({ data, fetchData }) {

  const [editNote, setEditNote] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const handleEdit = (note) => {
    setEditNote(note);
    setEditTitle(note.titleOfNote);
    setEditContent(note.noteOfNote);
  };
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
        } else {
          alert("Nie zaktualizowano");
        }
      })
      .catch(err => console.group(err));
  };

  const contentLength = Buffer.byteLength(JSON.stringify({ fetchData }));

  const handleDelete = (id) => {
    axios.post('http://localhost:8081/deletenote', { id })
      .then(res => {
        if (res.data.Status === "Success") {
          fetchData();
        } else {
          alert("Nie usunięto");
        }
      })
      .catch(err => console.group(err));
  };

  return (
    <div className="outer-container">
      <div className="general-note-my">
        {data.length > 0 ? (
          data.map((item) => (
            <div key={item.idOfNote}>
              <div className="note">
                {editNote && editNote.idOfNote === item.idOfNote ? (
                  <div className="note-properties">
                    <input
                      className="edit-note p-note-bold"
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      maxLength="22"
                    />
                    <textarea
                      className="edit-note p-note h-100"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      maxLength="400"
                    />
                    <div className="buttons-notes">
                      <button className="border" onClick={() => handleSave(item.idOfNote)}><SaveIcon /></button>
                    </div>
                  </div>
                ) : (
                  <div className="note-properties">
                    <p className="p-note-bold">{item.titleOfNote}</p>
                    <div className="scrollable">
                      <p className="p-note">{item.noteOfNote}</p>
                    </div>
                    <div className="buttons-notes">
                      <div >
                        <small className="me-2">
                          {item.editedDateOfNote
                            ? `Edyt.: ${new Date(item.editedDateOfNote).toLocaleDateString('pl-PL')}`
                            : `Dodano: ${new Date(item.dateOfNote).toLocaleDateString('pl-PL')}`}
                        </small>
                      </div>
                      <button className="me-2" title="Edytuj" onClick={() => handleEdit(item)}>
                        <EditIcon />
                      </button>
                      <button title="Usuń" onClick={() => handleDelete(item.idOfNote)}>
                        <DeleteIcon />
                      </button>
                    </div>

                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>Nie ma żadnych notatek</p>
        )}
      </div>
    </div>
  );
}

export default Note;
