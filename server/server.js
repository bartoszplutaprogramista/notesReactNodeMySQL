import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import $ from "jquery";
import session from 'express-session';
// import bodyParser from "body-parser";

const app = express();

app.use(cookieParser());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST, GET"],
    credentials: true
}))

app.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// let user_id = 0;


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
                req.user_id = decoded.id;
                // user_id = decoded.id;
                // console.log("ID W SERVER: ", user_id);
                next();
            }
        })
    }

}

app.get('/', verifyUser, (req, res) => {
    return res.json({
        Status: "Success",
        name: req.name,
        user_id: req.user_id
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

    // dodatkowy text dfc

    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';

    // const user_id = req.body.id

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) return res.json({
            Massage: "Server Side Error"
        });
        if (data.length > 0) {
            const name = data[0].name;
            // window.id = data[0].id;
            const user_id = data[0].id;
            // req.session.user = data[0].id;
            // req.session.isLoggedIn = true;
            // req.session.save();
            // req.session.user = {
            //     idUser: data[0].id,
            //     isLoggedIn: true
            // };
            // req.session.idUser = data[0].id;
            // req.session.save();
            // const userIdSession = req.session.idUser;
            const token = jwt.sign({
                name
            }, "our-jsonwebtoken-secret-key", {
                expiresIn: '1d'
            });
            // console.log("ID USER: ", id);
            res.cookie('token', token);
            req.session.user_id = user_id;
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
    if (!req.session.user_id) {
        return res.json({
            Massage: "User is not logged in"
        });
    }
    let noteIdVar;
    const user_id = req.session.user_id;

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
            console.log('Data inserted, new row ID: ', data.insertId);
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

    const note_id = req.body.id;
    console.log("NOTE ID WYNOSI: ", note_id);

    const sql = 'DELETE FROM notes WHERE id = ?';
    db.query(sql, [note_id], (err, data) => {
        if (err) return res.json({
            Massage: "Server Side Error"
        })
        else {
            return res.json({
                Status: "Success"
            })
        }
    })

    // console.log("JESTEM W SERVER2");
    // return res.json({
    //     Status: "Success"
    // })
})

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    req.session.destroy();
    // user_id = 0;
    return res.json({
        Status: "Success"
    })
})

app.get('/getAllNotes', (req, res) => {
    if (!req.session.user_id) {
        return res.json({
            Massage: "User is not logged in"
        });
    }

    const user_id = req.session.user_id;

    const sql = 'SELECT id AS idOfNote, title AS titleOfNote, note AS noteOfNote FROM notes WHERE user_id = ?';
    console.log('user_id wynosi w server ', user_id);
    // if (req.session.user.idUser) {
    //     console.log('userId SESSION wynosi w server ', req.session.user.idUser)
    // }
    // if (req.session.user.isLoggedIn) {
    //     console.log('isLoggedIn SESSION wynosi w server ', req.session.user.isLoggedIn)
    // }

    db.query(sql, [user_id], (err, data) => {
        if (err) return res.json({
            Massage: "Server Side Error"
        })
        // if ((data.length > 0) && (req.session.user.idUser > 0) && (req.session.user.isLoggedIn)) {
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

app.post('/editnote', (req, res) => {
    const {
        id,
        title,
        content
    } = req.body;
    const sql = 'UPDATE notes SET title = ?, note = ? WHERE id = ?';
    db.query(sql, [title, content, id], (err, data) => {
        if (err) return res.json({
            Message: "Server Side Error"
        });
        else {
            return res.json({
                Status: "Success"
            });
        }
    });
});

app.post("/check-email", (req, res) => {
    const {
        email
    } = req.body;
    const query = "SELECT * FROM users WHERE email = ?";

    db.query(query, [email], (err, result) => {
        if (err) {
            return res.status(500).json({
                Status: "Error",
                Message: "Błąd serwera."
            });
        }

        if (result.length > 0) {
            res.json({
                Status: "Taken"
            }); // Email zajęty
        }

        // else {
        //     res.json({
        //         Status: "Available"
        //     }); // Email dostępny
        // }
    });
});

app.listen(8081, () => {
    console.log("Running...");
})
// module.exports = {
//     db,
//     moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
// };