import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());
app.use(cookieParser());
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

app.post('/savetodatabase', (req, res) => {

    // const user_id = window.id;



    console.log("WARTOŚĆ title: ", req.body.title);
    console.log("WARTOŚĆ content: ", req.body.content);

    return res.json({
        Status: "Success"
    })

    // console.log("User id FROM SAVE TO DATABASE: ", user_id);
    // console.log("User id FROM SAVE TO DATABASE: ");
    // console.log(res);

    // return res.json({
    //     Massage: "Server Side Error"
    // })

    // res.json({
    //     Massage: "User id FROM SAVE TO DATABASE: "
    // })

    // const sql = 'INSERT INTO notes (user_id, title, note) VALUES (?,?,?)';
    // db.query(sql, [req.body.name, req.body.title, req.body.content], (err, data) => {
    //     if (err) return res.json({
    //         Massage: "Server Side Error"
    //     })
    //     else {
    //         return res.json({
    //             Status: "Success"
    //         })
    //     }
    //     // if (data.length > 0) {
    //     //     const name = data[0].name;
    //     //     const token = jwt.sign({
    //     //         name
    //     //     }, "our-jsonwebtoken-secret-key", {
    //     //         expiresIn: '1d'
    //     //     });
    //     //     res.cookie('token', token);
    //     //     return res.json({
    //     //         Status: "Success"
    //     //     })
    //     // } else {
    //     //     return res.json({
    //     //         Message: "No Records existed"
    //     //     });
    //     // }
    // })
})

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({
        Status: "Success"
    })
})

app.listen(8081, () => {
    console.log("Running...");
})