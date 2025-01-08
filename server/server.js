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
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) return res.json({
            Massage: "Server Side Error"
        });
        if (data.length > 0) {
            const name = data[0].name;
            const token = jwt.sign({
                name
            }, "our-jsonwebtoken-secret-key", {
                expiresIn: '1d'
            });
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
    const sql = 'INSERT INTO users (email, password) VALUES (?,?)';
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) return res.json({
            Massage: "Server Side Error"
        });
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

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({
        Status: "Success"
    })
})

app.listen(8081, () => {
    console.log("Running...");
})