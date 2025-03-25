import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import session from 'express-session';

const app = express();

app.use(cookieParser());

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

    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) return res.json({
            Massage: "Server Side Error"
        });
        if (data.length > 0) {
            const name = data[0].name;
            const user_id = data[0].id;
            const token = jwt.sign({
                name
            }, "our-jsonwebtoken-secret-key", {
                expiresIn: '1d'
            });
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
    })
})


app.post('/savetodatabase', async (req, res) => {
    if (!req.session.user_id) {
        return res.json({
            Massage: "Uzytkownik nie jest zalogowany"
        });
    }
    const user_id = req.session.user_id;

    const today = new Date();
    const currentDate = new Date().toISOString().split('T')[0];

    const sql = 'INSERT INTO notes (user_id, title, note, date) VALUES (?, ?, ?, ?)';
    db.query(sql, [user_id, req.body.title, req.body.content, currentDate], (err, data) => {
        if (err) return res.json({
            Massage: "Server Side Error"
        })
        else {
            return res.json({
                Status: "Success"
            })
        }
    })
});

app.post('/deletenote', (req, res) => {

    const note_id = req.body.id;

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
})

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    req.session.destroy();
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

    const sql = 'SELECT id AS idOfNote, title AS titleOfNote, note AS noteOfNote, DATE(date) AS dateOfNote, DATE(editedDate) AS editedDateOfNote FROM notes WHERE user_id = ?';

    db.query(sql, [user_id], (err, data) => {
        if (err) return res.json({
            Massage: "Server Side Error"
        })
        if ((data.length > 0) && (user_id > 0)) {
            res.json(data);
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
    const editedDateUpdate = new Date().toISOString().split('T')[0];

    const sql = 'UPDATE notes SET title = ?, note = ?, editedDate = ? WHERE id = ?';
    db.query(sql, [title, content, editedDateUpdate, id], (err, data) => {
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
    });
});

app.listen(8081, () => {
    console.log("Running...");
})