import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import $ from "jquery";
// import bodyParser from "body-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST, GET"],
    credentials: true
}))

let user_id = 0;


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "notes_db"
})


const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({
            Message: "we need token please provide it login now"
        })
    } else {
        jwt.verify(token, "our-jsonwebtoken-secret-key", (err, decoded) => {
            if (err) {
                return res.json({
                    Message: "Authentication Error"
                })
            } else {
                req.name = decoded.name;
                next()
            }
        })
    }

}

app.get('/', verifyUser, (req, res) => {
    return res.json({
        Status: "Success",
        name: req.name
    })
})


app.post('/login', (req, res) => {

    // const user_id = 'SELECT id FROM users WHERE email = ?';
    // db.query(user_id, [req.body.email], (err, data) => {
    //     if (err) return res.json({
    //         Massage: "Server Side Error"
    //     });
    //     if (data.length > 0) {
    //         console.log(data);
    //     } else {
    //         return res.json({
    //             Message: "No Records existed"
    //         });
    //     }
    // })

    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';

    // const user_id = req.body.id

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) return res.json({
            Massage: "Server Side Error"
        });
        if (data.length > 0) {
            const name = data[0].name;
            // window.id = data[0].id;
            user_id = data[0].id;
            const token = jwt.sign({
                name
            }, "our-jsonwebtoken-secret-key", {
                expiresIn: '1d'
            });
            // console.log("ID USER: ", id);
            res.cookie('token', token);
            return res.json({
                Status: "Success"
            })
        } else {
            return res.json({
                Message: "No Records existed"
            });
        }
    })
})



app.post('/registration', (req, res) => {
    const sql = 'INSERT INTO users (name, email, password) VALUES (?,?,?)';
    db.query(sql, [req.body.name, req.body.email, req.body.password], (err, data) => {
        if (err) return res.json({
            Massage: "Server Side Error"
        })
        else {
            return res.json({
                Status: "Success"
            })
        }
        // if (data.length > 0) {
        //     const name = data[0].name;
        //     const token = jwt.sign({
        //         name
        //     }, "our-jsonwebtoken-secret-key", {
        //         expiresIn: '1d'
        //     });
        //     res.cookie('token', token);
        //     return res.json({
        //         Status: "Success"
        //     })
        // } else {
        //     return res.json({
        //         Message: "No Records existed"
        //     });
        // }
    })
})


app.post('/savetodatabase', async (req, res) => {
    let noteIdVar;

    try {
        // const user_id = req.body.user_id; // Przykładowe uzyskanie user_id z zapytania
        noteIdVar = await getNoteId(user_id);
        console.log("NOTE ID WYNOSI outside NOTEID: ", noteIdVar); // wartość uzyskana
        // res.json({
        //     noteId: noteIdVar
        // });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            Message: "Server Side Error"
        });
    }

    console.log("user_id: ", user_id);
    noteIdVar++;
    const sql = 'INSERT INTO notes (user_id, note_id, title, note) VALUES (?, ?, ?, ?)';
    db.query(sql, [user_id, noteIdVar, req.body.title, req.body.content], (err, data) => {
        if (err) return res.json({
            Massage: "Server Side Error"
        })
        else {
            return res.json({
                Status: "Success"
            })
        }
    })

    console.log("NOTE ID WYNOSI outside CAŁKIEM NA ZEWNĄTRZ NOTEID: ", noteIdVar);
});

const getNoteId = (user_id) => {
    return new Promise((resolve, reject) => {
        const note_id2 = 'SELECT MAX(note_id) AS idNote FROM notes WHERE user_id = ?';
        db.query(note_id2, [user_id], (err, data) => {
            if (err) return reject(err);
            resolve(data[0].idNote);
        });
    });
};

app.post('/deletenote', (req, res) => {

    // 'DELETE FROM notes WHERE id = ?'

    // const sql = 'DELETE FROM notes WHERE id = ?';
    // db.query(sql, [note_id], (err, data) => {
    //     if (err) return res.json({
    //         Massage: "Server Side Error"
    //     })
    //     else {
    //         return res.json({
    //             Status: "Success"
    //         })
    //     }
    // })

    console.log("JESTEM W SERVER2");
    return res.json({
        Status: "Success"
    })
})

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    user_id = 0;
    return res.json({
        Status: "Success"
    })
})

app.get('/getAllNotes', (req, res) => {
    const sql = 'SELECT id AS idOfNote, title AS titleOfNote, note AS noteOfNote FROM notes WHERE user_id = ?';
    db.query(sql, [user_id], (err, data) => {
        if (err) return res.json({
            Massage: "Server Side Error"
        })
        if ((data.length > 0) && (user_id > 0)) {
            res.json(data);
            // return res.json({
            //     Status: "Success"
            // })
        } else {
            return res.json({
                Message: "No Records existed"
            });
        }
    })
})

app.listen(8081, () => {
    console.log("Running...");
})
// module.exports = {
//     db,
//     moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
// };