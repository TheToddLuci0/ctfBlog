var express = require('express');
var router = express.Router();
const {Pool, Client} = require('pg');
const pool = new Pool({
    'user': 'ctfbloguser',
    'host': 'localhost',
    'database': 'ctfblog2',
    'password': 'RGBGamingDesktop',
    'port': 5432,
})
const client = new Client({
    'user': 'ctfbloguser',
    'host': 'localhost',
    'database': 'ctfblog2',
    'password': 'RGBGamingDesktop',
    'port': 5432,
})
client.connect()

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('login', {'err': false});
});

router.post('/', function (req, res, next) {
    console.log("BODY: \n" + JSON.stringify(req.body))
    if (!req.body) {
        res.status(401)
        res.render('login', {'err': true})
    } else {
        client.query('INSERT INTO posts (title,content) VALUES (\'' + req.body.title + '\',\'' + req.body.body + '\');', null, function (sql_err, sql_res) {
            if (sql_err) {
                console.log(sql_err)
                res.status(401)
                res.render('login', {'err': true, 'mess': sql_err})
            } else {
                res.render('index')
            }
        })
    }
})


module.exports = router;
